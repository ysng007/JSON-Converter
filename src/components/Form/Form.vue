<script setup>
  import { useTable } from '@/modules/table';
  import { setJsonMap, useJson } from '@/modules/json';
  import { downloadJson } from '@/utils/download';
  import { useForm } from './form';
  
  const table = useTable();
  const formRef = ref(null);
  const { transFormToJson, loading, formData, rules, textFieldMetaList } = useForm();

  const transform = async () => {
    await formRef.value?.validate?.();
    transFormToJson();
  }
  const download = async () => {
    const { jsonMap } = useJson();
    if (jsonMap.value.size === 0) {
      await transform()
    }
    console.log(jsonMap.value)
    downloadJson(jsonMap.value)
  }
</script>

<template>
  <div text-center>
    <ElForm ref="formRef" label-position="top" :model="formData" :rules="rules">
      <ElFormItem :label="$t('选择数据表')" prop="tableId">
        <ElSelect v-model="formData.tableId" class="w-100%">
          <ElOption
            v-for="item in table.tableMetaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem :label="$t('选择 Key 列')" prop="keyCol">
        <ElSelect v-model="formData.keyCol" class="w-100%">
          <ElOption
            v-for="item in textFieldMetaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem :label="$t('选择 Value 列')" prop="valueCols">
        <ElSelect v-model="formData.valueCols" multiple class="w-100%">
          <ElOption
            v-for="item in textFieldMetaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" round :loading="loading" @click="transform">{{ $t('转成 JSON') }}</ElButton>
    <ElButton type="primary" round @click="download">{{ $t('下载') }}</ElButton>
  </div>
</template>
