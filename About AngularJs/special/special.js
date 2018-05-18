//归结主要方法有：  居中显示，关闭、打开层，自适应高度，冻结表头、冻结头和列，
//首先： special命名为sp
var sp = window.NameSpace || {};

//在页面dom加载完之后执行
$(document).ready(function () {
    sp.addMask();   //为body添加上遮罩层
    sp.setClass();  //为自定义class类添加功能操作
    sp.table();     //操作table，为table加上隔行变色、 
    sp.setPanel(); //面板
});

/* 为保证angularjs的显示效果，判断ie浏览器版本是否过低*/
sp.getMyBrowser = function () {
    var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    if (!isIE) {
        isIE = userAgent.indexOf("Windows NT") > -1 && userAgent.indexOf("BOIE") > -1 && !isOpera; //判断是否IE浏览器
    }
    var is360 = isIE && ((window.navigator.userProfile + '') == 'null');//判断是否360浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Safari浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && !isChrome; //判断是否Safari浏览器
    if (isIE && !is360) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        if (IE55) {
            return "IE55|false";
        } else if (IE6) {
            return "IE6|false";
        } else if (IE7) {
            return "IE7|false";
        } else if (IE8) {
            return "IE8|false";
        } else {
            return "IE9|true";
        }
    } //isIE end
    if (is360) {
        return "360|alert";
    }
    if (isFF) {
        return "FF|true";
    }
    if (isChrome) {
        return "Chrome|true";
    }
    if (isOpera) {
        return "Opera|true";
    }
    if (isSafari) {
        return "Safari|true";
    }
}
/**调用监测浏览器版本方法，并进行判断与提示**/
sp.checkIEVersion = function () {
    var mb = sp.getMyBrowser(); ///获取浏览器判断返回的值
    if (mb == undefined || mb == null || mb == "") {
        sp.dialog("您正在使用兼容模式，网站的样式可能会发生变化，请您更换Google Chrome浏览器或IE9以上版本浏览器进行浏览。");
    } else {
        var mbArray = mb.split("|");

        if (mbArray[1] == "alert") {
            sp.dialog("您正在使用360浏览器浏览，网站的样式可能会发生变化，请您更换Google Chrome浏览器或IE9以上版本浏览器进行浏览。");
        } else if (mbArray[1] == "false") {
            sp.dialog("您正在使用低版本IE浏览器浏览，网站的样式可能会发生变化，请您更换Google Chrome浏览器或IE9以上版本浏览器进行浏览。");
        } else {
        }
    }
}
sp.addMask = function () {
    //1.为每个页面的body加上遮罩层，样式为不可见
    if ($('body').find(".sp-bgMask").length < 1) {
        $('body').prepend("<div class=\"sp-bgMask\"></div>");
    }
    //2.如果body中含有对话框 sp-dialog类名，就为其加上温馨提示和关闭按钮
    if ($('body').find(".sp-dialog").length < 1) {
        $('body').prepend("<div class=\"sp-dialog\"><span class=\"sp-dialog-head\"><span class=\"sp-dialog-tip\">温馨提示</span><span class=\"sp-dialog-close sp-closeDialog\" title=\"关闭\">×</span></span><div class=\"sp-dialog-body\"></div><div class=\"sp-dialog-foot\"></div></div>");
    }
    //3.点击遮罩层，对话框、弹出层、遮罩层均淡出
    $(".sp-bgMask").bind("click", function () {
        $(this).fadeOut(200);
        if ($(".sp-dialog").is(":visible")) { //若对话框显示则淡出 
            $(".sp-dialog").fadeOut(200);
        }
        if ($(".sp-layer").is(":visible")) { //若中间层显示则淡出 
            $(".sp-layer").fadeOut(200);
        }
    });

}
//sp.dialog("身份证号不能为空！");
sp.dialog = function (tip) {
    /// <summary>显示对话框</summary> 
    $('.sp-dialog-body').html(tip);
    $('.sp-dialog-foot').html("<input type=\"button\" id=\"dialogClose\" value=\"关 闭\" class=\"sp-dialog-btnClose sp-closeDialog\" />");
    sp.openCenter(".sp-dialog");
    $('.sp-closeDialog').click(function (event) {
        sp.closeCenter(".sp-dialog");
        event.preventDefault(); event.stopPropagation();
    });
}
sp.dialoghide = function () {
    /// <summary>关闭对话框</summary> 
    $(".sp-dialog").fadeOut(200);
    $('.sp-bgMask').fadeOut(200);
};
//弹窗出发的dialog，只隐藏dialog，不隐藏bgMask
sp.onlydialoghide = function () {
    $(".sp-dialog").fadeOut(200);
}

//sp.delgrid(1);用法
sp.delgrid = function (dataid) {
    /// <summary>删除数据,传递id</summary>
    var getid = dataid;
    sp.dialog("删除后不可恢复，您确认要删除吗？");
    $('.sp-dialog-foot').html("<input type='button' data-id=" + getid + " id='delgridtrue'  value='确 认' onclick='delgridtrue(" + dataid + ");' class='sp-dialog-btnTrue' /><input type='button' value='取 消' class='sp-dialog-btnCancle sp-closeDialog' />");
    $('.sp-closeDialog').click(function () {
        sp.dialoghide();
    });
}

//加载loading演示
sp.loading = function () {
    /// <summary>加载loading</summary>
    if ($('body').find(".sp-loading").length < 1) {
        $('body').append("<div class=\"sp-loading\"><span class=\"sp-loading-img\"></span><span class=\"sp-loading-title\">请稍等，正努力加载中......</span></div>");
    }
    sp.setCenter(".sp-loading");
};
sp.loadingHide = function () {
    /// <summary>关闭loading</summary>
    $(".sp-loading").fadeOut(200);
};

//打开后 居中，并且后有遮罩层
sp.layer = function (Name) {
    /// <summary>打开弹出层</summary>
    //3.如果body中含有对话框sp-layer类名，就为其加上关闭按钮
    if ($('body').find(".sp-layer").length > 0) {
        $('.sp-layer').hide();//为对话框样式是可见的，加载时设置隐藏
        $('.sp-layer').each(function () {
            if ($(this).find(".sp-layer-head").length < 1) {
                $(this).prepend("<div class=\"sp-layer-head\"></div>");
                if ($(this).attr("data-title") != undefined) {
                    var getTitle = $(this).attr("data-title");
                    $(".sp-layer-head", this).prepend("<span class=\"sp-layer-title\">" + getTitle + "</span>");
                }
            }
            if ($(this).find(".sp-layer-close").length < 1) {
                $('.sp-layer-head', this).append("<span class=\"sp-layer-close\" title=\"关闭\" onclick=\"sp.closeCenter('.sp-layer')\">×</span>");
            }
        });
    }
    $('.sp-bgMask').fadeIn(200);
    sp.setCenter(Name);
}
sp.layerhide = function () {
    /// <summary>关闭弹出层</summary>
    $(".sp-layer").fadeOut(200);
    $('.sp-bgMask').fadeOut(200);
}

