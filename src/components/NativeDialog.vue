<template>
  <dialog @close="$emit('update:modelValue', false)"><slot /></dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  watch: {
    modelValue() {
      if (this.modelValue) {
        (this.$el as HTMLDialogElement).showModal();
      } else {
        (this.$el as HTMLDialogElement).close();
      }
    },
  },
});
</script>
