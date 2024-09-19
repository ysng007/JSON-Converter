<script setup>
  import { useJson } from '@/modules/json';
  import { JsonViewer } from "vue3-json-viewer";
  import "vue3-json-viewer/dist/index.css";

  const { jsonMap } = useJson();
</script>

<template>
  <div v-for="[key, value] in jsonMap.entries()" class="mb-20px">
    <div class="mb-8px">
      <ElTag class="mr-4px">{{ key[0] }}</ElTag>
      <ElTag type="warning">{{ key[1] }}</ElTag>
    </div>
    <JsonViewer :value="value" copyable boxed theme="light" :expanded="true"/>
  </div>
</template>

<style>
  .jv-container .jv-code.open {
    padding-bottom: 30px;
  }
</style>