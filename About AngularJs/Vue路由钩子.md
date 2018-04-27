# Angularjs中一些常用指令

## 监听repeat完成的指令

### repeat-finish

```javascript
app.directive("repeatFinish", function ($timeout) {
    return {
        link: function (scope) {
            if (scope.$last == true) { //判断是否循环完成
                //code...
            }
        }
    };
});
```

## 双击单元格编辑内容

### change-value (需要用到jq,只是针对滨旅项目的雏形)

```javascript
app.directive("changeValue", function ($http, $compile) {

    return {
        // scope: true,
        restrict: 'AEC',
        link: function (scope, element, attrs) {
            $(element).on('dblclick', function (e) {
                var $td = $(this);
                $td.find('.fix-i').remove();
                var field = attrs.field
                var valType = attrs.valtype  //input类型  暂时只有text 和 number
                var td_width = $td.width();
                $td.css({ "position": "relative", "max-width": td_width, overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" })
                var old_value = $td.html();
                if ($td.find('input').length > 0) {
                    return;
                }
                var str = '<input type="text" class="fix-input" value="' + old_value + '" />'
                if (valType == 'number') {
                    str = '<input type="number" class="fix-input" value="' + parseFloat(old_value).toFixed(2) + '" />'
                }
                $td.html('').append(str)
                $td.find('input')[0].focus();
                // input失焦函数
                var blurFun = function () {
                    var new_value = $.trim($td.find('input').val())
                    // old_value == new_value || new_value == ""
                    if (old_value == new_value) {
                        $td.html(old_value)
                        return;
                    }
                    if (valType == 'number') {
                        new_value = parseFloat(new_value).toFixed(2)
                    }
                    // if (valType == 'time') {
                    //     var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
                    //     var regExp = new RegExp(reg);

                    //     if (new_value != "") {
                    //         if (!regExp.test(new_value)) {
                    //             $td.find('input').off('blur')
                    //             alert("日期格式不正确，正确格式为：2018-01-01, 或者不填写任何数据")
                    //             setTimeout(function () {
                    //                 $td.find('input')[0].focus();
                    //                 $td.find('input').on('blur', blurFun);
                    //             }, 10)
                    //             return;
                    //         }
                    //     }
                    // }

                    $td.html(new_value);
                    // alert(new_value)
                    var waitStr = '<i class="fix-i title="正在保存" fa fa-spinner fa-spin"></i>';
                    $td.append(waitStr)

                    $('.fix-i').css({
                        top: 0,
                        right: 0
                    })
                    var url = scope.ctl.webApiUrl + "..." //此处获取控制器中的api地址
                    var data = {
                        id: scope.item.ID, //本条数据的id
                        colname: field,   //本条数据的字段名
                        value: new_value
                    }
                    $http.post(url, data, scope.ctl.postCfg).success(function (res) {
                        $td.find('.fix-i').remove();
                        if (res.Result == "1") {
                            var waitStr = '<i title="保存成功" class="fix-i fa fa-check"></i>';
                            $td.append(waitStr)
                            $('.fix-i').css({
                                top: 0,
                                right: 0
                            })
                            scope.ctl.getData(scope.ctl.refreshTab, 1)

                            setTimeout(function () {
                                $('.fix-i').remove();
                            }, 2000)
                        } else {
                            var waitStr = '<i title="保存失败" style="color:red" class="fix-i fa fa-exclamation"></i>';
                            $td.append(waitStr)
                            $('.fix-i').css({
                                top: 0,
                                right: 0
                            })
                        }

                        console.log(res);
                    })

                }
                $td.find('input').on('blur', blurFun)
            })
        }
    };
});
```