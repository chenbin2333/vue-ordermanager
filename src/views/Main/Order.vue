<template>
  <div>
    <el-row>
      <div>
        订单号:<el-input v-model="orderNo" placeholder="订单号"></el-input>
        收货人:<el-input v-model="consignee" placeholder="收货人"></el-input>
        手机号:<el-input v-model="phone" placeholder="手机号"></el-input>
        订单状态:
        <el-select v-model="orderState" placeholder="请选择">
          <el-option
            v-for="item in selectoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button type="primary" @click="clickBtn">查询</el-button>
      </div>
    </el-row>
    <el-table :data="tableList" border>
      <el-table-column label="订单号" prop="orderNo"></el-table-column>
      <el-table-column label="下单时间" prop="orderTime"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="收货人" prop="consignee"></el-table-column>
      <el-table-column label="配送地址" prop="deliverAddress"></el-table-column>
      <el-table-column label="送达时间" prop="deliveryTime"></el-table-column>
      <el-table-column label="用户备注" prop="remarks"></el-table-column>
      <el-table-column label="订单金额" prop="orderAmount"></el-table-column>
      <el-table-column label="订单状态" prop="orderState"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-button type="text" @click="clickEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p>手机号: <el-input v-model="newData.phone"></el-input></p>
      <p>收货人: <el-input v-model="newData.consignee"></el-input></p>
      <p>配送地址: <el-input type="textarea" v-model="newData.deliverAddress"></el-input></p>
      <p>用户备注: <el-input type="textarea" v-model="newData.remarks"></el-input></p>
      <p>订单金额: <el-input v-model="newData.orderAmount"></el-input></p>
      <p>
        订单状态:
        <el-select v-model="newData.orderState" placeholder="请选择">
          <el-option
            v-for="item in selectoptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickChange"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList,editOrder } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      date: [],
      tableList: [],
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      currentPage: 1,
      pagesizes: [6, 12, 18],
      pagesize: 6,
      total: 0,
      selectoptions: [
        {
          label: "已受理",
          value: "已受理",
        },
        {
          label: "已完成",
          value: "已完成",
        },
        {
          label: "派送中",
          value: "派送中",
        },
        {
          label: "全部",
          value: "全部",
        },
      ],
      selectoptions1: [
        {
          label: "已受理",
          value: "已受理",
        },
        {
          label: "已完成",
          value: "已完成",
        },
        {
          label: "派送中",
          value: "派送中",
        },
      ],
      dialogVisible: false,

      // 回填数据
      newData: {},
    };
  },
  created() {
    this.refreshTable();
  },
  methods: {
    clickChange() {
      editOrder(this.newData).then(res => {
        this.$message({
          message: '恭喜你，订单信息修改成功!',
          type: 'success'
        });
        this.refreshTable()
        this.dialogVisible = false
      })
    },
    clickEdit(row) {
      this.dialogVisible = true;
      // console.log(row);
      this.newData = { ...row };
    },
    clickBtn() {
      let paramsex = {};
      let { orderNo, consignee, phone, orderState, date } = this;
      if (orderNo) paramsex.orderNo = orderNo;
      if (consignee) paramsex.consignee = consignee;
      if (phone) paramsex.phone = phone;
      if (orderState && orderState != "全部") paramsex.orderState = orderState;
      if (date.length > 0) {
        paramsex.date = JSON.stringify([
          getChinatime(date[0]),
          getChinatime(date[1]),
        ]);
      }
      this.paramsex = paramsex;
      this.refreshTable(paramsex);
    },
    refreshTable(paramsex) {
      getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        ...paramsex,
      }).then((res) => {
        // console.log(res.data.data);
        for (let item of res.data.data) {
          item.orderTime = getChinatime(item.orderTime);
          item.deliveryTime = getChinatime(item.deliveryTime);
        }
        this.tableList = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.refreshTable(this.paramsex);
    },
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshTable(this.paramsex);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-input {
  width: 200px;
  margin-right: 20px;
  margin-left: 10px;
}
.el-date-editor {
  margin-left: 10px;
  margin-right: 25px;
}
</style>