sp.setClass = function () {
    //1.实现初始获取焦点     根据class="focus"用法
    $('.focus').focus().css('text-indent', '3px');
    //2. jquery实现input文本框禁用效果  根据class="banInput"用法
    $('.banInput').css({ 'background': '#ebebe4', 'border': '1px solid #a9a9a9', 'cursor': 'default' });
    $('.banInput').focus(function () {
        $('.banInput').blur();
    });
    //4.中间弹出层
    $('.openCenter').click(function () {
        sp.openCenter(".sp-layer");
    });
    $('.closeCenter').click(function () {
        sp.closeCenter(".sp-layer");
    });
    //5.添加禁用方法
    $('input.sp-disabled').attr("sp-disabled", true);
    $('a.sp-disabled').click(function (event) {
        event.preventDefault();
    });//禁止a标签链接跳转

}

//////下面是让层居中显示的js代码，
///页面调用方法  setCenter("#DivCeng");  让DivCeng这个层打开并且居中显示 setCenter(".DivCeng"); 
sp.setCenter = function (divName) {
    /// <summary>居中显示</summary>
    $(document).ready(function () {
        var top = ($(window).height() - $(divName).height()) / 2;
        var left = ($(window).width() - $(divName).width()) / 2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(divName).css({ position: 'absolute', 'top': top + scrollTop, left: left + scrollLeft }).fadeIn(200);
    });
    //浏览器窗口大小改变时 
    $(window).resize(function () {
        var top = ($(window).height() - $(divName).height()) / 2;
        var left = ($(window).width() - $(divName).width()) / 2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(divName).css({ position: 'absolute', 'top': top + scrollTop, left: left + scrollLeft });
    });
    //浏览器有滚动条时的操作、 
    $(window).scroll(function () {
        var top = ($(window).height() - $(divName).height()) / 2;
        var left = ($(window).width() - $(divName).width()) / 2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(divName).css({ position: 'absolute', 'top': top + scrollTop, left: left + scrollLeft });
    });
}

///单纯的打开、关闭 调用：close('#id')或 Close('.class')
sp.open = function (name) {
    $(name).fadeIn(200);
}
sp.close = function (name) {
    $(name).fadeOut(200);
}
//打开后 居中，并且后有遮罩层
sp.openCenter = function (Name) {
    /// <summary>打开后居中后有遮罩层</summary>
    $('.sp-bgMask').fadeIn(200);
    sp.setCenter(Name);
}
sp.closeCenter = function (Name) {
    /// <summary>关闭居中层</summary>
    $(Name).fadeOut(200);
    $('.sp-bgMask').fadeOut(200);
}


///div自适应分辨率高度  使用: fitHeight('#id', 50);fitHeight('.class', 50);
sp.fitHeight = function (Name, Height) {
    /// <summary>自适应分辨率的高度</summary>
    $(document).ready(function () { //DOM加载后就执行
        var WindowHeight = $(window).height();
        $(Name).css('height', WindowHeight - Height);
    });
    $(window).resize(function () {    //改变窗体大小时     *resize()变化或者改变事件
        var WindowHeight = $(window).height();
        $(Name).css('height', WindowHeight - Height);
    });
    $(window).scroll(function () { //浏览器有滚动条时的操作   scroll()滚动事件
        var WindowHeight = $(window).height();
        $(Name).css('height', WindowHeight - Height);
    });
}
///div自适应分辨率高度  使用: fitWidth('#id', 50);fitWidth('.class', 50);
sp.fitWidth = function (Name, width) {
    /// <summary>自适应分辨率宽度</summary>
    $(document).ready(function () { //DOM加载后就执行
        var WindownWidth = $(window).width();
        $(Name).css('width', (WindownWidth - width) + 'px');
    });
    $(window).resize(function () {    //改变窗体大小时     *resize()变化或者改变事件
        var WindownWidth = $(window).width();
        $(Name).css('width', (WindownWidth - width) + 'px');
    });
    $(window).scroll(function () { //浏览器有滚动条时的操作   scroll()滚动事件
        var WindownWidth = $(window).width();
        $(Name).css('width', (WindownWidth - width) + 'px');
    });
}


//操作table
sp.table = function () {
    /// <summary>设置table</summary>
    if ($('body').find(".sp-grid").length > 0) {
        $('.sp-grid-striped tbody tr:odd').addClass('evenTr');//奇数行背景色
        $('.sp-grid tbody tr:last-child td').css('border-bottom', '0');
        $('.sp-grid-select tbody tr').click(function () {
            if ($(this).hasClass('sp-grid-trselected')) {
                $(this).removeClass('sp-grid-trselected')
            }
            else {
                $(this).addClass('sp-grid-trselected').siblings().removeClass('sp-grid-trselected');
            }
        });
    }
    //$('.grid tbody tr td').each(function () {
    //    $(this).attr("title", $(this).text());//加上title属性
    //});
}

/**sp.getPage(URL, ID);调用Ajax获取数据集 <param name="URL">URL地址</param>**/
sp.getPage = function (URL, ID) {
    /// 调用Ajax获取数据集   <param name="URL">URL地址</param> <returns>返回数据集</returns>  
    sp.AjaxControl(URL, function (result) {
        $(ID).html(result);
    });
};
/**Common.AjaxControl(URL, callBack);调用Ajax操作**/
sp.AjaxControl = function (URL, callBack) {
    /// 调用Ajax操作数据库(底层方法)    
    /// <param name="URL">URL地址</param>
    /// <param name="callBack">回调函数的作用就是在Ajax成功执行之后可以执行一个函数</param>
    /// <returns>返回数据集</returns>
    $.ajax({
        url: URL,     //这里是静态页的地址
        type: "GET", //静态页用get方法，否则服务器会抛出405错误
        //cache: false,
        async: false,
        success: function (result) {
            callBack(result);
        },
        //请求执行异常后，执行的方法
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("没有找到页面源！");
        }
    });
};


