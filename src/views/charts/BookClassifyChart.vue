<template>
  <div id="myChart" :style="{ width: '100%', height: '300px' }"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from 'vue'
import { BookclassificationControllerService } from '../../../generated'

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance() as any
    const option = {
      tooltip: {
        trigger: 'item'
      },
      color: ['#ffd666', '#ffa39e', '#409EFF', '#69cbc2', '#d3adf7', '#f56c6c', '#b37feb', '#5cb87a', '#f0b34a'],
      series: [
        {
          name: '图书分类',
          type: 'pie',
          radius: '70%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    onMounted(async () => {
      try {
        const response = await BookclassificationControllerService.selectAllUsingGet()
        const data = response.map((item: any) => ({
          value: item.classificationId,
          name: item.className
        }))
        option.series[0].data = data

        const echarts = proxy.$ECharts
        const echarts1 = echarts.init(document.getElementById('myChart'))
        echarts1.setOption(option)
        window.onresize = function () {
          echarts1.resize()
        }
      } catch (error) {
        console.error('Error fetching book classifications:', error)
      }
    })

    return {}
  }
})
</script>
