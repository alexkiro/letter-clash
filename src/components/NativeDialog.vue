<template>
  <dialog><slot /></dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      if (this.show) {
        (this.$el as HTMLDialogElement).showModal();
      } else {
        (this.$el as HTMLDialogElement).close();
      }
    },
  },
});
</script>
