import type { EChartsOption } from "echarts";
import { getPageView } from "@/api";

export const getOptions = async () => {
  const data2 = (await getPageView(1)).data;
  const data = (await getPageView()).data;
  const data1 = (await getPageView(30)).data;

  const set = new Set([...data[0], ...data1[0], ...data2[0]]);
  return <EChartsOption>{
    title: {
      text: "页面浏览量",
      left: "center",
    },
    xAxis: {
      data: [...set],
    },
    yAxis: {},
    series: [
      {
        name: "1天页面浏览量",
        type: "bar",
        data: data2[1],
        barMaxWidth: 30,
        barMinWidth: 10,
        markLine: {
          data: [
            {
              type: "average",
              name: "平均总页面浏览量",
            },
          ],
        },
      },
      {
        name: "7天页面浏览量",
        type: "bar",
        data: data[1],
        barMaxWidth: 30,
        barMinWidth: 10,
        markLine: {
          data: [
            {
              type: "average",
              name: "平均总页面浏览量",
            },
          ],
        },
      },
      {
        name: "30天页面浏览量",
        type: "bar",
        data: data1[1],
        barMaxWidth: 30,
        barMinWidth: 10,
        markLine: {
          data: [
            {
              type: "average",
              name: "平均总页面浏览量",
            },
          ],
        },
      },
    ],
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
};
