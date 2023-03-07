import { getEveryPageView } from "@/api";
import type { EChartsOption } from "echarts";
import { getUserPageView } from "@/api";

export const getOptions3 = async () => {
  const data = (await getEveryPageView()).data;

  const data2 = (await getUserPageView()).data;
  const options3: EChartsOption = {
    title: {
      text: "最近7天",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: [
        "第前6天",
        "第前5天",
        "第前4天",
        "第前3天",
        "前天",
        "昨天",
        "今天",
      ],
    },
    yAxis: {},
    series: [
      {
        type: "line",
        data,
        name: "页面浏览量",
      },
      {
        type: "line",
        data: data2,
        name: "用户访问量",
      },
    ],
    legend: {
      top: "bottom",
    },
    tooltip: {
      axisPointer: {
        type: "cross",
      },
      trigger: "axis",
    },
  };
  return {
    options3,
  };
};
