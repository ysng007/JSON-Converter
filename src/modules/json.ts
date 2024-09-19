const jsonMap = ref(new Map());

export const setJsonMap = (value) => jsonMap.value = value;

export const useJson = () => {
  return {
    jsonMap
  }
}