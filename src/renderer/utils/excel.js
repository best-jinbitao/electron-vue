const XLSX = require('xlsx');

function excel(file) {
    // 读取Excel文件
    const workbook = XLSX.readFile(file.path);

    // 获取工作表的名字
    const sheetNames = workbook.SheetNames;

    // 获取第一个工作表
    const sheet = workbook.Sheets[sheetNames[0]];

    // 将工作表转换为JSON对象
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(data);
    return dada

}


// 打印JSON数据

export default excel