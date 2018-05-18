
//定义全局
var spangualr = window.NameSpace || {};

//1.美化radio单选按钮 sp-radio-default
app.directive("spRadioDefault", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            //灰色radio
            spangualr.funRadio(elem, "rd_default", "rd_defaultChecked");
        }
    }
});
//sp-radio-orange
app.directive("spRadioOrange", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {           
            //橙色radio
            spangualr.funRadio(elem, "rdlbl_Hui", "rdlbl_HuiChecked");
        }
    }
});
//sp-radio-blue
app.directive("spRadioBlue", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {            
            //蓝色radio
            spangualr.funRadio(elem, "rd_blue", "rd_blueChecked");
        }
    }
});
//操作radio
spangualr.funRadio = function (radioDiv, radioClass, radioCheckClass) {
    //三个参数
    $(radioDiv).each(function () {
        $("input[type='radio']", this).hide();
        $("input[type='radio']", this).parent("label").addClass(radioClass);
        $("input[type='radio']", this).click(function () {
            $(this).attr("checked", true).parent().siblings().find("input[type='radio']").removeAttr("checked");
            $(this).parent("label").addClass(radioCheckClass).siblings("label").removeClass(radioCheckClass);
        });
        $("input[type='radio']", this).each(function () {
            if ($(this).attr("checked")) {
                $(this).attr("checked", true).parent("label").addClass(radioCheckClass).siblings().removeClass(radioCheckClass);
            }
        });
    });
}

//2.美化checkbox单选按钮 sp-checkbox-blue
app.directive("spCheckboxBlue", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spangualr.funcheckbox(elem, "chb_Blue", "chb_BlueChecked");    //蓝色checkbox 
        }
    }
});
//2.美化checkbox单选按钮 sp-checkbox-orange
app.directive("spCheckboxOrange", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {             
            spangualr.funcheckbox(elem, "chb_Orange", "chb_OrangeChecked");//橙色checkbox
        }
    }
});
//操作checkbox
spangualr.funcheckbox = function (chbDiv, chbClass, chbchecked) {
    $(chbDiv).each(function () {
        $("input[type='checkbox']", this).hide();
        $("input[type='checkbox']", this).parent("label").addClass(chbClass);
        $("input[type='checkbox']", this).click(function () {
            if ($(this).parent("label").hasClass(chbchecked)) {
                $(this).removeAttr("checked").parent("label").removeClass(chbchecked);
            } else {
                $(this).attr("checked", true).parent("label").addClass(chbchecked);
            }
        });
        $("input[type='checkbox']", this).each(function () {
            if ($(this).attr("checked")) {
                $(this).attr("checked", true).parent("label").addClass(chbchecked);
            }
        });

        if ($(this).children(".sp-checkbox-all").length = 1) {
            $(".sp-checkbox-all", this).click(function () {
                if ($(this).hasClass("hasClick")) {
                    $(this).removeClass("hasClick");
                    $(this).parent().parent().find("input[type='checkbox']").removeAttr("checked");
                    $(this).parent().parent().find("label").removeClass(chbchecked);
                } else {
                    $(this).addClass("hasClick");
                    $(this).parent().parent().find("input[type='checkbox']").attr("checked", true);
                    $(this).parent().parent().find("label").addClass(chbchecked);
                }
            });
        }
    });
}


//3.上传图片 sp-upload-img
//app.directive("spUploadImg", function () {
//    return {
//        restrict: 'AE',
//        scope: false,
//        link: function (scope, elem, attrs) {
//            elem.bind('click', function () {
//                $(this).val('');
//            });
//            elem.change(function () {
//                var file = this.files[0];
//                if (file.size > 5242880) {
//                    alert("图片大小不能大于5M");
//                    file = null;
//                    return false;
//                }
//                var fileName = file.name;
//                var postfix = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
//                if (postfix != "jpg" && postfix != "png" && postfix != "jpeg" && postfix != "gif") {
//                    alert("图片仅支持png、jpg、jpeg、gif类型的文件");
//                    fileName = "";
//                    file = null;
//                    return false;
//                }

