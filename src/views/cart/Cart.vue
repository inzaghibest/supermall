<template>
  <div class="cart">

    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>


    <cart-list class="cart-cart-list">
    </cart-list>


    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
// 注意是从vuex中导入
import {mapGetters} from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(['getCartLength']) 两种语法：数组语法和对象语法
    // 使用其他名称
    ...mapGetters({
      cartLength: 'getCartLength'
    })
  }

}
</script>

<style scoped>
  .cart .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-cart-list {
    height: 100vh;
  }
</style>
