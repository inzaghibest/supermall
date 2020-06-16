<template>
    <div class="recommond">
        <div v-for="item in recommends" :key="item.label" class="recommond-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{ item.title }}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RemommendView', 
    props: {
        recommends: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style scoped>
    .recommond {
        display: flex;
        text-align: center;
        font-size: 14px;

        padding: 10px 0px 20px;
        border-bottom: 10px solid #eee;
    }

    .recommond-item {
        flex: 1;
    }

    .recommond-item img {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
    }
</style>