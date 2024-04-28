<template>
  <div class="app-container">
    <div class="button-group">
      <el-link type="success" @click="test">测试连接性</el-link>
      <el-upload
        style="display: inline-block"
        action="#"
        :auto-upload="false"
        :on-change="onChange"
        :limit="1"
        :show-file-list="false"
        accept=".xls,.xlsx"
      >
        <el-link style="" type="success">导入</el-link>
      </el-upload>
      <el-link type="success" @click="exportExcel">导出</el-link>
    </div>
    <el-table :data="tableData" border :height="`calc(100vh - 130px)`">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="date" label="分组" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status || "成功" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import excel from "@/utils/excel.js"
// import * as XLSX from "xlsx"
const xlsx = require("xlsx");

export default {
  data: () => {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },

  components: {},

  mounted() {},

  methods: {
    test() {
      console.log(666);
    },
    importExcel() {},
    exportExcel() {
      // 准备要导出的数据（对象数组）
      let sheetData = [
        { "name": "张三", age: 18, ip: "123", address: "北京市" },
        {name: "李四", age: 19, ip: "2333", address: "上海市" },
      ];
      // 创建sheet对象
      let sheet = xlsx.utils.json_to_sheet(sheetData);
      // 创建一个工作薄
      let wb = xlsx.utils.book_new();
      // 将sheet对象放入到工作薄
      xlsx.utils.book_append_sheet(wb, sheet, "Sheet1");
      // 导出Excel文件
      xlsx.writeFile(wb, "data.xlsx");
    },
    async onChange(file) {
      /**
       * 1. 使用原生api去读取好的文件
       * */
      // console.log("原始上传的文件", file);
      // 读取文件不是立马能够读取到的，所以是异步的，使用Promise
      let dataBinary = await new Promise((resolve) => {
        // Web API构造函数FileReader，可实例化对象，去调用其身上方法，去读取解析文件信息
        let reader = new FileReader(); // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
        // console.log("实例化对象有各种方法", reader);
        reader.readAsBinaryString(file.raw); // 读取raw的File文件
        reader.onload = (ev) => {
          // console.log("文件解析流程进度事件", ev);
          resolve(ev.target.result); // 将解析好的结果扔出去，以供使用
        };
      });
      // console.log("读取出的流文件", dataBinary);

      /**
       * 2. 使用xlsx插件去解析已经读取好的二进制excel流文件
       * */
      let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
      // excel中有很多的sheet，这里取了第一个sheet：workBook.SheetNames[0]
      let firstWorkSheet = workBook.Sheets[workBook.SheetNames[0]];
      // 分为第一行的数据，和第一行下方的数据
      const header = this.getHeaderRow(firstWorkSheet);
      console.log("读取的excel表头数据（第一行）", header);
      const data = xlsx.utils.sheet_to_json(firstWorkSheet);
      console.log("读取所有excel数据", data);
    },
    getHeaderRow(sheet) {
      const headers = []; // 定义数组，用于存放解析好的数据
      const range = xlsx.utils.decode_range(sheet["!ref"]); // 读取sheet的单元格数据
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers; // 经过上方一波操作遍历，得到最终的第一行头数据
    },
  },
};
</script>
<style>
.app-container {
  margin-top: 0px;
}
.app-container ::-webkit-scrollbar {
  display: block !important;
  background-color: #fff;
  width: 5px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(70, 57, 57, 0.3);
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
<style scoped>
.button-group {
  height: 20px;
  line-height: 20px;
  margin-bottom: 15px;
  padding-left: 5px;
}

::v-deep .el-table__body tr,
::v-deep .el-table__body td {
  padding: 0;
  height: 23px;
}
</style>