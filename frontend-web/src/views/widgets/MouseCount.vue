<template>
  <v-btn
    @click="onClick"
    @dblclick="onDbClick"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    variant="text"
    class="ml-2 mr-2"
  >
    <v-icon size="x-large">{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { UnwrapNestedRefs, watch, reactive } from "vue";
interface Props {
  count: UnwrapNestedRefs<{ value: number }>;
  increase: boolean;
}
const props = defineProps<Props>();
const icon = props.increase ? "mdi-plus" : "mdi-minus";

function getAction(): Function {
  if (props.increase) return () => props.count.value++;
  return () => {
    if (props.count.value > 1) props.count.value--;
  };
}

const mouseEventCount = reactive({
  down: false,
  up: false,
});

function onClick() {
  if (mouseEventCount.down) return;
  getAction()();
}

function onDbClick() {
  mouseEventCount.down = false;
}

function onMouseDown() {
  mouseEventCount.up = false;
  mouseEventCount.down = true;
}

function onMouseUp() {
  mouseEventCount.down = false;
  mouseEventCount.up = true;
}

watch(mouseEventCount, () => {
  if (!mouseEventCount.down) return;
  const interval = setInterval(() => {
    if (!mouseEventCount.down || (props.count.value <= 0 && !props.increase)) {
      clearInterval(interval);
      return;
    }
    getAction()();
  }, 200);
});
</script>