////$.cookie('set_get_clickID', "");//清空cookie 
////$.cookie("MyCssSkin", id, { path: '/', expires: 2 });//加上cookie
jQuery.cookie = function (name, value, options) {
    /// <summary>设置cookie</summary>
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

    ////Tabs方法 切换tab选项卡
    //tab多选框 - jQuery Tabs Plugins 1.0  author:chenyg@5173.com  4th Dec 2010 // URL:http://stylechen.com/jquery-tabs.html   //
    ; (function ($) {
        $.fn.extend({
            /// <summary>选项卡</summary>
            Tabs: function (options) {
                // 处理参数
                options = $.extend({
                    event: 'mouseover',
                    timeout: 0,
                    auto: 0,
                    callback: null
                }, options);
                var self = $(this),
                    tabBox = self.children('div.sp-tab-box').children('div'),
                    menu = self.children('ul.sp-tab-menu'),
                    items = menu.find('li'),
                    timer;
                var tabHandle = function (elem) {
                    elem.siblings('li').removeClass('sp-tab-current').end().addClass('sp-tab-current');
                    tabBox.siblings('div').addClass('hide').end().eq(elem.index()).removeClass('hide');
                },
                    delay = function (elem, time) {
                        time ? setTimeout(function () { tabHandle(elem); }, time) : tabHandle(elem);
                    },
                    start = function () {
                        if (!options.auto) return;
                        timer = setInterval(autoRun, options.auto);
                    },
                    autoRun = function () {
                        var current = menu.find('li.sp-tab-current'),
                            firstItem = items.eq(0),
                            len = items.length,
                            index = current.index() + 1,
                            item = index === len ? firstItem : current.next('li'),
                            i = index === len ? 0 : index;
                        current.removeClass('sp-tab-current');
                        item.addClass('sp-tab-current');
                        tabBox.siblings('div').addClass('hide').end().eq(i).removeClass('hide');
                    };
                items.bind(options.event, function () {
                    delay($(this), options.timeout);
                    if (options.callback) {
                        options.callback(self);
                    }
                });
                if (options.auto) {
                    start();
                    self.hover(function () {
                        clearInterval(timer);
                        timer = undefined;
                    }, function () {
                        start();
                    });
                }
                return this;
            }
        });
    })(jQuery);

//  
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




//iframe自适应内容长度 2016.08.07 setiframe(id);是定义的方法 window.setInterval("setiframe('id')", 10);功能：按照指定的周期（以毫秒计）来调用函数或计算表达式。
sp.setiframe = function (id) {
    /// <summary>设置iframe自适应嵌套页高度</summary>  
    window.setInterval("sp.setiframe_getPageHight('" + id + "')", 10);
}
sp.setiframe_getPageHight = function (id) {
    /// <summary>得到iframe嵌套的内容页高度</summary>
    var Iframe = document.getElementById(id);
    try {
        // 声明变量取值
        var bHeight = Iframe.contentWindow.document.body.scrollHeight;
        var dHeight = Iframe.contentWindow.document.documentElement.scrollHeight;
        var height = Math.max(bHeight, dHeight); // 取最大值
        Iframe.height = height;
    } catch (ex) { }
}

//javascript 解决IE8兼容 placeholder属性 含password 时间:20160811
sp.set_placeholder = function () {
    if (!('placeholder' in document.createElement('input'))) {
        function GetStringNumValue(pxstr) {
            return pxstr.substring(0, pxstr.length - 2);
        }
        $('input[placeholder],textarea[placeholder]').each(function () {
            var $element = $(this),
                placeholder = $element.attr('placeholder');
            if ($element.attr('type') != 'password') {//非密码  
                $element.css('color', '#cccccc');//placeholder定义文字颜色
                if ($element.val() === "") {
                    $element.val(placeholder).addClass('placeholder');
                }
                $element.focus(function () {
                    if ($element.val() === placeholder) {
                        $element.val("").removeClass('placeholder');
                        $element.css('color', '#000'); //获取焦点输入文字颜色
                    }
                }).blur(function () {   //失去焦点进行判断
                    if ($element.val() === "") {
                        $element.val(placeholder).addClass('placeholder');
                        $element.css('color', '#ccc');
                    } else if ($element.val() == placeholder) {
                        $element.css('color', '#000');
                    } else {
                        $element.css('color', '#000');
                    }
                }).closest('form').submit(function () {
                    if ($element.val() === placeholder) {
                        $element.val('');
                    }
                });
            }
            //密码框的样式  
            else {
                if (placeholder) {
                    var elementId = $element.attr('id');
                    if (!elementId) {
                        var now = new Date();
                        elementId = 'lbl_placeholder' + now.getSeconds() + now.getMilliseconds();
                        $element.attr('id', elementId);
                    }
                }
                // 添加label标签，用于显示placeholder的值  
                var $label = $('<label>', {
                    html: $element.val() ? '' : placeholder,
                    'for': elementId,
                    css: {
                        position: 'absolute',
                        color: '#cccccc',
                        fontSize: $element.css('fontSize'),
                        fontFamily: $element.css('fontFamily')
                    }
                }, '</label>').insertAfter($element);
                // 绑定事件        
                var width = $element.width();
                var width2 = width - 3 + "px";
                var width3 = "-" + width2;
                //alert(width3);
                var _setPosition = function () {
                    $label.css({
                        position: 'relative',
                        top: '',
                        left: width3
                    });
                };
                var _resetPlaceholder = function () {
                    if ($element.val()) { $label.html(null); }
                    else {
                        _setPosition();
                        $label.html(placeholder);
                    }
                };
                _setPosition();
                $element.on('focus blur input keyup propertychange resetplaceholder', _resetPlaceholder);
            }
        });
    }
}

/**2016.08.23 CutStr(len);字符串长度截取(返回需要字符串的长度加...)**/
String.prototype.CutStr = function (len) {
    /// <returns>返回需要字符串的长度加3个点（字符串...）</returns>
    var str_length = 0, str_len = 0;
    str_cut = new String();
    str_len = this.length;
    for (var i = 0; i < str_len; i++) {
        a = this.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return this;
    }
};
/**sp.CutTableTd(name);//给Table的Td加3个点和鼠标指向文字去除的文字都显示出来**/
sp.CutTableTd = function (TableID, Len) {
    /// <summary>截取table的文字长度</summary>
    /// <param name="TableID">表格的ID</param>
    /// <param name="Len">需要截取的长度</param>
    /// <returns></returns>
    $(TableID + " tr td").each(function (index, value) {
        var GetText = "";
        if ($(this).children().length > 0) {
            GetText = $(this).contents().text();//获取td中的内容
            GetText = GetText.CutStr(Len);  //截取字符串
            $(this).contents().text(GetText);//赋值td中的内容
        }
        else {
            GetText = $(this).text();//获取td中的内容
            GetText = GetText.CutStr(Len);  //截取字符串
            $(this).text(GetText);//赋值td中的内容
        }
    });
};
//通过正则表达式获取地址栏的参数 var get_name = sp.getUrlName("name");
sp.getUrlName = function (name) {
    /// <summary>获取url中特定的参数</summary>  
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
sp.getUrl = function () {
    /// <summary>获取url中全部参数</summary>
    var str = location.href; //取得整个地址栏   
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数  
    var loastr = "";
    var loc = "";
    $.each(str.split('&'), function (index, item) {
        item = item.split('=');
        var name = item[0];
        var val = item[1];
        loastr = "\"" + name + "\":\"" + val + "\",";
        loc += loastr;
    });
    loc = loc.substring(0, loc.length - 1);
    loc = "{" + loc + "}";
    var obj = JSON.parse(loc); //将字符型数组转换为对象
    return obj;
}
//设置折叠面板
sp.setPanel = function () {
    /// <summary>折叠面板</summary>
    if ($("body").find(".sp-panel-folder").length > 0) {
        $('.sp-panel-folder').each(function () {
            $('.sp-panel-head', this).on('click', function () {
                if ($(this).hasClass('click')) {
                    $(this).parent().children('.sp-panel-body').slideUp(200);
                    $(this).removeClass('click');
                } else {
                    $(this).parent().children('.sp-panel-body').slideDown(200);
                    $(this).parent().siblings('.sp-panel-folder').children('.sp-panel-body').slideUp(200);
                    $(this).parent().siblings('.sp-panel-folder').children('.sp-panel-head').removeClass('click');
                    $(this).addClass('click');
                }
            });
        });
    }
}

//获取json串的长度 var jsonLen=sp.getJsonLen(jsonData);
sp.getJsonLen = function (json) {
    /// <summary>获取json串长度</summary>
    var Length = 0;
    for (var item in json) {
        Length++;
    }
    return Length;
}

//删除含有特定文字的table某列 table:id或class名，str:特定文字
sp.removeTD = function (table, str) {
    /// <summary>removeTD("#tableTD", "编号");</summary>    
    var getindex;
    $("" + table + " thead tr th").each(function () {
        var gettext = $(this).text();
        if (gettext == str) {
            getindex = $(this).index();
            $(this).remove();
        }
    });
    $("" + table + " tbody tr").each(function () {
        $("td:eq(" + getindex + ")", this).remove();
    });
}
sp.stopPropagation = function (e) {
    /// <summary>阻止浏览器的冒泡</summary>    
    var ev = e || window.event;
    if (ev.stopPropagation) {
        ev.stopPropagation();
    }
    else if (window.event) {
        window.event.cancelBubble = true;//兼容IE
    }
}
//点击一个按钮显示div，点击div之外的地方div隐藏，点击div之内的地方div不隐藏
sp.clickDomCloseDiv = function (btn, div) {
    /// <summary>点击按钮显示div，点击页面其他地方div隐藏，点击div阻止冒泡</summary>  
    $(btn).click(function (e) {
        $(div).show();
        sp.stopPropagation(e);
    });
    $(document).bind('click', function () {
        $(div).hide();
    });
    $(div).click(function (e) {
        sp.stopPropagation(e);
    });
}
//类似：[{name:"张三", val:"111"},{name:"张三", val:"111"}]
sp.serializeJSON = function (str) {
    /// <summary>将序列化的值转成json格式</summary> 
    var testJson = decodeURIComponent(str, true);//将数据解码,调用decodeURIComponent(XXX,true);中文会乱码，需要将乱码解码
    var loastr = "";
    var loc = "";
    $.each(testJson.split('&'), function (index, item) {
        item = item.split('=');
        var name = item[0], val = item[1];
        loastr = "{\"dname\":\"" + name + "\", \"dval\":\"" + val + "\"},";
        loc += loastr;
    });
    loc = loc.substring(0, loc.length - 1);
    loc = "[" + loc + "]";
    var obj = JSON.parse(loc);//将字符型数组转换为对象
    return obj;
}

//遍历某行下的所有的td，然后将其内容以数组形式返回
sp.eachTDtoArray = function (rowid) {
    /// <summary>遍历该行td的内容,返回数组</summary> 
    var alltdText = "";
    $("#" + rowid + " td").each(function () {
        var getText = $.trim($(this).text());
        alltdText += getText + ",";
    });
    var alltdText2 = alltdText.substring(0, alltdText.length - 2);
    var obj = alltdText2.split(",");
    return obj;
}

//设置select框的年月， 程序自动跟据当前年显示20170310
//赋值年份
sp.selectYear = function (name) {
    /// <summary>设置select框的年份</summary>
    var getyear = new Date().getFullYear(); //今年             
    for (var i = (getyear - 20); i < (getyear + 20); i++) //以今年为准，前30年，后30年
    {
        $(name).append("<option value='" + i + "'>" + i + "</option>");
    }
    $(name).find("option[value='" + getyear + "']").attr("selected", true);
    $(name).val(getyear);
}
//赋值月份
sp.selectMonth = function (name) {
    /// <summary>设置select框的月份</summary>
    var getMonth = new Date().getMonth() + 1;  //当前月          
    for (var i = 1; i < 13; i++) {
        $(name).append("<option value='" + i + "'>" + i + "</option>");
    }
    $(name).find("option[value='" + getMonth + "']").attr("selected", true);
    $(name).val(getMonth);
}

sp.showLocalTime = function (divname) {
    /// <summary>动态显示当地时间</summary> 
    var objDate = new Date();
    var str, colorhead, colorfoot;
    var yy = objDate.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objDate.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objDate.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = objDate.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = objDate.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = objDate.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var ww = objDate.getDay();
    if (ww == 0) ww = "星期日";
    if (ww == 1) ww = "星期一";
    if (ww == 2) ww = "星期二";
    if (ww == 3) ww = "星期三";
    if (ww == 4) ww = "星期四";
    if (ww == 5) ww = "星期五";
    if (ww == 6) ww = "星期六";
    str = yy + "年" + MM + "月" + dd + "日&nbsp;" + hh + ":" + mm + ":" + ss + "&nbsp;" + ww;
    var get_time = str;
    $(divname).html(get_time);
    window.setTimeout("sp.showLocalTime('" + divname + "')", 1000);  ///延时1秒执行
};

//获取当前时间，格式：2018-1-27 10:47:15
sp.getLocalDate = function () {
    var objDate = new Date();
    var str, colorhead, colorfoot;
    var yy = objDate.getFullYear();
    var MM = objDate.getMonth() + 1;
    var dd = objDate.getDate();
    var hh = objDate.getHours();
    var mm = objDate.getMinutes();
    var ss = objDate.getSeconds();
    str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
    return str;
};
//利用当前时间生成yyyymmddhhmmss这样的字符串
sp.setNumRandom = function () {
    var date = new Date();
    var yyyy = date.getFullYear().toString();
    var MM = date.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = date.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = date.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = date.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var millisecond = date.getMilliseconds();    //获取当前毫秒数(0-999)
    var setTimeStr = yyyy + MM + dd + hh + mm + ss + millisecond;
    return setTimeStr;
};
//格式化日期  如：2017-10-10 22:33:32
sp.format = function (str) {
    if (str == "1900-01-01T00:00:00") {
        str = "";
        return str;
    } else if (str == "0001-01-01T00:00:00") {
        ///这种情况是在做滨旅建管系统时用sqlserver数据库时遇到的
        str = "";
        return str;
    } else if (str == "-") {
        ///在做滨旅建管时存的是—,然后就让其显示—
        str = "-";
        return str;
    } else if (str != undefined && str != "" && str != null) {
        /////如果找到"-",不等于负1
        if (str.toString().indexOf('-') != -1) {
            str = str.replace(/-/g, "/"); //将-替换为/，因为ios与ie浏览器中不支持-和T
        }
        /////如果找到T,不等于负1
        if (str.toString().indexOf('T') != -1) {
            str = str.replace(/T/g, ' '); ///去掉日期中的T，因为ios与ie浏览器中不支持-和T              
        }
        /////如果找到".",不等于负1
        if (str.toString().indexOf('.') != -1) {
            str = str.slice(0, str.indexOf(".")); ///如果含有毫秒，就将毫秒去掉
        }
        var formatDate = new Date(Date.parse(str));
        var yy = formatDate.getFullYear();
        var MM = formatDate.getMonth() + 1;
        if (MM < 10) { MM = '0' + MM; }
        var dd = formatDate.getDate();
        if (dd < 10) { dd = '0' + dd; }
        var setDate = yy + "-" + MM + "-" + dd;
        return setDate;
    } else {
        str = "";
        return str;
    }
};
///格式化时间,为年月日时分秒
sp.formatMinute = function (str) {
    if (str == "1900-01-01T00:00:00") {
        str = "";
        return str;
    } else if (str == "0001-01-01T00:00:00") {
        ///这种情况是在做滨旅建管系统时用sqlserver数据库时遇到的
        str = "";
        return str;
    }
    else if (str != undefined && str != "" && str != null) {
        /////如果找到"-",不等于负1
        if (str.toString().indexOf('-') != -1) {
            str = str.replace(/-/g, "/"); //将-替换为/，因为ios与ie浏览器中不支持-和T
        }
        /////如果找到T,不等于负1
        if (str.toString().indexOf('T') != -1) {
            str = str.replace(/T/g, ' '); ///去掉日期中的T，因为ios与ie浏览器中不支持-和T              
        }
        /////如果找到".",不等于负1
        if (str.toString().indexOf('.') != -1) {
            str = str.slice(0, str.indexOf(".")); ///如果含有毫秒，就将毫秒去掉
        }
        var formatDate = new Date(Date.parse(str));
        var yy = formatDate.getFullYear();
        var MM = formatDate.getMonth() + 1;
        if (MM < 10) { MM = '0' + MM; }  //去掉前面加0，是为了便于后续的格式化得到年月
        var dd = formatDate.getDate();
        if (dd < 10) { dd = '0' + dd; } //去掉前面加0，是为了便于后续的格式化得到年月
        var hh = formatDate.getHours();
        if (hh < 10) { hh = '0' + hh; }
        var mm = formatDate.getMinutes();
        if (mm < 10) { mm = '0' + mm; }
        var ss = formatDate.getSeconds();
        if (ss < 10) { ss = '0' + ss; }
        var setDate = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
        return setDate;
    } else {
        str = "";
        return str;
    }
};

///格式化时间，显示当前月最后一天
sp.formatMonthLast = function (str) {
    if (str == "1900-01-01T00:00:00") {
        str = "";
        return str;
    } else if (str == "0001-01-01T00:00:00") {
        ///这种情况是在做滨旅建管系统时用sqlserver数据库时遇到的
        str = "";
        return str;
    }
    else if (str != undefined && str != "" && str != null) {
        /////如果找到"-",不等于负1
        if (str.toString().indexOf('-') != -1) {
            str = str.replace(/-/g, "/"); //将-替换为/，因为ios与ie浏览器中不支持-和T
        }
        /////如果找到T,不等于负1
        if (str.toString().indexOf('T') != -1) {
            str = str.replace(/T/g, ' '); ///去掉日期中的T，因为ios与ie浏览器中不支持-和T              
        }
        /////如果找到".",不等于负1
        if (str.toString().indexOf('.') != -1) {
            str = str.slice(0, str.indexOf(".")); ///如果含有毫秒，就将毫秒去掉
        }
        var formatDate = new Date(Date.parse(str));
        var yy = formatDate.getFullYear();
        var MM = formatDate.getMonth() + 1;
        var returnData = sp.getLastDayOfMonth(yy, MM);
        return returnData;
    } else {
        str = "";
        return str;
    }
};

/** 
* 获取某年某月的最后一天 
*/
sp.getLastDayOfMonth = function (year, month) {
    //获取本年本月的第一天日期 
    var date = new Date(year, month - 1, '01');
    //设置日期 
    date.setDate(1);
    //设置月份 
    date.setMonth(date.getMonth() + 1);
    //获取本月的最后一天 
    cdate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
    //打印某年某月的最后一天 
    //alert(cdate.getFullYear() + "年" + (Number(cdate.getMonth()) + 1) + "月最后一天的日期:" + cdate.getDate() + "日");
    var setData = cdate.getFullYear() + "-" + (Number(cdate.getMonth()) + 1) + "-" + cdate.getDate();
    //返回结果 
    return setData;
}


////格式化日期获取其年份
sp.formatGetYear = function (str) {
    var formatDate = new Date(Date.parse(str));
    var yy = formatDate.getFullYear();
    return yy;
}
////格式化日期获取其月份
sp.formatGetMonth = function (str) {
    var formatDate = new Date(Date.parse(str));
    var MM = formatDate.getMonth() + 1;
    return MM;
}
////获取当前年份
sp.currentYear = function () {
    var date = new Date();
    var yyyy = date.getFullYear().toString();
    return yyyy;
}
////获取当前月份
sp.currentMonth = function () {
    var date = new Date();
    var MM = date.getMonth() + 1;
    return MM;
}
//只冻结表格头部首行    调用方式 fixTableHead('#TableId', 200),只能调用table的ID table表的宽度应该限制为固定宽度，width:100%;
sp.fixTableHead = function (gv, scrollHeight) {
    /// <summary>只冻结表格头部首行</summary>  
    $(document).ready(function () {
        var gvn = $(gv).clone(true).removeAttr("id");
        $(gvn).find("tr:not(:first)").remove();
        $(gv).before(gvn);
        $(gv).find("tr:first").remove();
        $(gv).wrap("<div id='FixedTable' style='width:auto;height:" + scrollHeight + "px;overflow-y: auto; overflow-x: hidden;scrollbar-face-color: #e4e4e4;scrollbar-heightlight-color: #f0f0f0;scrollbar-3dlight-color: #d6d6d6;scrollbar-arrow-color: #240024;scrollbar-darkshadow-color: #d6d6d6; padding: 0;margin: 0;'></div>");
        var lie = $(gvn).find('thead').find("th").length - 1;
        var arr = $(gvn).find('thead').find("th");
        if ($("#FixedTable").height() > scrollHeight) {
            var lastwidth = $(arr[lie]).width() + 10;
            $(arr[lie]).attr('style', 'width:' + lastwidth + 'px;border-right: 0px');
        } else {
            $(arr[lie]).attr('style', 'border-right: 0px')
        }
    });
}

//冻结头和列 调用： fixTable("MyTable", 1, 600, 300); 锁定表头和列: Table的ID、列的个数、显示的宽度、显示的高度,宽度不固定
///     锁定表头和列.  table表的宽度是不能限制为固定，min-width:100%; 
sp.fixTable = function (TableID, FixColumnNumber, width, height) {
    /// <summary>冻结表头和列</summary>
    $(document).ready(function () {
        if ($("#" + TableID + "_tableLayout").length != 0) {
            $("#" + TableID + "_tableLayout").before($("#" + TableID)); $("#" + TableID + "_tableLayout").empty();
        }
        else {
            $("#" + TableID).after("<div id=\"" + TableID + "_tableLayout\" style=\"overflow:hidden;height:" + height + "px; width:" + width + "px;\"></div>");
        }
        $("<div id=\"" + TableID + "_tableFix\"></div>" + "<div id=\"" + TableID + "_tableHead\"></div>" + "<div id=\"" + TableID + "_tableColumn\"></div>" + "<div id=\"" + TableID + "_tableData\"></div>").appendTo("#" + TableID + "_tableLayout");

        var oldtable = $("#" + TableID);
        var tableFixClone = oldtable.clone(true);
        tableFixClone.attr("id", TableID + "_tableFixClone");
        $("#" + TableID + "_tableFix").append(tableFixClone);
        var tableHeadClone = oldtable.clone(true);
        tableHeadClone.attr("id", TableID + "_tableHeadClone");
        $("#" + TableID + "_tableHead").append(tableHeadClone);
        var tableColumnClone = oldtable.clone(true);
        tableColumnClone.attr("id", TableID + "_tableColumnClone");
        $("#" + TableID + "_tableColumn").append(tableColumnClone);
        $("#" + TableID + "_tableData").append(oldtable);
        $("#" + TableID + "_tableLayout table").each(function () {
            $(this).css("margin", "0");
        });
        var HeadHeight = $("#" + TableID + "_tableHead thead").height();
        HeadHeight += 2;
        $("#" + TableID + "_tableHead").css("height", HeadHeight);
        $("#" + TableID + "_tableFix").css("height", HeadHeight);
        var ColumnsWidth = 0;
        var ColumnsNumber = 0;
        $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function () {
            ColumnsWidth += $(this).outerWidth(true);
            ColumnsNumber++;
        });
        ColumnsWidth += 2;
        if ($.browser.msie) {
            switch ($.browser.version) {
                case "7.0":
                    if (ColumnsNumber >= 3) ColumnsWidth--;
                    break;
                case "8.0":
                    if (ColumnsNumber >= 2) ColumnsWidth--;
                    break;
            }
        }
        $("#" + TableID + "_tableColumn").css("width", ColumnsWidth);
        $("#" + TableID + "_tableFix").css("width", ColumnsWidth);
        $("#" + TableID + "_tableData").scroll(function () {
            $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
            $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
        });
        $("#" + TableID + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50", "background-color": "Silver" });
        $("#" + TableID + "_tableHead").css({ "overflow": "hidden", "width": width - 17, "position": "relative", "z-index": "45", "background-color": "#fff" });
        $("#" + TableID + "_tableColumn").css({ "overflow": "hidden", "height": height - 17, "position": "relative", "z-index": "40", "background-color": "Silver" });
        $("#" + TableID + "_tableData").css({ "overflow": "scroll", "width": width, "height": height, "position": "relative", "z-index": "35" });
        if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
            $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
            $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + 17);
        }
        if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
            $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
            $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
        }
        $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
        $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
        $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
        $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
    });
}



