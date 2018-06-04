<template>
  <div>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-share"></i> 多种模型以及数据集度值分布</span>
        </div>
        <el-row>
          <img :src="degree">
        </el-row>
      </el-card>
    </el-row>
    <el-row class="mt-10">
      <el-card>
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-share"></i> 模型与实际数据集的出入度值分布对比</span>
        </div>
        <el-row>
          <img :src="inout_degree">
        </el-row>
      </el-card>
    </el-row>
    <el-row class="mt-10">
      <el-card>
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-share"></i> 多种模型以及数据集聚集系数分布</span>
        </div>
        <el-row>
          <img :src="clustering">
        </el-row>
      </el-card>
    </el-row>
    <el-row class="mt-10">
      <el-card>
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-share"></i> 多种模型以及数据集度值洛伦兹曲线</span>
        </div>
        <el-row>
          <img :src="gini">
        </el-row>
      </el-card>
    </el-row>
    <el-row class="mt-10">
      <el-card>
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-share"></i> 社区进化趋势</span>
        </div>
        <el-row>
          <el-carousel :autoplay="false" trigger="click" height="1336.25px">
            <el-carousel-item v-for="cm in communities" :key="cm[0]">
              <el-row type="flex" justify="center">
                <h2>{{ cm[1] }}</h2>
              </el-row>
              <img :src="cm[0]">
            </el-carousel-item>
          </el-carousel>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'comparison',
  data () {
    return {
      degree: '../../static/综合度分布曲线.png',
      inout_degree: '../../static/出入度分布对比.png',
      gini: '../../static/综合洛伦兹曲线.png',
      clustering: '../../static/综合聚集系数分布.png',
      communities: [
        ['../../static/不同参数社区演化趋势.png', 'N0和ε对社区演化趋势影响'],
        ['../../static/不同数据集社区演化趋势.png', '多种模型及数据集社区演化趋势']
      ]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
