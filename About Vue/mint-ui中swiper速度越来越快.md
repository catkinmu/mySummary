touchend 每次都会起一个新的定时器 并且不会清除上一个定时器

修改node_modules/mint-ui/packages/swipe/src/swipe.vue

第一种解决方法
```javascript
element.addEventListener('touchstart', function (event) {
      if (this$1.prevent) event.preventDefault();
      if (this$1.stopPropagation) event.stopPropagation();
      if (this$1.animating) return;
      this$1.dragging = true;
      this$1.userScrolling = false;
      this$1.doOnTouchStart(event);
      //添加一个状态
      this.mystop=false;
    });

    element.addEventListener('touchmove', function (event) {
      if (!this$1.dragging) return;
      if (this$1.timer) this$1.clearTimer();
      this$1.doOnTouchMove(event);
      //添加一个状态
      this.mystop=true;
    });

    element.addEventListener('touchend', function (event) {
      if (this$1.userScrolling) {
        this$1.dragging = false;
        this$1.dragState = {};
        return;
      }
      if (!this$1.dragging) return;
          //判断状态
        if(this.mystop){
          this$1.initTimer();
        }
        this$1.doOnTouchEnd(event);
        this$1.dragging = false;
    });
```

第二种解决方法
```javascript
element.addEventListener('touchend', function (event) {
  if (this$1.userScrolling) {
    this$1.dragging = false;
    this$1.dragState = {};
    return;
  }
  if (!this$1.dragging) return;
    //每次创建定时器之前 先清除 上一个定时器
    if (this$1.timer) this$1.clearTimer();
    this$1.initTimer();
    this$1.doOnTouchEnd(event);
    this$1.dragging = false;
});
```
