<template>
  <div id = "detail">
      <!-- 1. 导航 -->
      <DetailNavBar class="detail-nav-bar" @titleClick="titleClick" ref="detailNav"/>
      <scroll class="detail-scroll" ref="scroll" :probeType = "3" @scroll="contentScroll">
          <!-- 2. 轮播图 -->
        <detail-swiper :top-images = "topImages"/>
        <!-- 3. 商品基本信息 -->
        <detail-base-info :goods = "goodsInfo"/>
        <!-- 4. 店铺信息 -->
        <detail-shop-info :shop = "shopInfo"/>
        <!-- 5. 商品详细信息 -->
        <detail-goods-info :detail-info = "detailInfo"
                            @detailImgLoad = "detailImgLoad"/>
        <!-- 6. 商品参数信息 -->
        <detail-param-info ref="params" :param-info = "goodParams"/>
        <!-- 7. 评论 -->
        <detail-comment-info ref="comment" :comment-info = "commentInfo"/>
        <!-- 8. 推荐 -->
        <goods-list ref="recommnd" :goods = "recommndInfo"/>
      </scroll>
      <detail-bottom-bar @addToCart = "addToCart"/>
      <back-top v-show="isShow" @click.native="backClick"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommondData} from 'network/detail.js'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goodslist/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import {debouce} from 'common/utils.js'
import {backTopMinix} from 'common/mixin.js'
import {mapActions} from 'vuex'
export default {
    name: 'Detail',
    data () {
        return {
            iid: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
            goodParams: {},
            commentInfo: {},
            recommndInfo: [],
            titlesScrollY: [],
            getScrollY: null,
            currentIndex: 0
        }
    },
    mixins: [backTopMinix],
    created () {
        this.iid = this.$route.params.iid

        /**
         * 获取商品相关信息
         */
        getDetail(this.iid).then(res => {
            // 1. 获取顶部的图片数据
            this.topImages = res.data.result.itemInfo.topImages
            // console.log(res.data.result.itemInfo.topImages)
            console.log(res)

            // 2. 获取商品信息
            const data = res.data.result
            this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

            // 3. 获取店铺信息
            this.shopInfo = new Shop(data.shopInfo)

            // 4. 商品详情信息
            this.detailInfo = data.detailInfo

            // 5. 商品尺寸信息
            this.goodParams = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            // 6. 评论信息
            if(data.rate.cRate != 0)
            {
                this.commentInfo = data.rate.list[0]
            }

            // 这里仅仅是DOM渲染完了，图片不一定加载完。
            // this.$nextTick(()=>{
            //     this.titlesScrollY = []
            //     this.titlesScrollY.push(0)
            //     this.titlesScrollY.push(this.$refs.params.$el.offsetTop - 44)
            //     this.titlesScrollY.push(this.$refs.comment.$el.offsetTop - 44)
            //     this.titlesScrollY.push(this.$refs.recommnd.$el.offsetTop - 44)
            // })
            this.getScrollY = debouce(()=>{
                this.titlesScrollY = []
                this.titlesScrollY.push(0)
                this.titlesScrollY.push(this.$refs.params.$el.offsetTop )
                this.titlesScrollY.push(this.$refs.comment.$el.offsetTop )
                this.titlesScrollY.push(this.$refs.recommnd.$el.offsetTop )
                this.titlesScrollY.push(Number.MAX_VALUE)
                console.log(this.titlesScrollY)
            }, 200)
        })

        /**
         * 获取推荐
         */
        getRecommondData().then(res => {
            this.recommndInfo = res.data.data.list
        })
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar
    },
    methods: {
        ...mapActions(['addCart']),
        detailImgLoad () {
            this.$refs.scroll.refresh()
            this.getScrollY()
        },
        titleClick (index) {
            this.$refs.scroll.scrollTo(0, -this.titlesScrollY[index], 500)
        },
        // 监听滚动条的滚动
        contentScroll (position) {
            for(let i = 0; i<this.titlesScrollY.length - 1; i++)
            {
                if(this.currentIndex !== i && 
                (-position.y >= this.titlesScrollY[i] && -position.y < this.titlesScrollY[i+1]))
                {
                    this.currentIndex = i
                    this.$refs.detailNav.currentIndex = i
                }
            }

            // backTop的是否显示
            this.isShow = (0 - position.y) > 1000 ? true : false
        },
        // 添加到购物车
        addToCart () {
            // 1.获取购物车信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goodsInfo.title
            product.desc = this.goodsInfo.desc
            product.price = this.goodsInfo.realPrice
            product.iid = this.iid


            // 2. 添加信息到购物车
            // 返回Promise
            // this.$store.dispatch('addCart', product).then(res => {
            //     console.log(res)
            // })
            this.addCart(product).then(res=>{
                // this.message = res
                // this.isToastShow = true

                // setTimeout(()=> {
                //     this.message = ''
                //     this.isToastShow = false
                // }, 2000)
                this.$toast.show(res, 2000)
            })
        }

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