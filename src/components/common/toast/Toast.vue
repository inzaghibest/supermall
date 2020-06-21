<template>
  <div class="toast" v-show="isToastShow">
      <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
    name: 'Toast',
    data () {
        return {
            message: '',
            isToastShow: false
        }
    },
    methods: {
        show (message = '默认文字', duration = 2000) {
            this.message = message
            this.isToastShow = true
            setTimeout(() => {
                this.message = ''
                this.isToastShow = false
            }, duration);
        }
    }
}
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color:rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 10px 10px;
        font-size: 16px;

        border-radius: 10px 10px;
    }
</style>