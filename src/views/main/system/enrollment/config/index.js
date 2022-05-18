// 专业柱状图配置
export const barOption = {
  title: {
    text: ""
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    valueFormatter: (value) => value + '人'
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    name: '人数',
    nameLocation: 'end'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
}