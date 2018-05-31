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
            type: 'scatter',
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