sp.fixTab = function (TableID, FixColumnNumber) {
    if ($("#" + TableID + "_tableLayout").length != 0) {
        $("#" + TableID + "_tableLayout").before($("#" + TableID));
        $("#" + TableID + "_tableLayout").empty();
    } else {
        $('#' + TableID).after('<div id="' + TableID + '_tableLayout" style="overflow:hidden;width:100%;height:100%"></div>');
    }
    // $("#" + TableID + "_tableLayout").remove();
    $("#" + TableID + "_tableLayout").append('<div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="columnBox" sty="overflow:hidden"><div id="' + TableID + '_tableColumn"></div></div>' + '<div id="' + TableID + '_tableData"></div>')
    var oldtable = $("#" + TableID);
    var tableFixClone = oldtable.clone(true);
    tableFixClone.attr("id", TableID + "_tableFixClone");
    $("#" + TableID + "_tableFix").append(tableFixClone);
    var tableHeadClone = oldtable.clone(true);
    tableHeadClone.attr("id", TableID + "_tableHeadClone");
    $("#" + TableID + "_tableHead").append(tableHeadClone);
    var tableColumnClone = oldtable.clone(true);
    tableColumnClone.attr("id", TableID + "_tableColumnClone");
    $("#" + TableID + "_tableColumn").append(tableColumnClone);
    $("#" + TableID + "_tableData").append(oldtable);
    $("#" + TableID + "_tableLayout table").each(function () {
        $(this).css("margin", "0");
    });
    var HeadHeight = $("#" + TableID + "_tableHead thead").height();

    HeadHeight += 2;
    $("#" + TableID + "_tableHead").css("height", HeadHeight);
    $("#" + TableID + "_tableFix").css("height", HeadHeight);
    var ColumnsWidth = 0;
    var ColumnsNumber = 0;
    $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function () {
        ColumnsWidth += $(this).outerWidth(true);
        ColumnsNumber++;
    });
    ColumnsWidth += 2;
    if ($.browser.msie) {
        switch ($.browser.version) {
            case "7.0":
                if (ColumnsNumber >= 3) ColumnsWidth--;
                break;
            case "8.0":
                if (ColumnsNumber >= 2) ColumnsWidth--;
                break;
        }
    }

    // $("#" + TableID + "_tableColumnClone").width(oldtable.width()); /* 设置显示列的表的宽度 */
    // $("#" + TableID + "_tableFixClone").width(oldtable.width()); /* 设置显示列的表的宽度 */
    // $("#" + TableID + "_tableHeadClone").width(oldtable.width()); /* 设置显示列的表的宽度 */


    $("#" + TableID + "_tableColumnClone").width(oldtable.outerWidth()); /* 设置显示列的表的宽度 */
    $("#" + TableID + "_tableFixClone").width(oldtable.outerWidth()); /* 设置显示列的表的宽度 */
    $("#" + TableID + "_tableHeadClone").width(oldtable.outerWidth()); /* 设置显示列的表的宽度 */
    oldtable.width(oldtable.outerWidth()); /* 设置显示的表的宽度 */

    $("#columnBox").css("width", ColumnsWidth);
    $("#" + TableID + "_tableColumn").css("width", ColumnsWidth + 17);
    $("#" + TableID + "_tableFix").css("width", ColumnsWidth);

    // if(window.sessionStorage){
    //     if(sessionStorage.getItem(location.href + 'Left')){
    //         $("#" + TableID + "_tableData").scrollLeft(sessionStorage.getItem(location.href + 'Left'));
    //     }
    //     if(sessionStorage.getItem(location.href + 'Top')){
    //         $("#" + TableID + "_tableData").scrollLeft(sessionStorage.getItem(location.href + 'Top'));
    //     }
    // }



    var scrollFlag = false;

    $("#" + TableID + "_tableData").on('scroll', function () {
        if (scrollFlag) {
            return;
        }
        $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
        $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
        // if($("#" + TableID + "_tableColumn").scrollTop()<$("#" + TableID + "_tableData").scrollTop()){
        //     $("#" + TableID + "_tableColumn").css('paddingBottom',2)
        // }
    })
    $("#" + TableID + "_tableColumn").on('scroll', function () {
        if (!scrollFlag) {
            return;
        }
        $("#" + TableID + "_tableData").scrollTop($("#" + TableID + "_tableColumn").scrollTop());
    })
    $("#" + TableID + "_tableData").on('mouseover', function () {
        scrollFlag = false;

    })
    $("#" + TableID + "_tableColumn").on('mouseover', function () {
        scrollFlag = true;
    })

    var par_height = $("#" + TableID + "_tableLayout").height();
    var par_width = $("#" + TableID + "_tableLayout").width();

    $("#" + TableID + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50", "background-color": "#fff" });
    $("#" + TableID + "_tableHead").css({ "overflow": "hidden", "width": par_width - 8, "position": "relative", "z-index": "45", "background-color": "#fff" });

    $("#columnBox").css({ "overflow": "hidden", "height": par_height - 17, "position": "relative", "z-index": "40", "background-color": "#fff" });

    $("#" + TableID + "_tableColumn").css({ "overflow": "scroll", "height": par_height, "position": "relative", "z-index": "40" });

    $("#" + TableID + "_tableData").css({ "overflow": "scroll", "height": par_height, "position": "relative", "z-index": "35" });

    if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
        $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
        $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width());
    }
    if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
        $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").outerHeight() + 17);
        $("#columnBox").css("height", $("#" + TableID + "_tableColumn table").outerHeight());

        // $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height());
    }


    $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
    $("#columnBox").offset($("#" + TableID + "_tableLayout").offset());
    // $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
    var flag = false;
    $(window).resize(function () {
        if (flag)
            return;
        setTimeout(function () {
            par_height = $("#" + TableID + "_tableLayout").height();
            $("#" + TableID + "_tableColumn").height(par_height - 17);
            $("#" + TableID + "_tableData").height(par_height);

            if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableFix table").width()) {
                $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableFix table").width());
                $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width());
            }
            if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
                $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").outerHeight() + 17);
                $("#columnBox").css("height", $("#" + TableID + "_tableColumn table").outerHeight());

                // $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height());
            }
            $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
            $("#columnBox").offset($("#" + TableID + "_tableLayout").offset());
            // $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
            $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
            flag = false;
        }, 100);
        flag = true;
    });
    // return $("#" + TableID + "_tableLayout").html();
}

