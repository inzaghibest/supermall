<template>
    <div id="home">
       <nav-bar class="home-nav">
         <div slot="center">购物街</div>
       </nav-bar>
       <scroll class="content">
          <home-swiper :banners = "banners"/>
          <remommend-view :recommends = "recommends"/>
          <feature-view/>

          <tab-control class="tab-control" :titles = "['流行',  '新款', '精选']" @tabClick="tabClick"/>
          <goods-list :goods = "showGoods"/>
       </scroll>
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
    Scroll
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
      currentType: 'pop'
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
        this.getHomeGoodsD('sell');
        this.getHomeGoodsD('new');

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
        console.log(res)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
      })
    },
    /**
     * 事件监听相关的方法
     */
    tabClick (index) {
      // console.log( index )
      switch (index) {
        case 0 :
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'sell'
          break
        case 2:
          this.currentType = 'new'
      }
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

  .tab-control {
    position: sticky;
    top: 44px;
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
