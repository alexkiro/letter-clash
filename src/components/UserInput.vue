<template>
  <div>
    <div class="user-input brutal-border">
      <input :value="userInput" autocomplete="off" placeholder="..." readonly size="1" type="text" />
      <button :disabled="userInput.length < 2" class="submit-btn brutal-border" type="submit" @click="$emit('submit')">
        ▸
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    userInput: {
      type: String,
      required: true,
    },
  },
  emits: ["submit"],
});
</script>

<style>
.user-input {
  background-color: white;
  padding: 0.5rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.user-input input {
  display: block;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.2em;
  flex-grow: 1;
  border: none;

  outline: none;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  background-color: var(--dark-ocean);
  width: 2em;
  height: 2em;
  border-radius: 50%;
  color: white;
}

.submit-btn:disabled {
  background-color: #9b9a9a;
}
</style>
