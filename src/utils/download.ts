function downloadJsonbyName(jsonContent, fileName) {

  // 创建一个 Blob 对象
  const blob = new Blob([jsonContent], { type: "application/json" });

  // 创建一个链接元素
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName + ".json";

  // 模拟点击下载链接
  link.click();
}

/** 
{
    ["EN", "CN"]: {},
    ["EN", "JA"]: {}
}
*/
function downloadJson(jsonMap) {
  for (let [key, value] of jsonMap.entries()) {
    const fileName = `${key[1]}`;
    downloadJsonbyName(JSON.stringify(value, null, 2), fileName);
  }
}
export { downloadJson }