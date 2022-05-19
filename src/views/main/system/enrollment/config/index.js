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
    name: '学生人数',
    nameLocation: 'end'
  },
  series: [
    {
      data: [],
      barWidth : 50,
      type: 'bar'
    }
  ]
}