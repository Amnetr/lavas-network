<template>
  <div id="chartContainer">
    <div id="myChart"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      var base = +new Date(2018, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];
      var data = [];
      for (var i = 1; i < 500; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.random() * 100);
      }
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          x: 5,
          y: 12,
          text: '网络质量图',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#555555'          // 主标题文字颜色
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }])
            },
            data: data
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#chartContainer
  width: 100%
  height: 20rem
  div
    width: 100%
    height: 13rem
</style>
