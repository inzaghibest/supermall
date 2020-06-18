<template>
  <div id = "detail">
      <DetailNavBar class="detail-nav-bar"/>
      <scroll class="detail-scroll">
        <detail-swiper :top-images = "topImages"/>
        <detail-base-info :goods = "goodsInfo"/>
        <detail-shop-info :shop = "shopInfo"/>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import {getDetail, GoodsInfo, Shop} from 'network/detail.js'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
export default {
    name: 'Detail',
    data () {
        return {
            iid: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {}
        }
    },
    created () {
        this.iid = this.$route.params.iid

        getDetail(this.iid).then(res => {
            this.topImages = res.data.result.itemInfo.topImages
            // console.log(res.data.result.itemInfo.topImages)

            // 获取商品信息
            const data = res.data.result
            this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
            this.shopInfo = new Shop(data.shopInfo)

        })
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll
    }
}
</script>

<style scoped>
    #detail {
        height: 100vh;
    }
    .detail-nav-bar {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .detail-scroll {
        height: calc(100% - 44px);
    }
</style>