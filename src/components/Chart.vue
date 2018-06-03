<template>
  <el-row class="chart-container">
    <IEcharts :option="scatterOption" />
  </el-row>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  name: 'Chart',
  components: {
    IEcharts
  },
  props: {
    dist: {},
    title: {},
    nodeStyle: {},
    isGini: {
      default: false
    },
    plotType: {
      default: 'scatter'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    scatterOption: function () {
      let option = {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        title: {
          text: this.title,
          left: 'center',
          top: 20,
          textStyle: {
            color: '#c43235'
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0]
          },
          {
            type: 'inside',
            xAxisIndex: [0]
          }
        ],
        series: [
          {
            symbol: this.nodeStyle.symbol,
            symbolSize: this.nodeStyle.symbolSize ? this.nodeStyle.symbolSize : 8,
            animation: false,
            large: true,
            type: this.plotType,
            itemStyle: {
              color: this.nodeStyle.color
            },
            data: this.dist
          }
        ]
      }
      // 如果是基尼系数则添加辅助线
      if (this.isGini) {
        option.series.push({
          animation: false,
          large: true,
          type: 'line',
          itemStyle: {
            color: '#bbb'
          },
          data: [[0, 0], [1, 1]]
        })
      }
      if (this.plotType === 'heatmap') {
        option.visualMap = {
          min: 0,
          max: 3,
          calculable: true,
          realtime: false,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        }
      }
      return option
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.chart-container {
  height: 350px !important;
}
.flow-type-switch {
  margin-top: 10px;
}
</style>
