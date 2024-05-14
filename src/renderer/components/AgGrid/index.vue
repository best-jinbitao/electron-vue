<template>
    <div>
        <ag-grid-vue :column-defs="columnDefs" :row-data="rowData" :row-class-rules="rowClassRules"
                     :style="{height:tableHeight + 'px'}" :row-selection="selectionType"
                     :row-multi-select-with-click="multiClick" :is-row-selectable="isRowSelectable"
                     :default-col-def="defaultColDef" :overlay-no-rows-template="noRowsTip"
                     :suppress-row-click-selection="suppressRowClickSelection" animate-rows="true"
                     row-drag-managed="true" stop-editing-when-cells-lose-focus="true" header-height="34"
                     row-height="32" class="ag-theme-alpine" suppress-property-names-check="true"
                     @selection-changed="selectionChanged" @row-clicked="rowClicked"
                     @row-selected="rowSelected" @grid-ready="onGridReady" @filter-changed="filterChanged">
        </ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';
export default {
    name: 'AgGrid',
    components: {
        AgGridVue
    },
    /**
     * 传递参数说明：
     * @param {Array} columnDefs 列字段数组
     * @param {Array} rowData 行数据数组
     * @param {Number} tableHeight grid高度
     */
    props: {
        rowClassRules: {
            type: Object,
            default: () => {
                return {}
            }
        },
        columnDefs: {
            type: Array,
            default: () => {
                return []
            }
        },
        rowData: {
            type: Array,
            default: () => {
                return []
            }
        },
        tableHeight: {
            type: Number,
            default: 0
        },
        selectionType: {
            type: String,
            default: 'single' // 默认单选；多选时传入multiple
        },
        multiClick: {
            type: Boolean,
            default: false // 默认点击行单选；多选时传入true
        },
        isRowSelectable: {
            type: Function,
            default: () => true
        },
        defaultEditable: {
            type: Boolean,
            default: true // 默认可双击编辑；传入false，禁止单元格双击编辑
        },
        suppressRowClickSelection: {
            type: Boolean,
            default: false // 默认点击行选中；传true，禁止点击行选中
        }
    },
    data() {
        return {
            // 默认列配置
            defaultColDef: {
                width: 120, // 列默认宽
                sortable: true, // 开启排序
                filter: true, // 开启筛选
                // floatingFilter: true, // 显示搜索框
                editable: this.defaultEditable, // 可编辑
                resizable: true, // 列宽可变
                cellStyle: {
                    'line-height': '30px'
                },
                headerCheckboxSelectionFilteredOnly: true
            },
            noRowsTip: '<span class="el-table__empty-text"></span>',
            api: null,
            columnApi: null
        }
    },
    methods: {
        filterChanged({ api }) {
            const hasSelectedNodes = api.getSelectedNodes();
            hasSelectedNodes.forEach(node => {
                if (!node.displayed) {
                    node.setSelected(false);
                }
            })
        },
        selectionChanged({ api }) {
            const rowNodeArr = api.getSelectedNodes();
            const rowDataArr = rowNodeArr.map(item => item.data);
            this.$emit('select-change', rowDataArr);
        },
        rowClicked(event) {
            this.$emit('row-click', event);
        },
        rowSelected(event) {
            this.$emit('row-selected', event);
        },
        // 给父组件暴露ag-grid的api
        onGridReady(params) {
            this.columnApi = params.columnApi;
            this.api = params.api;
            this.$emit('grid-ready', params);
        }
    }
}
</script>

<style lang="scss" src="@/components/AgGrid/gridCell.scss"></style>
