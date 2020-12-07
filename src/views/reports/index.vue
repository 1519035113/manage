<template>
  <div class="box">
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 750px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    console.log(document.getElementById('main'))
    this.$nextTick(async function() {
    console.log(document.getElementById('main'))

      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      let { data: res } = await this.$axios.get(
        "https://www.liulongbin.top:8888/api/private/v1/reports/type/1"
      );
      // .then(res => {
      //   // if(res.data.meta.status == 200){
      //   var option = res.data.data;
      //   option.title = {
      //     text: "用户来源"
      //   };
      //   // }
      //   console.log(option);

      //   // 使用刚指定的配置项和数据显示图表。
      //   myChart.setOption(option);
      // });

      if (res.meta.status == 200) {
        this.option = res.data;
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    });
  },
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped>
.box {
  margin: 20px 0;
}
</style>
