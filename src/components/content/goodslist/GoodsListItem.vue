<template>
    <div class="goods-item">
        <img v-lazy="showImg" alt="" @load="imgLoad" @click="itemClick">
        <div class="goods-info">
            <p>{{ goodsItem.title }}</p>
            <span class="price">{{ goodsItem.price }}</span>
            <span class="collect">{{ goodsItem.cfav }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props: {
        goodsItem: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
      showImg () {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad () {
        /**
         * 由于Home.vue和Detail.vue都用到了改组件,所以在Home页面不需要Detail接收此事件，
         * 解决方法一： 路由
         */
        // this.$bus.$emit('itemImgLoad')
        if(this.$route.path.indexOf('/home') === 0)
        {
          this.$bus.$emit('homeItemImgLoad')
        }else if(this.$route.path.indexOf('/detail') === 0)
        {
          this.$bus.$emit('detailItemImgLoad')
        }else{

        }
      },
      itemClick () {
        const ext = (this.goodsItem.iid|| this.goodsItem.shop_id)
        // console.log('------------' + this.goodsItem.shop_id + '--------------------')
        this.$router.push('/detail/' + ext)
      }
    }
}
</script>

<style scoped>
    .goods-item {
        position: relative;
        width: 48%;
        padding-bottom: 40px;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
        height: 100%;
    }

    .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

    .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.jpg") 0 0/14px 14px;
  }
</style>