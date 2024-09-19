<script setup>
  import Form from './components/Form/Form.vue';
  import JsonViewer from './components/JsonViewer.vue';
  import Tip from './components/Tip.vue';
</script>

<template>
  <main>
    <Tip />
    <Form />
    <ElDivider>
      <div class="color-#444">{{ $t('结果') }}</div>
    </ElDivider>
    <JsonViewer />
  </main>
</template>

<style scoped>
  main {
    padding: 1rem;
  }
  h4 {
    font-size: calc(1.275rem + 0.3vw);
    margin-bottom: 1rem;
  }
  code {
    font-size: 0.875em;
    color: #d63384;
    word-wrap: break-word;
  }
</style>
