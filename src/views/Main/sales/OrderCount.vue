<template>
  <div>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <el-button type="primary" @click="clickBtn">查询</el-button>
    <div id="orderecharts" style="width: 100%; height: 800px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { ordertotal } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      date: ["2020-6-01 00:00:00", "2020-6-10 00:00:00"],
    };
  },
  created() {
    this.refreshec(JSON.stringify(this.date))
  },
  methods: {
    clickBtn() {
      let str = JSON.stringify([
        getChinatime(this.date[0]),
        getChinatime(this.date[1]),
      ]);
      this.refreshec(str)
    },
    refreshec(str) {
       ordertotal(str).then((res) => {
        for (let obj of res.data.data)
          obj.orderTime = getChinatime(obj.orderTime)

       let option = {
          xAxis: {
            type: "category",
            data: res.data.data.map(item => item.orderTime)
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: res.data.data.map(item => item.orderAmount),
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        };

        this.mychart.setOption(option)
      });
    }
  },
  mounted() {
    this.mychart = echarts.init(document.getElementById("orderecharts"));
  },
};
</script>

<style scoped>
</style>