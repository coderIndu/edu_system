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



// 折线图数据
export const lineOption = {
  title: {
    text: "近七天注册用户数"
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};