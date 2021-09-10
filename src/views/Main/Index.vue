<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content">
        <p>总订单</p>
        <p>{{totalorder}}</p>  
      </div></el-col>
      <el-col :span="6"><div class="grid-content">
        <p>总销售额</p>
        <p>{{totalmoney}}</p>  
      </div></el-col>
      <el-col :span="6"><div class="grid-content">
        <p>今日订单数</p>
        <p>{{todayorder}}</p>  
      </div></el-col>
      <el-col :span="6"><div class="grid-content">
        <p>今日销售额</p>
        <p>{{todaymoney}}</p>  
      </div></el-col>
    </el-row>
    <div id="myecharts" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { totaldata } from "@/api/apis";
export default {
  data() {
    return {
      totalorder: 0,
      totalmoney: 0,
      todayorder: 0,
      todaymoney: 0
    }
  },
  mounted() {
    let mcharts = echarts.init(document.querySelector("#myecharts"));
    totaldata().then((res) => {
      // console.log(res.data);
      this.totalorder = res.data.totalOrder;
      this.totalmoney = res.data.totalAmount;
      this.todayorder = res.data.todayOrder;
      this.todaymoney = res.data.totayAmount;

      let option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["金额数据", "订单数据"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };
      mcharts.setOption(option);
    });
  },
};
</script>

<style scoped>
  .grid-content {
    background: #fff;
    height: 100px;
    padding-top: 10px;
  }
  .grid-content p {
    text-align: center;
    line-height: 40px;
    color: #aaa;
  }
  .grid-content p:first-child {
    font-size: 22px;
  }
   .grid-content p:last-child {
     color: #000;
     font-weight: bold;
     font-size: 20px;
   }
  #myecharts {
    box-sizing: border-box;
    margin-top: 30px;
    background: #fff;
    padding: 30px;
  }
</style>