//                var fileUrl = $(this).val();
//                $(this).parent().children(".sp-upload-img").attr("data-url", fileUrl);
//                var getimg = $(this).parent().children(".sp-upload-img");

//                var filereader = new FileReader();
//                filereader.readAsDataURL(file);
//                $(filereader).load(function () {
//                    getimg.attr("src", this.result);
//                });

//            });
//        }
//    }
//});

//3.上传图片 sp-upload-img
app.directive("spUploadImg", function () {
    return {
        restrict: 'AE',
        scope: false,
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $(this).val('');
            });
            elem.change(function () {
                var file = this.files[0];
                console.log(file);
                if (file.size > 5242880) {
                    alert("图片大小不能大于5M");
                    file = null;
                    return false;
                }
                var fileName = file.name;
                var postfix = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                if (postfix != "jpg" && postfix != "png" && postfix != "jpeg" && postfix != "gif") {
                    alert("图片仅支持png、jpg、jpeg、gif类型的文件");
                    fileName = "";
                    file = null;
                    return false;
                }

                var fileUrl = $(this).val();
                $(this).parent().children(".sp-upload-img").attr("data-url", fileUrl);
                var getimg = $(this).parent().children(".sp-upload-img");

                var filereader = new FileReader();
                filereader.readAsDataURL(file);
                $(filereader).load(function () {
                    //getimg.attr("src", this.result);
                    //uploadPic(file.name, this.result);

                    /////post给另外一个服务器生成一个文件地址，再返回
                    var picBase = this.result;
                    var picName = file.name;

                    var str = "base64,"
                    var begin = picBase.indexOf(str) + str.length;
                    picBase = picBase.substring(begin, picBase.length);
                    var host = 'http://218.69.24.10:8069';
                    var data = {
                        "filename": picName,
                        "filedata": picBase
                    }
                    //console.log(data);
                    $.ajax({
                        type: 'POST',
                        url: host + '/GoldFile/image/upload',
                        contentType: "application/json",
                        data: JSON.stringify(data),
                        dataType: "json",
                        success: function (res) {
                            if (res.success) {
                                //sp.dialog("图片上传成功");
                                //$("#eventIMG").attr("src", res.url);
                                getimg.attr("src", res.url);
                            }
                        }
                    });

                });


            });
        }
    }
});


//4.上传文件 sp-upload-file
app.directive("spUploadFile", function () {
    return {
        restrict: 'AE',
        scope: false,
        link: function (scope, elem, attrs) {
            elem.change(function () {
                if ($(this).parent().children(".sp-upload-url").length > 0) {
                    var file = this.files[0];
                    if (file.size > 52428800) {
                        alert("文件大小不能大于50M");
                        file = null;
                        return false;
                    } else {
                        var fileUrl = $(this).val();
                        $(this).parent().children(".sp-upload-url").val(fileUrl);
                    }
                } else {
                    var file = this.files[0];
                    if (file.size > 52428800) {
                        alert("文件大小不能大于50M");
                        file = null;
                        return false;
                    } else {
                        var fileUrl = $(this).val();
                        var urlArr = fileUrl.split("\\");
                        var getName = urlArr[urlArr.length - 1];//截取路径并获取文件的名字 
                        $(this).parent().children(".sp-upload-tip").text(getName).fadeIn("slow");
                    }

                }
            });

        }
    }
});

/**
 * 使用示例 解决laydate与angularjs一起使用时的冲突
 * <input class="laydate-logo" theme="#009f95" sp-laydate  type="text" id="id1" ng-model="startTime"/>
 */
