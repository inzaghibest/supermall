<template>
  <div class="cart-list">
      <scroll class="cart-content" ref="cart-scroll">
          <cart-list-item v-for="(item, index) in getCartList" :key="index.id" :item-info=item>
          </cart-list-item>
      </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'
export default {
    name: 'CartList',
    components: {
        Scroll,
        CartListItem
    },
    computed: {
        ...mapGetters(['getCartLength', 'getCartList'])
    },
    activated () {
       this.$refs.cartScroll && this.$refs.cartScroll.scroll.refresh()
    }
}
</script>

<style scoped>
    .cart-list {
        height: calc(100% - 44px - 49px - 44px);
    }

    .cart-content {
        height: 100%;
    }
</style>