////实时保存，实时保存表单数据 【2018-3-25】
///用法：sp.localStorage("#formPlan",85);
//从localStorage中加载数据记得删除： 
//var setId = "localStorage_formPlan_" + dataID;
//localStorage.removeItem(setId);  
sp.localStorage = function (formId, dataID) {
    /// <summary>formId:为form定义的id</summary>
    /// <summary>dataID:表单数据的ID,目的防止重复</summary>
    var get_formid = $(formId).attr("id");

    ////声明本地存储localStorage的名称
    var set_localStorage = 'localStorage_' + get_formid + "_" + dataID;

    ///声明变量，得到form下面的带有name的所有控件
    var formControls = $(formId).find("input:text[name],textarea[name],select[name]");
    //从本地取localStorage
    var storage = localStorage.getItem(set_localStorage);

    ////如果，本地从本地取localStorage不为null，
    ///遍历localStorage中的值，
    if (storage != null) {
        var myData = JSON.parse(storage);
        formControls.each(function (i, e) {
            var name = $(e).attr("name");
            if (myData[name] != null) {
                $(e).val(myData[name]);
                $(e).change();
            }
        });
    }

    //绑定change事件，监听onchage事件
    formControls.each(function (i, el) {
        var name = $(el).attr('name');
        if (name) {
            $(el).on('change', function () {
                onchange(this);
            });
        }
    });

    //触发onchange事件时，保存到本地存储，或者更新本地存储中的值
    function onchange(el) {

        var storage = localStorage.getItem(set_localStorage);
        if (storage == null) {
            var formDataDb = new Object();
            var key = $(el).attr("name");
            var value = $(el).val();
            formDataDb[key] = value;
            localStorage.setItem(set_localStorage, JSON.stringify(formDataDb));
        } else {
            var myData = JSON.parse(storage);
            var key = $(el).attr("name");
            var value = $(el).val();
            myData[key] = value;
            localStorage.setItem(set_localStorage, JSON.stringify(myData));
        }
    }
}
//获取滚动条宽度
sp.getScrollbarWidth = function () {
    var oP = document.createElement('p'), styles = {
        width: '100px',
        height: '100px',
        overflowY: 'scroll',
    }, i, scrollbarWidth;

    for (i in styles) {
        oP.style[i] = styles[i];
    }
    document.body.appendChild(oP);
    scrollbarWidth = oP.offsetWidth - oP.clientWidth;
    oP.remove();

    return scrollbarWidth;
}

