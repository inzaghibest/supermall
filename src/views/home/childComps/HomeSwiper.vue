<template>
    <swiper>
        <swiper-item v-for="item in banners" :key="item.label">
        <a :href="item.link">
            <img :src="item.image" alt="" @load="homeImgLoad">
        </a>
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
    name: 'HomeSwiper',
    props: {
        banners: {
            type: Array,
            default () {
                return []
            }
        }
    },
    methods: {
        homeImgLoad () {
            this.$emit('homeimgload')
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style>

</style>