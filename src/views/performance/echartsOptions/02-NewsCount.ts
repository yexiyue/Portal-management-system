import { getNewsCount } from "@/api";
import type { EChartsOption } from "echarts";

export const getOptions2 = async () => {
  const data = (await getNewsCount()).data;

  const options1: EChartsOption = {
    title: {
      text: "新闻分类比例",
      left: "center",
    },
    series: [
      {
        type: "pie",
        name: "新闻数量",
        data: data,
      },
    ],
    legend: {
      bottom: "bottom",
    },
    tooltip: {},
  };

  const options2: EChartsOption = {
    title: {
      text: "新闻分类数量柱图",
      left: "center",
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: data.map((item) => item.name),
    },
    series: [
      {
        type: "bar",
        name: "新闻分类",
        data: data.map((item) => item.value),
      },
    ],
    legend: {
      bottom: "bottom",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
  };

  return {
    options1,
    options2,
  };
};
