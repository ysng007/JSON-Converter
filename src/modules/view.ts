import { defineStore } from 'pinia';
import { useTable } from './table';

export const useViews = defineStore('view', {
  state: () => {
    return {
      views: []
    }
  },

  getters: {
    view: (state) => toRaw(state.views[0]) || null
  },

  actions: {
    async getViews() {
      const list = await useTable().activeTable.getViewList();
      this.views = list;
      return list;
    }
  }
})