/**
 * laydate指令
 * 具体参数可以查看API:http://www.layui.com/doc/modules/laydate.html
 * class="laydate-bg" 为input 添加背景
 * <input class="laydate-logo" sp-laydate type="text" laytype="month" lang="en" btns="now-confirm"  theme="#009f95" id="id1" ng-model="startTime" />
 * 墨绿色：#009f95
 * lang 默认: cn; en-英文  ,cn-中文 
 * btns 底部按钮 默认:['clear', 'now', 'confirm'], (清除, 现在, 确认); 需要设置时 中间用'-'隔开
 * min 可选时间最小值 , 默认'1900-1-1'
 * max 可选时间最大值, 默认'2099-12-31'
 * laytype 选项中可选择的日期类型
   type可选值	   	    名称			用途
	year		年选择器		只提供年列表选择
	month		年月选择器		只提供年、月选择
	date		日期选择器		可选择：年、月、日。type默认值，一般可不填
	time		时间选择器		只提供时、分、秒选择
	datetime	日期时间选择器	可选择：年、月、日、时、分、秒
 * 
 * format 自定义格式   默认  'yyyy-MM-dd'
 * 
	yyyy	年份，至少四位数。如果不足四位，则前面补零
	y		年份，不限制位数，即不管年份多少位，前面均不补零
	MM		月份，至少两位数。如果不足两位，则前面补零。
	M		月份，允许一位数。
	dd		日期，至少两位数。如果不足两位，则前面补零。
	d		日期，允许一位数。
	HH		小时，至少两位数。如果不足两位，则前面补零。
	H		小时，允许一位数。
	mm		分钟，至少两位数。如果不足两位，则前面补零。
	m		分钟，允许一位数。
	ss		秒数，至少两位数。如果不足两位，则前面补零。
	s		秒数，允许一位数。
 * 例如:
 * <input type="text" class="laydate-logo" theme="#009f95" sp-laydate laytype="datetime" format="yyyy年MM月dd日 HH时mm分ss秒" id="id1" ng-model="startTime" />
 * 
 * range 开启左右面板范围选择
 * range: true 或  range: '~' 来自定义分割字符
 * <input sp-laydate type="text" range="~" id="id1" ng-model="startTime" />
 */
app.directive('spLaydate', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
        },
        link: function (scope, element, attr, ngModel) {
            var _date = null, _config = {};

            _config = {
                lang: !!attr.lang ? attr.lang : 'cn',
                elem: element[0],
                btns: !!attr.btns ? attr.btns.split('-') : ['clear', 'now', 'confirm'],
                min: attr.min || '1900-1-1',
                max: attr.max || '2099-12-31',
                format: attr.format || 'yyyy-MM-dd',
                type: attr.laytype || 'date',
                range: attr.range,
                theme: attr.theme || 'default',
                done: function (value, date, endDate) {
                    ngModel.$setViewValue(value);
                }
            };
            // 初始化
            _date = laydate.render(_config);
            // 模型值同步到视图上
            ngModel.$render = function () {
                element.val(ngModel.$viewValue || '');
            };
        }
    }
});

////更多按钮的点击设置，zyg,201804241106
//<span id="spBtnSolid" class="sp-btn-solid sp-sm sp-radius" title="更多操作" sp-btn-solid><i class="fontello icon-dot-3">&#xe982;</i></span>
//   <div class="sp-btn-solid-part" style="margin-left:50px; display:none;">
//    <button ng-click="ctl.btnCancel(item.ID)" class="sp-btn-transparent" ng-disabled="'{{item.TASKSTATUS}}'!='已下发'" ng-class="{'sp-cursor-allowed':'{{item.TASKSTATUS}}'!='已下发'}"><i class="fa fa-trash sp-color-red"></i>&nbsp;取消下发</button>
//  </div>
//////sp-btn-solid
app.directive("spBtnSolid", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(elem).click(function (e) {
                $(".sp-btn-solid-part").hide();
                $(elem).next(".sp-btn-solid-part").show();
                sp.stopPropagation(e);
            });
            $(document).bind('click', function () {
                $(".sp-btn-solid-part").hide();
            });
            $(".sp-btn-solid-part").click(function (e) {
                sp.stopPropagation(e);
            });
        }
    }
});