
var spvalidate = window.NameSpace || {};

// 表单验证,利用class名来获取对象
spvalidate.addlblError = function (obj) {
    var lblError = "<label class='sp-error'></label>";
    if ($(obj).parent().children(".sp-error").length < 1) {  
        $(obj).after(lblError);
        $(obj).parent().addClass('sp-nowrap');
    }
}
// 整合验证
spvalidate.getblur = function (obj, regex, tip) {
    var className = $(obj).attr('class');
    var str = $.trim($(obj).val());    
    var strReg = !!str.match(regex);    
    if (str != "" && strReg == false) {
        $(obj).next("label").show().text(tip);        
        $(obj).removeClass("sp-rightLogo").addClass('sp-errorTip').addClass('sp-errorLogo');
        $(obj).focus();
        return false;       
    }
    else if (str != "" && strReg == true) {
        $(obj).removeClass('sp-errorTip').removeClass('sp-errorLogo').addClass("sp-rightLogo");
        $(obj).next("label").hide().text("");
    }
    if (className.indexOf('sp-required') == -1) {
        if (str == "") {            
            $(obj).removeClass('sp-errorTip').removeClass('sp-errorLogo');
            $(obj).next("label").hide().text("");
        }
    }
}
//1.验证必填 sp-required
app.directive("spRequired", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).addClass("sp-required").addClass("sp-requireLogo");
            elem.blur(function () {
                var newVal = $.trim($(elem).val());
                var getCalss = $(elem).attr("class");
                if (newVal == "") {
                    $(elem).next("label").show().html("必填");
                    $(elem).addClass('sp-errorTip').removeClass('sp-requireLogo').removeClass('sp-rightLogo').addClass('sp-errorLogo');
                }
                else {
                    if (getCalss.indexOf("sp-url") == -1 && getCalss.indexOf("sp-tel") == -1 && getCalss.indexOf("sp-telephone") == -1 && getCalss.indexOf("sp-email") == -1 && getCalss.indexOf("sp-username") == -1) {                        
                        $(elem).next("label").hide().html("");
                        $(elem).removeClass('sp-errorTip').removeClass('sp-errorLogo');
                    } 
                }
            });
        }
    }
});

//2.验证手机号 sp-phone
app.directive("spPhone", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);            
            $(elem).blur(function () {
                var regex = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                spvalidate.getblur(elem, regex, "手机号错误");
            });
        }
    }
});
//3.验证座机号码 sp-tel
app.directive("spTel", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(elem).addClass("sp-tel");
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
                spvalidate.getblur(elem, regex, "座机号错误");
            });
        }
    }
});
//4.验证联系电话 sp-telephone
app.directive("spTelephone", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(elem).addClass("sp-telephone");
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var tel = $.trim($(this).val());
                if (tel.substring(0, 1) == 1) {
                    var regex = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                    spvalidate.getblur(this, regex, "手机号错误");
                }
                else {
                    var regex = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
                    spvalidate.getblur(this, regex, "座机号错误");
                }
            });
        }
    }
});

//5.验证邮箱 sp-email
app.directive("spEmail", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(elem).addClass("sp-email");
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                spvalidate.getblur(elem, regex, "邮箱错误");
            });
        }
    }
});

//6.验证身份证号 sp-card
app.directive("spCard", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                spvalidate.getblur(elem, regex, "身份证错误");
            });
        }
    }
});

//7.验证邮编 sp-postcode
app.directive("spPostcode", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^[0-9][0-9]{5}$/;
                spvalidate.getblur(elem, regex, "邮编错误");
            });
        }
    }
});

//8. 验证传真 sp-fax
app.directive("spFax", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
                spvalidate.getblur(elem, regex, "传真号错误");
            });
        }
    }
});

//9.验证网址 sp-url
app.directive("spUrl", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(elem).addClass("sp-url");
            spvalidate.addlblError(elem);
            elem.blur(function () {                
                var regex = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g;
                spvalidate.getblur(elem, regex, "网址错误");
            });
        }
    }
});
//10.验证IP地址 sp-ip
app.directive("spIp", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^\d+\.\d+\.\d+\.\d+$/;
                spvalidate.getblur(elem, regex, "ip地址错误");
            });
        }
    }
});

