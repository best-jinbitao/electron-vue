<template>
  <div class="app-container">
    <div class="button-group">
      <el-link type="success" @click="connectAll">测试666</el-link>
      <el-link type="success" @click="execCommand">单个脚本</el-link>
      <el-link type="success" @click="execCommands">多行脚本</el-link>
      <!-- <el-upload ref="uploadversion" style="display: inline-block" action="#" :auto-upload="false" :on-change="onChange"
        :limit="1" :show-file-list="false" accept=".xls,.xlsx">
        <el-link style="" type="success">导入</el-link>
      </el-upload>
      <el-link type="success" @click="exportExcel">导出</el-link> -->
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      :height="`calc(100vh - 130px)`"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="" width="50"> </el-table-column>
      <el-table-column prop="group" label="分组" width="180"> </el-table-column>
      <el-table-column prop="name" label="服务器名称" width="180">
      </el-table-column>
      <el-table-column prop="ip" label="服务器ip" width="180">
      </el-table-column>
      <el-table-column prop="user" label="服务器用户" width="180">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Node } from "@/database";
const xlsx = require("xlsx");
const moment = require("moment");
import ssh2 from "@/utils/ssh2.js";

export default {
  data: () => {
    return {
      loading: false,
      tableData: [],
    };
  },

  created() {
    const a = ["1", "2", "3"];

    this.addNode(
      {},
      {
        group: "分组1",
        name: "服务器1",
        ip: "10.4.23.161",
        user: "kone",
        password: "zhxtest@2017",
        aa: a.join("\n"),
      }
    ).then((res) => {
      console.log("res", res);
    });

    this.load();

    // this.tableData = []
  },
  components: {},

  mounted() {},

  methods: {
    async load() {
      this.getNodeList().then((res) => {
        this.$set(this, "tableData", res);
      });
    },
    getNodeList() {
      return new Promise((resolve, reject) => {
        Node.find({}, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    },
    addNode({}, nodeInfo) {
      return new Promise((resolve, reject) => {
        Node.insert(nodeInfo, (err, data) => {
          if (err) reject(err);
          resolve("存储成功");
        });
      });
    },
    handleEdit(row) {
      this.$set(row, "setingFlag", true);
    },
    connectAll() {
      console.log(666);
    },
    importExcel() {},
    exportExcel() {
      // 准备要导出的数据（对象数组）
      let sheetData = this.tableData;
      if (sheetData.length < 1) {
        sheetData = [
          {
            group: "",
            name: "",
            ip: "",
            user: "",
            password: "",
          },
        ];
      }
      // 创建sheet对象
      let sheet = xlsx.utils.json_to_sheet(sheetData);
      // 创建一个工作薄
      let wb = xlsx.utils.book_new();
      // 将sheet对象放入到工作薄
      xlsx.utils.book_append_sheet(wb, sheet, "Sheet1");
      // 导出Excel文件

      const currentDate = moment().format("YYYY-MM-DD");
      xlsx.writeFile(wb, "export" + currentDate + ".xlsx");
    },
    async onChange(file) {
      this.loading = true;
      let uploadFilesArr = this.$refs.uploadversion.uploadFiles;
      if (uploadFilesArr.length == 0) {
      } else {
        this.$refs.uploadversion.uploadFiles = [];
      }
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
      let workBook = xlsx.read(dataBinary, {
        type: "binary",
        cellDates: true,
      });
      // excel中有很多的sheet，这里取了第一个sheet：workBook.SheetNames[0]
      let firstWorkSheet = workBook.Sheets[workBook.SheetNames[0]];
      // 分为第一行的数据，和第一行下方的数据
      const header = this.getHeaderRow(firstWorkSheet);
      console.log("读取的excel表头数据（第一行）", header);
      const data = xlsx.utils.sheet_to_json(firstWorkSheet);
      console.log("读取所有excel数据", data);
      this.tableData = this.$set(this, "tableData", data);
      this.loading = false;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("delNode", row._id).then(() => {
            this.$message.success("删除成功");
            this.getList();
          });
        })
        .catch((err) => {
          return;
        });
    },
    handleUpdate() {},
    execCommand() {
      ssh2
        .SSH2ExecCommand({
          nodeinfo: {
            group: "分组1",
            name: "服务器1",
            ip: "10.4.23.161",
            user: "kone",
            port: "22",
            password: "zhxtest@2017",
          },
        })
        .then(() => {
          this.$message.success("连接成功");
          console.log("连接成功");
        });
    },
    execCommands() {
      ssh2
        .SSH2ExecCommands({
          nodeinfo: {
            group: "分组1",
            name: "服务器1",
            ip: "10.4.23.161",
            user: "kone",
            port: "22",
            password: "zhxtest@2017",
          },
        })
        .then(() => {
          this.$message.success("连接成功");
          console.log("连接成功");
        });
    },
    getHeaderRow(sheet) {
      const headers = []; // 定义数组，用于存放解析好的数据
      const range = xlsx.utils.decode_range(sheet["!ref"]); // 读取sheet的单元格数据
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell =
          sheet[
            xlsx.utils.encode_cell({
              c: C,
              r: R,
            })
          ];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers; // 经过上方一波操作遍历，得到最终的第一行头数据
    },
    handleSelectionChange(val) {
      console.log("val", val);
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
  border-radius: 3px;
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