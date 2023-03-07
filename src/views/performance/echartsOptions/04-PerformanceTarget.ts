import type { EChartsOption } from "echarts";
import { getPerformanceTarget } from "./../../../api/sdkApi";

export const getOptions = async () => {
  const data3 = (await getPerformanceTarget()).data;
  const category = data3.map((item) => item[0]);

  const options4: EChartsOption = {
    title: {
      text: "性能指标统计数量",
      left: "center",
    },
    xAxis: {
      data: category,
    },
    yAxis: {},
    series: {
      type: "bar",
      name: "采集数量",
      barMinWidth: 10,
      barMaxWidth: 20,
      data: data3.map((item) => item[1]),
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      top: "bottom",
    },
  };

  const options5: EChartsOption = {
    title: {
      text: "性能指标平均值",
      left: "left",
    },
    radar: [
      {
        shape: "polygon",
        indicator: [
          { name: category[0] },
          { name: category[1] },
          { name: category[2] },
          { name: category[3] },
          { name: category[4] },
          { name: category[5] },
        ],
      },
    ],
    series: {
      type: "radar",
      data: [
        {
          name: "平均值",
          value: data3.map((item) => item[2]),
        },
      ],
    },
    tooltip: {},
    legend: {
      left: "left",
      top: "bottom",
    },
  };

  const options6: EChartsOption = {
    title: {
      text: "最大内容绘制",
      left: "center",
    },
    series: {
      type: "gauge",
      max: 2400,
      data: [
        {
          value: Math.floor(data3[4][2]),
          name: "LCP",
        },
      ],
      detail: {
        valueAnimation: true,
      },
      progress: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: [
            [0.33, "green"],
            [0.66, "orange"],
            [1, "red"],
          ],
        },
      },
    },
    tooltip: {},
  };

  const options7: EChartsOption = {
    title: {
      text: "首次输入延迟",
      left: "center",
    },
    series: {
      type: "gauge",
      max: 300,
      data: [
        {
          value: Math.floor(data3[5][2]),
          name: "FID",
        },
      ],
      detail: {
        valueAnimation: true,
      },
      progress: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: [
            [0.33, "green"],
            [0.66, "orange"],
            [1, "red"],
          ],
        },
      },
    },
    tooltip: {},
  };

  const options8: EChartsOption = {
    title: {
      text: "累积布局偏移",
      left: "center",
    },
    series: {
      type: "gauge",
      max: 0.25,
      data: [
        {
          value: Math.ceil(data3[1][2] * 1000) / 1000,
          name: "CLS",
        },
      ],
      detail: {
        valueAnimation: true,
      },
      progress: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: [
            [0.33, "green"],
            [0.66, "orange"],
            [1, "red"],
          ],
        },
      },
    },
    tooltip: {},
  };

  return {
    options4,
    options5,
    options6,
    options7,
    options8
  }
};
