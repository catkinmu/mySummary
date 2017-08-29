# 路由钩子

## 全局钩子

### 你可以使用 router.beforeEach 注册一个全局的 before 钩子, 写在路由配置里

```javascript
{
  path: '/game',
  name: 'Game',
  meta: {
    Auth: true // 需要登录
  }
  component: Game
}

router.beforeEach((to, from, next) => { //注意这里是beforeEach
   if (to.meta.Auth) {
      if (store.state.isLogin) {
        next();
      } else {
        alert('要先登录哦')
        router.replace({ name: 'Index' })
      }
    } else {
      next();
    }
})
```

## 为单个路由定义

### 直接在当前路由中配置

```javascript
{
  path: '/game',
  name: 'Game',
  meta: {
    Auth: true // 自定义属性,设置需要登录
  },
  beforeEnter: (to, from, next) => {  //注意这里是beforeEnter
    if (to.meta.Auth) {
      if (store.state.isLogin) {
        next();
      } else {
        alert('要先登录哦')
        router.replace({ name: 'Index' })
      }
    } else {
      next();
    }
  },
  component: Game
}
```
- to: Route: 即将要进入的目标 路由对象

- from: Route: 当前导航正要离开的路由

- next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

  - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

  - next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

  - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

- 确保要调用 next 方法，否则钩子就不会被 resolved。

## 组件内的钩子

```javascript

  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }

```

beforeRouteEnter 钩子 不能 访问 this，因为钩子在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```javascript
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
