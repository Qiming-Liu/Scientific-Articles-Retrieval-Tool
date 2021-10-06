<template>
  <div style="">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" position="right" :offsetX="-140"/>
      <v-pie position="percent" color="item" :vStyle="pieStyle" :label="labelConfig" />
      <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'Category 1', count: 40 },
  { item: 'Category 2', count: 21 },
  { item: 'Category 3', count: 17 },
  { item: 'Category 4', count: 13 },
  { item: 'Category 5', count: 9 }
]

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const data = dv.rows
export default {
  name: 'Category',
  data () {
    return {
      data,
      scale,
      height: 385,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val
        }
      }]
    }
  }
}
</script>

<style scoped>

</style>
