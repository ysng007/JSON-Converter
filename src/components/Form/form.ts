import { bitable } from '@lark-base-open/js-sdk';
import { useTable, useTableField, FieldType } from '@/modules/table';
import { useRecords, transTwoFieldRecordsToJson } from '@/modules/record';
import { useViews } from '@/modules/view';
import { setJsonMap } from '@/modules/json';
import { t } from '@/locales/i18n';

const { base } = bitable;

const updateTableInfo = async () => {
  await useTable().updateTable();
  await useViews().getViews();
  await useRecords().getLatestRecords();
}

export const useForm = () => {
  const rules = {
    tableId: [
      { required: true, message: t('请选择'), trigger: 'blur' }
    ],
    keyCol: [
      { required: true, message: t('请选择'), trigger: 'blur' }
    ],
    valueCols: [
      { required: true, message: t('请选择'), trigger: 'blur' }
    ]
  };
  const table = useTable();
  const { transTwoFieldsToJson, getLatestRecords } = useRecords();
  const { fieldMetaList, getFieldNameById, updateField } = useTableField();
  const formData = reactive({ tableId: '', keyCol: '', valueCols: [] });
  const textFieldMetaList = computed(() => fieldMetaList.value.filter(item => item.type === FieldType.Text ));

  watch(() => table.activeTableId, () => {
    if (table.activeTableId) formData.tableId = table.activeTableId;
  });

  // 拉取与更新表格信息
  onBeforeMount(() => {
    console.log('onBeforeMount')
    updateTableInfo();
    base.onTableDelete(updateTableInfo);
    base.onTableAdd(updateTableInfo);
  });
  
  const loading = ref(false);
  const transFormToJson = async () => {
    loading.value = true;
    // 更新为最新记录
    await getLatestRecords();
    loading.value = false;
    const jsonMap = new Map();
    const keyFieldName = getFieldNameById(formData.keyCol);
    formData.valueCols.forEach((valueFieldId, idx) => {
      const valueFieldName = getFieldNameById(valueFieldId);
      const result = transTwoFieldsToJson(formData.keyCol, valueFieldId);
      jsonMap.set([keyFieldName, valueFieldName], result);
    });
    setJsonMap(jsonMap);
  }

  return {
    rules,
    loading,
    transFormToJson,
    formData,
    textFieldMetaList,
  }
}
