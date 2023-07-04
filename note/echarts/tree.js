// prettier-ignore
const hours = [  '1964', '1965', '1966',];

// prettier-ignore
const days = [
      '###创新药1', '###创新药23333333333','##创新药','#创新药','##创新药2','#创新药2'
];
// prettier-ignore
const data = [[1,2,4],[2,1,8],[0,1,8],[0,2,8],[0,4,3],[2,5,5]]

// 自定义custom的数据项 第一个都是0 第二个按照顺序一共有多少个y轴 第三个是y轴名称
const data2 = [
  [0, 0, '###创新药1'],
  [0, 1, '###创新药23333333333'],
  [0, 2, '##创新药'],
  [0, 3, '#创新药'],
  [0, 4, '##创新药2'],
  [0, 5, '#创新药2']
];

// 给定宽度下展示的文本 超过给定宽度替换为xxx...
function getTextByWidth(text, width, font = `10px Microsoft Yahei`) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  ctx.font = font;
  let endText = '';
  let midText = '';
  let len = text.length;
  for (let i = len; i > 0; i--) {
    midText = i === len ? text : `${text.slice(0, i)}...`;
    const w = ctx.measureText(midText).width;
    if (w < width) {
      endText = midText;
      break;
    }
  }
  ctx = null;
  canvas = null;
  return endText;
}

option = {
  grid: {
    top: '10%',
    left: '14%'
  },
  xAxis: {
    type: 'category',
    data: hours
  },
  yAxis: {
    type: 'category',
    data: days,
    axisLabel: {
      show: false
    }
  },
  tooltip: {},
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%',
    show: false
  },
  series: [
    {
      grid: {
        height: '30%',
        top: '10%',
        left: '18%'
      },
      encode: {
        y: [0]
      },
      type: 'custom',
      data: data2,
      tooltip: {
        formatter: function (params) {
          return params.data[2];
        }
      },
      renderItem: function (params, api) {
        let coord = api.coord([0, api.value(1)]); // y轴根据index转换后的坐标
        let size = api.size([0, 1]); // y轴的高度
        const indent = Array.from(api.value(2).matchAll(/#/g)).length;
        const indentGap = 22; // 缩进的宽度（一个单位）
        const indentXOffset = (indent - 1) * indentGap; // 不同层级缩进的宽度
        const vLineWidth = 16; // 横线的宽度
        const vLineTextGap = 2; // 横线和文本之间的距离
        const baseRender = {
          type: 'group',
          children: [
            // 文本
            {
              type: 'text',
              style: {
                x: vLineWidth + vLineTextGap + indentXOffset,
                y: coord[1],
                text: getTextByWidth(api.value(2), 64),
                textFill: '#343738',
                textVerticalAlign: 'center'
              }
            }
          ]
        };
        if (indent > 1) {
          // 文本
          baseRender.children.push({
            type: 'line',
            shape: {
              x1: indentXOffset,
              y1: coord[1] - 2, // -2居中
              x2: vLineWidth + indentXOffset,
              y2: coord[1] - 2 // -2居中
            },
            style: api.style({
              stroke: '#999',
              lineWidth: 1
            })
          });
          // 竖线 1个#不用 2## 一个竖线 依次递推
          for (let i = 1; i < indent; i++) {
            baseRender.children.push({
              type: 'line',
              shape: {
                x1: 0 + i * indentGap,
                y1: coord[1] - 2 - size[1] / 2,
                x2: 0 + i * indentGap,
                y2: coord[1] - 2 + size[1] / 2
              },
              style: api.style({
                stroke: '#999',
                lineWidth: 1
              })
            });
          }
        }
        return baseRender;
      }
    },
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
