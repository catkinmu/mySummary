# jq 固定表格头和列


```javascript
<script type="text/javascript">
// ************** 使用列很多的表格
sp.fixTable = function (TableID, FixColumnNumber) {
    var scrollWidth = 17
    var table = "#" + TableID;
    var $table = $(table);
    if ($(table + "_tableLayout").length != 0) {
        $(table + "_tableLayout").before($(table));
        $(table + "_tableLayout").empty();
    } else {
        $table.after('<div id="' + TableID + '_tableLayout" style="overflow:hidden;width:100%;max-height:85%;position:relative"></div>');
    }
    var $tableLayout = $(table + "_tableLayout");
    //添加外壳
    $tableLayout.append('<div id="scrollMask"></div><div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="columnBox"><div id="' + TableID + '_tableColumn"></div></div>' + '<div id="' + TableID + '_tableData"></div>')
    //获取外壳
    var $tableFix = $(table + "_tableFix");
    var $tableHead = $(table + "_tableHead");
    var $columnBox = $("#columnBox");
    var $tableColumn = $(table + "_tableColumn");
    var $tableData = $(table + "_tableData");
    //获取表头高度
    var HeadHeight = $(table + " thead").outerHeight() + 1;

    var ColumnsWidth = 0;
    var ColumnsNumber = 0;
    $("#" + TableID + " tr:last td:lt(" + FixColumnNumber + ")").each(function () {
        ColumnsWidth += $(this).outerWidth(true);
        ColumnsNumber++;
    });
    ColumnsWidth += 1;
    //获取原表宽度
    $tableData.append($table);
    $tableData.css({ "overflow": "scroll", "height": par_height - HeadHeight, "position": "relative", "z-index": "35", "margin-top": HeadHeight });
    var tableWidth = $(table).width();

    var par_height = $tableLayout.outerHeight();
    var par_width = $tableLayout.width();
    $tableData.height(par_height - HeadHeight);
    //左上角
    setTimeout(function () {
        var $tableFixClone = $table.clone(true);
        $tableFixClone.attr("id", TableID + "_tableFixClone").css("margin", "0").width(tableWidth);
        $tableFix.css({ "height": HeadHeight, "width": ColumnsWidth, "overflow": "hidden", "position": "absolute", "top": 0, "left": 0, "z-index": "50", "background-color": "#fff" }).append($tableFixClone);
    })

    //表头
    setTimeout(function () {
        var $tableHeadClone = $table.clone(true);
        $tableHeadClone.attr("id", TableID + "_tableHeadClone").css("margin", "0");
        $tableHead.append($tableHeadClone);

        $tableHeadClone.width(tableWidth);

        $tableHead.css({ "height": HeadHeight, "overflow": "hidden", "width": par_width - 17, "position": "absolute", "top": 0, "left": 0, "z-index": "45", "background-color": "#fff" });

    })

    //列
    setTimeout(function () {
        var $tableColumnClone = $table.clone(true);
        $tableColumnClone.attr("id", TableID + "_tableColumnClone").css("margin", "0");
        $tableColumn.append($tableColumnClone);

        $tableColumnClone.width(tableWidth);
        $columnBox.css({ "width": ColumnsWidth, "overflow": "hidden", "height": par_height - 17, "position": "absolute", "top": 0, "left": 0, "z-index": "40", "background-color": "#fff" });

        $tableColumn.css({ "width": ColumnsWidth + scrollWidth, "overflow-x": "hidden", "overflow-y": "scroll", "height": par_height - 17, "position": "absolute", "top": 0, "left": 0, "z-index": "40" });

        var scrollFlag = false;

        $tableData.on('scroll', function () {
            if (scrollFlag) {
                return;
            }
            $tableHead.scrollLeft($tableData.scrollLeft());
            $tableColumn.scrollTop($tableData.scrollTop());
        }).on('mouseover', function () {
            scrollFlag = false;
        })
        $tableColumn.on('scroll', function () {
            if (!scrollFlag) {
                return;
            }
            $tableData.scrollTop($tableColumn.scrollTop());
        }).on('mouseover', function () {
            scrollFlag = true;
        })
    })
    $("#scrollMask").css({ 'position': "absolute", "top": 0, "right": 0, "width": scrollWidth, "height": HeadHeight, "background": "#E1E6EB", border: "solid #E1E6EB", "border-width": "1px 1px 1px 0" })
    $table.css("margin-top", -HeadHeight);
    var flag = false;
    $(window).resize(function () {
        if (flag) {
            return;
        }
        setTimeout(function () {
            par_height = $tableLayout.height();
            par_width = $tableLayout.width();
            $tableHead.width(par_width - 17);
            $columnBox.height(par_height - 17);
            $tableColumn.height(par_height - 17);
            $tableData.height(par_height - HeadHeight);

            flag = false;
        }, 100);
        flag = true;
    });
}
</script>
```


```javascript
<script type="text/javascript">
/* 
 *点击非当前显示元素时, 当前显示元素自动隐藏   chenhao  2018/3/15
 *  使用方法
    $('#btn').on("click",function(){
        $('.menu').toggle().autoHide();
        return false;
    });
 * autoHide(speed,callback)  
 * speed	
    可选。规定元素从可见到隐藏的速度。默认为 "0"。
    可能的值：
    毫秒 （比如 1500）
    "slow"
    "normal"
    "fast"
    在设置速度的情况下，元素从可见到隐藏的过程中，会逐渐地改变其高度、宽度、外边距、内边距和透明度。

 *  callback	
    可选。autoHide 函数执行完之后，要执行的函数。

 ****  !! 除非设置了 speed 参数，否则不能设置该参数。
 */

(function ($) {
    $.fn.autoHide = function (speed, callback) {
        var ele = $(this);
        $(document).on('click', function (e) {
            var e = e || window.event; //浏览器兼容性 
            e.target = e.target || e.srcElement;
            if (ele.is(':visible') && (!$(e.target)[0].isEqualNode(ele[0]) && ele.has(e.target).length === 0)) {
                ele.hide(speed, callback);
            }
            // e.stopPropagation();
            // return false;
        });
        return this;
    }

})(jQuery);

</script>
```
