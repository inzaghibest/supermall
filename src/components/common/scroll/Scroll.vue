<template>
<!-- ref/children -->
  <div class="wrapper" ref="wrapper">
      <div class="conntent">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    data () {
        return {
            scroll: null
        }
    },
    props: {
        // 由父组件决定是否实时监听
        probeType: {
            type: Number,
            default: 0
        },
        // 是否监听上拉加载更多
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    mounted () {
        // 创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })

        // 监听滚动的位置
        if(this.probeType === 2 || this.probeType == 3)
        {
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            })
        }

        // 监听上拉事件
        if(this.pullUpLoad){
            this.scroll.on('pullingUp', () => {
                this.$emit('pullUp')
            })
        }
    },
    methods: {
        scrollTo(x, y, time = 500) {
           this.scroll && this.scroll.scrollTo(x, y, time)
        }, 
        refresh () {
            this.scroll && this.scroll.refresh()
            // console.log('-------refresh--------')
        },
        getScrollY () {
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style>

</style>