//11.验证用户名合法 sp-username
app.directive("spUsername", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            $(elem).addClass("sp-username");
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^(?![^a-zA-Z]+$)(?!\D+$).{5,20}$/;
                spvalidate.getblur(elem, regex, "用户名应由5-20位字母、数字组成");
            });
        }
    }
});
//12.验证数字 sp-digit
app.directive("spDigit", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^[0-9]*$/;
                spvalidate.getblur(elem, regex, "请输入数字");
            });
        }
    }
});
//13.验证小数 sp-decimal
app.directive("spDecimal", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^\d+(\.\d+)?$/;
                spvalidate.getblur(elem, regex, "请输入数字或小数");
            });
        }
    }
});
//14.验证中文 sp-chinese
app.directive("spChinese", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            spvalidate.addlblError(elem);
            $(elem).blur(function () {
                var regex = /^[\u4E00-\u9FFF]+$/;
                spvalidate.getblur(elem, regex, "请输入中文");
            });
        }
    }
});

//15.验证密码 sp-password
app.directive("spPassword", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var className = $(elem).attr('class');
            var spanpwd = "<span class='sp-strength-tip'></span>";
            spvalidate.addlblError(elem);
            if ($(elem).parent().children(".sp-strength-tip").length < 1) {
                $(elem).next("label").after(spanpwd);
            }
            $(elem).blur(function () {
                $(".sp-strength-tip").hide();
                $(elem).removeClass("sp-rightLogo");
                var pwd = $.trim($(elem).val());
                var pwdReg = !!pwd.match(/^(?![^a-zA-Z]+$)(?!\D+$).{6,30}$/);//字母数字            
                var pwdRegCheck = !!pwd.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{6,30}$/);//字母数字特殊符号

                if (pwd != "") {
                    if (pwdReg == false) {
                        $(elem).next("label").addClass("arrow-top").show().html("密码应由6~30位字母、数字组成");
                        $(elem).removeClass("sp-rightLogo").addClass('sp-errorTip'); $(this).focus();
                        return false;
                    } else {
                        $(elem).removeClass('sp-errorTip').removeClass('sp-errorLogo').addClass("sp-rightLogo");
                        $(elem).next("label").hide().html("");
                        if (pwd.length < 9) {
                            $(elem).parent().find(".sp-strength-tip").show().text("强度低");
                        } else {
                            $(elem).parent().find(".sp-strength-tip").show().text("强度中");
                        }
                    }
                    //若含有特殊字符则表示 强度高
                    if (pwdRegCheck == true && pwd.length > 9) {
                        $(elem).removeClass('sp-errorTip').removeClass('sp-errorLogo').addClass("sp-rightLogo");
                        $(elem).next("label").hide().html("");
                        $(elem).parent().find(".sp-strength-tip").show().text("强度高");
                    }
                }

                if (className.indexOf('sp-required') == -1) {
                    if (pwd == "") {
                        $(elem).removeClass('sp-errorTip');
                        $(elem).next("label").hide().html("");
                    }
                }
            });
        }
    }
});


//提交时检测 所需要验证的 控件是否合法， 不合法就不能通过
spvalidate.submitCheck = function (formID) {
    /// <summary>提交时检测form表单格式的合法性</summary> 
    var result = true;
    $(formID + " label.sp-error").each(function () {
        var getClass = $(this).prev().attr("class"); //获取当前节点的前一个节点
        if (getClass.indexOf("sp-required") != -1) { //如果含有sp-required必填
            //含有必填，其值为空时
            if ($(this).prev().val() == "" || $(this).prev().val() == null) {
                if ($(this).is(":hidden")) {
                    $(this).show().html("必填");
                    $(this).prev().addClass('sp-errorTip').removeClass('sp-requireLogo').addClass('sp-errorLogo');
                }
                result = false;
            }
            if ($(this).prev().val() != "") {
                if ($(this).is(":visible")) {
                    result = false;
                }
            }
        }
        //如果不是必填，但含有其他验证 时
        if (getClass.indexOf("sp-required") == -1) {
            if ($(this).prev().val() != "") {
                if ($(this).is(":visible")) {
                    result = false;
                }
            }
        }
    });
    $(formID + " .sp-error:visible:eq(0)").prev().focus(); //将焦点定位到第一个sp-error所属的文本框中  
    return result;
}
//成功时去掉 “对号”图片logo
spvalidate.removeRLogo = function (formID) {
    $(formID + " .sp-rightLogo").each(function () {
        $(this).removeClass("sp-rightLogo");
        $(this).next("label").hide();
    });
    $(formID + " .sp-required").each(function () {
        $(this).removeClass("sp-errorTip").removeClass("sp-errorLogo").addClass("sp-requireLogo");
        $(this).next("label").hide();
    });
}


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

//ng-repeat 完成时的操作
app.directive('repeatFinish', function () {

    return {
        link: function (scope,attrs) {
            if (scope.$last == true) {
                //code
            }
        }
    }
})

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
