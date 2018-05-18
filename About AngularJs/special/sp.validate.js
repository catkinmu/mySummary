
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