// ************** 使用列很多的表格
sp.fixTab2 = function (TableID, FixColumnNumber) {
    var scrollWidth = 17
    var table = "#" + TableID;
    var $table = $(table);
    if ($(table + "_tableLayout").length != 0) {
        $(table + "_tableLayout").before($(table));
        $(table + "_tableLayout").empty();
    } else {
        $table.after('<div id="' + TableID + '_tableLayout" style="overflow:hidden;width:100%;max-height:95%;position:relative"></div>');
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


    // console.log($table.width());
    // console.log($table.outerWidth());

    // $table.width(tableWidth); 
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
            // $columnBox.css({"width":ColumnsWidth,"height": par_height - 17});
            // $tableColumn.css({"width": ColumnsWidth+scrollWidth,"height": par_height - 17});
            // $tableData.css({"width":par_width-17,"height": par_height-HeadHeight});

            $tableHead.width(par_width - 17);
            $columnBox.height(par_height - 17);
            $tableColumn.height(par_height - 17);
            $tableData.height(par_height - HeadHeight);

            flag = false;
        }, 100);
        flag = true;
    });
    // return $("#" + TableID + "_tableLayout").html();
}


// ************** 使用很多列的表格
sp.fixTabMoreCol = function (TableID, FixColumnNumber) {
    var scrollWidth = 17
    var table = "#" + TableID;
    var $table = $(table);
    // if ($(table + "_tableLayout").length != 0) {
    //     $(table + "_tableLayout").before($(table));
    //     $(table + "_tableLayout").empty();
    // } else {
    //     $table.after('<div id="' + TableID + '_tableLayout" style="overflow:hidden;width:100%;height:100%;position:relative"></div>');
    // }


    var $tableLayout = $(table + "_tableLayout");

    //添加外壳
    // $tableLayout.append('<div id="scrollMask"></div><div id="' + TableID + '_tableFix"></div>' + '<div id="' + TableID + '_tableHead"></div>' + '<div id="columnBox"><div id="' + TableID + '_tableColumn"></div></div>' + '<div id="' + TableID + '_tableData"></div>')

    //获取外壳
    var $tableFix = $(table + "_tableFix");
    var $tableHead = $(table + "_tableHead");
    var $columnBox = $("#columnBox");
    var $tableColumn = $(table + "_tableColumn");
    var $tableData = $(table + "_tableData");
    //获取原表宽度
    var tableWidth = $table.outerWidth();
    $table.width(tableWidth);
    //获取表头高度
    var HeadHeight = $(table + " thead").outerHeight() + 1;

    var ColumnsWidth = 0;
    var ColumnsNumber = 0;
    $("#" + TableID + " tr:last td:lt(" + FixColumnNumber + ")").each(function () {
        ColumnsWidth += $(this).outerWidth(true);
        ColumnsNumber++;
    });
    ColumnsWidth += 1;

    var par_height = $tableLayout.outerHeight();
    var par_width = $tableLayout.outerWidth();


    //左上角
    setTimeout(function () {
        var $tableFixClone = $('#MyTable_tableFixClone');
        $tableFixClone.css("margin", "0").width(tableWidth)
        $tableFix.css({ "height": HeadHeight, "width": ColumnsWidth, "overflow": "hidden", "position": "absolute", "top": 0, "left": 0, "z-index": "50", "background-color": "#fff" }).append($tableFixClone);
    })

    //表头
    setTimeout(function () {
        var $tableHeadClone = $('#MyTable_tableHeadClone');
        $tableHeadClone.css("margin", "0").width(tableWidth)
        $tableHead.css({ "height": HeadHeight, "overflow": "hidden", "width": par_width - scrollWidth, "position": "absolute", "top": 0, "left": 0, "z-index": "45", "background-color": "#fff" });
    })

    //列
    setTimeout(function () {
        var $tableColumnClone = $("#MyTable_tableColumnClone");
        $tableColumnClone.css("margin", "0").width(tableWidth);
        $columnBox.css({ "width": ColumnsWidth, "overflow": "hidden", "height": par_height - 17, "position": "absolute", "top": 0, "left": 0, "z-index": "40", "background-color": "#fff" });

        $tableColumn.css({ "width": ColumnsWidth + scrollWidth, "overflow-x": "hidden", "overflow-y": "scroll", "height": par_height - 17, "position": "absolute", "top": 0, "left": 0, "z-index": "40" });

        var scrollFlag = false;
        $tableData.css({ "overflow": "scroll", "height": par_height - HeadHeight, "position": "relative", "z-index": "35", "margin-top": HeadHeight });

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
            $columnBox.height(par_height - 17);
            $tableColumn.height(par_height - 17);
            $tableData.height(par_height - HeadHeight);

            flag = false;
        }, 100);
        flag = true;
    });
    // return $("#" + TableID + "_tableLayout").html();
}