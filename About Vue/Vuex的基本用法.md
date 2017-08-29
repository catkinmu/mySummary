新建个store.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
  // 在这里存储状态
  state : {
    // 是否登录, 默认未登录
    isLogin: false,
    gender: null,
    name: null,
    age: null
  },
  // 在这里更改状态, change是我随便取的名字
  mutations: {
    change: (state, payload) =>{
      state.isLogin = payload.isLogin
      state.age = payload.age
    }
  }
})

export default store

```

main.js:
```javascript
import store from './vuex/store.js'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 我们可以直接想路由那样使用, 取值的时候方便些
  store,
  template: '<App/>',
  components: { App }
})
```

在任意vue组件里, 我们可以获取状态以及更改状态
```javascript
// 获取状态值, 用以判断是否登录
this.$store.state.isLogin


// 更改状态
this.$store.commit({
  // 这里的typ, 对应我们上面设置的change
  type: 'change',
  // 将登陆状态设置为true
  isLogin: true,
  gender: '男',
  name: 'chcc',
  age: 15
})

```
