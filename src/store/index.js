import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装Vuex
Vue.use(Vuex)

// 2. 创建store对象
const state = {
    cartList: []
}
const store = new Vuex.Store({
    state,
    // 修改state中的任何状态都要通过mutations,mutations方法尽可能完成的事情单一
    mutations,
    actions,
    getters
    // actions里应该放比较复杂的操作
})

// 3. 导出
export default store