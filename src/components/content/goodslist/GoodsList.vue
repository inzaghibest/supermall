<template>
  <div id="goodslist">
      <goods-list-item v-for="item in goods" :goods-item = "item" :key="item.label"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    name: 'GoodsList',
    props: {
        goods: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>

<style scoped>
    #goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        padding: 2px;
    }
</style>