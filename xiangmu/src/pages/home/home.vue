'<template>
  <div>
    <div id="main" style="width: 100%;height:400px;margin-top:20px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    var option = {
      title: {
        text: "经营",
      },
      tooltip: {},
      legend: {
        data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: "#fff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5],
          },
        },
        indicator: [
          { name: "销售（sales）", max: 6500 },
          { name: "管理（Administration）", max: 16000 },
          { name: "信息技术（Information Techology）", max: 30000 },
          { name: "客服（Customer Support）", max: 38000 },
          { name: "研发（Development）", max: 52000 },
          { name: "市场（Marketing）", max: 25000 },
        ],
      },
      series: [
        {
          name: "预算 vs 开销（Budget vs spending）",
          type: "radar",
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: "预算分配（Allocated Budget）",
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: "实际开销（Actual Spending）",
            },
          ],
        },
      ],
    };
    // 指定图表的配置项和数据
    // var option = {
    //   title: {
    //     text: "ECharts 入门示例",
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ["销量"],
    //   },
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20],
    //     },
    //   ],
    // };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style>
</style>'