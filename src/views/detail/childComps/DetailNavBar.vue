<template>
  <div id = "detail-nav-bar">
      <nav-bar>
          <div slot="left" class="back">
              <img src="~assets/img/common/back.jpg"  @click="backClick" alt="">
          </div>
          <div slot="center" class="titles">
            <div class ="title-item" 
                v-for = "(item, index) in titles"
                :key="item.label"
                @click="titleClick(index)"
                :class="{active : index === currentIndex}">
                {{ item }}
             </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            titles: ['商品', '参数', '详情', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titleClick (index) {
            this.currentIndex = index
        },
        backClick () {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    .titles {
        display: flex;
    }

    .title-item {
        flex: 1;
        font-size: 16px;
    }

    .active {
        color: var(--color-high-text);
    }

    .back {
        margin-top: 6px;
    }
</style>