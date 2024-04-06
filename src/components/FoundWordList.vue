<template>
  <div class="found-words">
    <div v-for="(words, wordLength) in wordsByLength" :key="wordLength" class="word-group">
      <div class="group-title">{{ wordLength }} letters - {{ words.length }}</div>
      <div class="word-list">
        <span
          v-for="word in Array.from(words).reverse()"
          :key="word"
          :data-word="word"
          :class="{ highlight: (highlightWords ?? []).indexOf(word) !== -1 }"
          @click="selectedWord = word"
        >
          {{ word }}
        </span>
      </div>
    </div>
  </div>
  <native-dialog :model-value="!!selectedWord" class="brutal-border" @close="selectedWord = ''">
    <header>
      <div>
        <div>
          <b>{{ selectedWord }}</b>
          word definition
        </div>
        <a :href="selectedWordWikiLink" target="_blank" rel="noreferrer noopener">(from wiktionary)</a>
      </div>
      <div class="fg-dark-ocean pointer" @click="selectedWord = ''"><b>Close</b></div>
    </header>

    <loading-spinner v-if="loadingDefinitions" />
    <ul v-else-if="definitions.length > 0">
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <li v-for="group in definitions">
        <b>{{ group.partOfSpeech }}</b>
        <ol>
          <template v-for="definition in group.definitions">
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <li v-if="definition.definition">
              {{ stripHtml(definition.definition) }}
              <ul v-if="definition.examples">
                <!-- eslint-disable-next-line vue/require-v-for-key -->
                <li v-for="example in definition.examples">
                  <i>{{ stripHtml(example) }}</i>
                </li>
              </ul>
            </li>
          </template>
        </ol>
      </li>
    </ul>
    <div v-else>Unable to find definitions</div>
  </native-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NativeDialog from "@/components/NativeDialog.vue";

type WikiDefinition = {
  partOfSpeech: string;
  language: string;
  definitions: [
    {
      definition: string;
      examples?: string[];
    },
  ];
};

// maps lang codes to list of definitions
type WikiDefinitionResponse = Record<string, WikiDefinition[]>;

const invalidPartsOfSpeech = new Set(["proper noun", "phrase", "symbol"]);

export default defineComponent({
  components: { NativeDialog, LoadingSpinner },
  props: {
    foundWords: {
      required: true,
      type: Array<string>,
    },
    highlightWords: {
      required: false,
      type: Array<string>,
      default: null,
    },
  },
  data() {
    return {
      controller: null as AbortController | null,
      selectedWord: "",
      definitions: [] as WikiDefinition[],
      loadingDefinitions: false,
    };
  },
  computed: {
    selectedWordWikiLink() {
      return `https://en.wiktionary.org/wiki/${this.selectedWord.toLowerCase()}#English`;
    },
    wordsByLength(): Record<number, string[]> {
      const result: Record<number, string[]> = {};
      for (const word of this.foundWords) {
        result[word.length] ??= [];
        result[word.length].push(word);
      }
      return result;
    },
  },
  watch: {
    async selectedWord() {
      if (!this.selectedWord) return;

      this.controller?.abort();
      this.controller = new AbortController();

      try {
        this.loadingDefinitions = true;
        const result: WikiDefinition[] = [];
        const url = new URL(`https://en.wiktionary.org/api/rest_v1/page/definition/${this.selectedWord.toLowerCase()}`);
        const response = await fetch(url, {
          signal: this.controller.signal,
        });
        const data = (await response.json()) as WikiDefinitionResponse;

        for (const item of data.en || []) {
          if (item.language.toLowerCase() !== "english") {
            continue;
          }
          if (invalidPartsOfSpeech.has(item.partOfSpeech.toLowerCase())) {
            continue;
          }

          result.push(item);
        }
        this.definitions = result;
      } finally {
        this.loadingDefinitions = false;
      }
    },
  },
  methods: {
    stripHtml(html: string): string {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    },
  },
});
</script>

<style scoped>
.found-words {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.found-words > *:first-child {
  margin-top: auto;
}

.word-group {
  margin-bottom: 0.5rem;
}

.group-title {
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.word-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  letter-spacing: normal;
}

.word-list span {
  cursor: pointer;
  font-size: 16px;
  background-color: white;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  padding: 0.25rem;
  box-shadow: 1px 2px #000;
}

.word-list span:hover {
  background-color: var(--ocean);
  color: white;
}

.word-list span.highlight {
  background-color: var(--ocean);
  color: white;
}

header {
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 2px solid var(--border-color);
}

a {
  display: block;
  margin-top: 0.5rem;
}

ul,
ol {
  margin: 0.5rem 0;
  font-size: 16px;
}

dialog > ul > li {
  margin-bottom: 1.5rem;
}

ol > li {
  list-style: decimal inside;
  margin-top: 0.5rem;
}

ol ul > li {
  margin-left: 0.5rem;
}

b {
  font-weight: bold;
}

i {
  font-style: italic;
  color: rgba(47, 47, 47, 0.8);
}
</style>
