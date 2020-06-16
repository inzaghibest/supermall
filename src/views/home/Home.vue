<template>
    <div id="home">
       <nav-bar class="home-nav">
         <div slot="center">购物街</div>
       </nav-bar>
       <home-swiper :banners = "banners"/>
       <remommend-view :recommends = "recommends"/>
       <feature-view/>

       <tab-control class="tab-control" :titles = "['流行',  '新款', '精选']"/>
       <ul>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
         <li>列表1</li>
       </ul>
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RemommendView from './childComps/RemommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'

import { getHomeMultiData, getHomeGoods } from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RemommendView,
    FeatureView,
    TabControl
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
      }
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
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
