import { defineStore } from 'pinia';
import { useViews } from './view';
import { useTable } from './table';

export const useRecords = defineStore('record', {
  state: () => {
    return {
      recordIds: [],
      records: []
    }
  },

  actions: {
    async getVisibleRecordIds() {
      const ids = await useViews().view.getVisibleRecordIdList();
      this.recordIds = ids;
    },

    async getLatestRecords() {
      await this.getVisibleRecordIds();
      const result = await useTable().activeTable.getRecords({});
      this.records = this.recordIds
        .map((id) => result.records.find((record) => record.recordId === id)) || [];
    },

    setRecords(records) {
      this.records = records;
    },

    getFieldRecords(fieldId) {
      return this.records
        .map((record) => record.fields[fieldId]?.[0])
    },

    transTwoFieldsToJson(keyFieldId, valueFieldId) {
      const keyRecords = this.getFieldRecords(keyFieldId)
      const valueRecords = this.getFieldRecords(valueFieldId);
      const result = transTwoFieldRecordsToJson(keyRecords, valueRecords);
      return result;
    }
  }
});

export function transTwoFieldRecordsToJson(oneFieldRecords, twoFieldRecords) {
  const result = new Map();
  for (let i = 0; i < oneFieldRecords.length; i++) {
    const oneFieldRecord = oneFieldRecords[i];
    const twoFieldRecord = twoFieldRecords[i];
    if (!oneFieldRecord?.text) continue;
    result.set(oneFieldRecord.text, twoFieldRecord?.text || '');
  }
  return Object.fromEntries(result);
}
