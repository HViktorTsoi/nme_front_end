<template>
  <div>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-share"></i> 参数设置</span>
        </div>
        <el-row>
          <el-form :model="evoParam" :inline="true">
            <el-form-item label="初始网络规模">
              <el-input min="0" type="number" v-model="evoParam.init_graph_size"></el-input>
            </el-form-item>
            <el-form-item label="目标网络规模">
              <el-input min="0" type="number" v-model="evoParam.max_ntwk_size"></el-input>
            </el-form-item>
            <el-form-item label="分析社区进化特性">
              <!-- <el-switch v-model="evoParam.analyse_community" active-color="#13ce66"> -->
              <el-switch active-color="#13ce66">
              </el-switch>
            </el-form-item>
          </el-form>
          <el-form :inline="true">
            <el-form-item label="领域向量长度k">
              <el-input min="0" type="number" v-model="evoParam.k"></el-input>
            </el-form-item>
            <el-form-item label="网络密度系数ε">
              <el-input min="0" type="number" v-model="evoParam.delta_origin"></el-input>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="startEvolution">开始演化过程</el-button>
          <el-button type="primary" @click="fetchGraph">获取拓扑数据</el-button>
          <el-button type="primary" @click="stopEvolution">停止演化</el-button>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="mt-10">
      <el-card>
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-share"></i> 网络拓扑结构</span>
        </div>
        <el-row class="topo-chart-container">
          <IEcharts :option="topoGraphOption" />
        </el-row>
      </el-card>
    </el-row>
    <el-row :gutter="6" class="mt-10">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-share"></i> 度值分布</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-share"></i> 聚集系数分布</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-share"></i> 网络异质性</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-share"></i> 信息传播势</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-share"></i> 社区数量</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>
              <i class="el-icon-share"></i> 边活跃度</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  name: 'evolution',
  components: {
    IEcharts
  },
  data () {
    return {
      networkTopoData: {
        nodes: [
          {
            id: 1,
            name: '1'
          },
          {
            id: 2,
            name: '1'
          }
        ]
      },
      currentUID: '2c421c30-640b-11e8-8bc4-a4db305b32c3',
      // 演化参数
      evoParam: {
        init_graph_size: 25,
        max_ntwk_size: 1000,
        delta_origin: 4,
        k: 10,
        analyse_community: false
      },
      // 计数器句柄
      timerHandler: null
    }
  },
  computed: {
    topoGraphOption: function () {
      return {
        title: {
          text: '网络拓扑结构',
          subtext: 'N0=' + this.evoParam.init_graph_size + ' ε=' + this.evoParam.delta_origin + ' k=' + this.evoParam.k
        },
        series: [{
          type: 'graph',
          layout: 'force',
          animation: false,
          label: {
            normal: {
              position: 'right',
              formatter: '{b}'
            }
          },
          draggable: false,
          data: this.networkTopoData.nodes,
          force: {
            edgeLength: 5,
            repulsion: 40,
            gravity: 0.2
          },
          edges: this.networkTopoData.links,
          edgeSymbol: ['arrow'],
          edgeSymbolSize: 7,
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: '#aaa',
              curveness: 0.1
            }
          }
        }]
      }
    },
    filteredEvoParam: function () {
      // 对初始化参数进行处理
      return {
        init_graph_size: parseInt(this.evoParam.init_graph_size),
        max_ntwk_size: parseInt(this.evoParam.max_ntwk_size),
        delta_origin: parseInt(this.evoParam.delta_origin),
        k: parseInt(this.evoParam.k),
        analyse_community: this.evoParam.analyse_community
      }
    }
  },
  mounted () {
    this.fetchGraph()
  },
  methods: {
    fetchGraph: function () {
      let vm = this
      if (vm.currentUID) {
        // 如果开始演化 则获取图信息
        vm.$http.get('/api/fetch/' + vm.currentUID)
          .then((rep) => {
            console.log(rep)
            // 载入图数据
            if (rep.data && rep.data.nodes && rep.data.links) {
              vm.networkTopoData = rep.data
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }
    },
    startEvolution: function () {
      let vm = this
      vm.networkTopoData = { nodes: null, links: null }
      vm.$http.post('/api/start', vm.filteredEvoParam)
        .then((rep) => {
          // 获取并设置本次演化uid
          console.log(rep)
          vm.currentUID = rep.data
          // vm.timerHandler = setInterval(function () {
          //   vm.fetchGraph()
          // }, 4000)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    stopEvolution: function () {
      clearInterval(this.timerHandler)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-left: 15px;
}
.topo-chart-container {
  height: 450px;
}
</style>
