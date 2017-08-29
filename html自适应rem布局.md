# HTML中rem自适应布局

>假如设计稿是750px的, 那么量出来是多少就只写x/100 rem, 比如量的是20px, css里就写 .2rem;

```javascript
<script type="text/javascript">
(function(doc, win) {
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 2 * (clientWidth / 7.5) + 'px';
            };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
</script>
```

>假如设计稿是375px的, 那么量出来是多少就只写x/100 rem, 比如量的是20px, css里就写 .2rem;

```javascript
<script type="text/javascript">
(function(doc, win) {
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = (clientWidth / 3.75) + 'px';
            };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
</script>
```

>如果既不是750, 又不是375的, 那么...UI...
