<template>
    <div id="home">
      <!-- 1. 导航 -->
       <nav-bar class="home-nav">
         <div slot="center">购物街</div>
       </nav-bar>
       <!-- 用来占位的tab-control -->
      <tab-control ref="tabControlHide" v-show="isTabFixed" class="fiexd"
                   :titles = "['流行',  '新款', '精选']" 
                   @tabClick="tabClick"/>
       <scroll class="content" ref = "scroll" 
              :probeType = "3" 
              :pull-up-load = "true"
              @scroll="contentScroll"
              @pullUp="pullUp">
          <!-- 3.轮播图 -->
          <home-swiper :banners = "banners" @homeimgload = "homeImgLoad"/>
          <!-- 4. 十点抢券 -->
          <remommend-view :recommends = "recommends"/>
          <!-- 5.本周流行 -->
          <feature-view/>

          <tab-control  ref="tabControl"
                       :titles = "['流行',  '新款', '精选']" 
                       @tabClick="tabClick"/>
          <!-- 7. 商品展示 -->
          <goods-list :goods = "showGoods"/>
       </scroll>
       <!-- 8. 回到顶部 -->
       <back-top @click.native = "backClick" v-show = "isShow"/>
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RemommendView from './childComps/RemommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goodslist/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import MainTabBar from 'components/content/MainTabBar'
import {debouce} from 'common/utils.js'
import { getHomeMultiData, getHomeGoods } from 'network/home'
import {backTopMinix} from 'common/mixin.js'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RemommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
    // MainTabBar
  },
  mixins: [backTopMinix],
  data () {
    return {
      // 轮播图
      banners: [],
      // 首页图片
      recommends: [],
      // 列表页
      goods: {
        'pop':  {page: 0, list: []},
        'sell': {page: 0, list: []},
        'new': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      currentY: 0
      // itemImgListener: null
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 1.请求轮播图数据
        this.getHomeMultiDataD();

    // 2.请求首页数据
        this.getHomeGoodsD('pop');
        this.getHomeGoodsD('new');
        this.getHomeGoodsD('sell');


  },
  mounted () {
        // 监听图片加载完成事件，刷新scroll重新计算高度，解决滚动高度计算错误问题
        let refresh = debouce(this.$refs.scroll.refresh, 200)
        this.$bus.$on('homeItemImgLoad', () => {
          refresh()
        })

        // 获取tab-control的offsettop属性，对tab导航实现滚动到一定区域显示和隐藏。
        // 所有的组件都有一个$el属性,用于获取组件中的元素
        // this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop)
              // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)

  },
  updated () {
  },

  // 保持home当前滚动的状态
  activated () {
    // 1.保持home当前的滚动状态
    this.$refs.scroll.scrollTo(0, this.currentY, 0)
    this.$refs.scroll.refresh()

    // 2. 
    // this.$bus.$on('itemImgLoad', this.itemImgListener)

  },
  deactivated () {
    // 1. 保存离开时的Y值.
    this.currentY = this.$refs.scroll.getScrollY()

   // 2. 取消图片事件监听
  //  this.$bus.$off('itemImgLoad', this.itemImgListener)

 
  },
  methods: {
    /** 
     * 网络请求相关的方法
     * */ 
    getHomeMultiDataD()
    {
      getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoodsD (type) {
      let page = (this.goods[type].page) + 1
      getHomeGoods(type, page).then(res=> {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.scroll.finishPullUp()
      })
    },
    /**
     * 事件监听相关的方法
     */
    tabClick (index) {
      switch (index) {
        case 0 :
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      // 让两个组件的当前选中保持一致
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlHide.currentIndex = index
    },

    tabClickhidle (index) {
      tabClick(index)
    },

    // 滚动事件监听
    contentScroll (position) {
      this.isShow = (0 - position.y) > 1000 ? true : false
      // 1.决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop
    },

    // 上拉加载更多
    pullUp () {
      this.getHomeGoodsD(this.currentType)
    },

    homeImgLoad () {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        console.log(this.tabOffsetTop)
    }
  }
}
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  #home {
    padding-top: 44px;
    /* 100%的视口高度 */
    position: relative;
    height: 100vh;
  }

  .fiexd {
    /* position: sticky; */
    position: fixed; 
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  /* .content {
    height: calc(100% - 98px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
