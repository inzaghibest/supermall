<template>
    <div id="home">
       <nav-bar class="home-nav">
         <div slot="center">购物街</div>
       </nav-bar>
       <!-- 用来占位的tab-control -->
      <tab-control v-show="isTabFixed" class="fiexd"
                   :titles = "['流行',  '新款', '精选']" 
                   @tabClick="tabClick"/>
       <scroll class="content" ref = "scroll" 
              :probeType = "3" 
              :pull-up-load = "true"
              @scroll="contentScroll"
              @pullUp="pullUp">
          <home-swiper :banners = "banners" @homeimgload = "homeImgLoad"/>

          <remommend-view :recommends = "recommends"/>

          <feature-view/>

          <tab-control  ref="tabControl"
                       :titles = "['流行',  '新款', '精选']" 
                       @tabClick="tabClick"/>

          <goods-list :goods = "showGoods"/>
       </scroll>
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
import BackTop from 'components/content/backTop/BackTop'
import {debounce} from 'common/utils.js'
import { getHomeMultiData, getHomeGoods } from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RemommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
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
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      currentY: 0
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
        // 监听图片加载完成事件
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.$bus.$on('itemImgLoad', () => {
          refresh()
        })

        // 获取tab-control的offsettop属性
        // 所有的组件都有一个$el属性,用于获取组件中的元素
        // this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop)
              // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)

  },
  updated () {
  },

  // 保持home当前滚动的状态
  activated () {
    // console.log('--------activated-------------')
    this.$refs.scroll.scrollTo(0, this.currentY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // console.log('--------deactivated-------------')
    this.currentY = this.$refs.scroll.getScrollY()
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
    },

    // 实现回到顶部的点击事件 
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 800)
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
