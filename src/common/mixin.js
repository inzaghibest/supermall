import BackTop from 'components/content/backTop/BackTop'
// backTop的混入
export const backTopMinix = {
    components: {
        BackTop
    },
    data () {
        return {
            isShow: false
        }
    },
    methods : {
        backClick () {
            this.$refs.scroll.scrollTo(0, 0, 300)
          }
    }
}