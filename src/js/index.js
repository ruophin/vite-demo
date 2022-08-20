nie.define('index', function () {
    var videoModule = nie.require("nie.util.videoV2"),
        PopDialog = nie.require("nie.util.PopDialog");
    var fn = {
        showPop: function (className) {
            $('.Layer').addClass("on");
            var obj = $('.' + className);
            obj.show();
            var popTop = obj.height() / 2;
            var popLeft = obj.width() / 2;
            obj.css({ 'margin-top': -popTop, 'margin-left': -popLeft });
            // $(document.body).css("overflow-y","hidden"); // 阻止页面滑动
        },
        hidePop: function () {
            $('.pop').hide();
            $('.Layer').removeClass("on");
            // $(document.body).css("overflow-y","auto");
        },
        videoFn: function () {
            $(".playVideo").bind("click", function () {
                var vurl = $(this).data('video');
                var video = videoModule({
                    fat: "#video-pop .video-box",//放视频的容器
                    width: "800",//视频宽度
                    height: "450",//视频高度
                    //wmode:"direct",//flash wmode值,默认direct
                    movieUrl: vurl,//标清视频地址
                    // HDmovieUrl : vurl,//高清视频地址
                    // SHDmovieUrl : vurl,//超清视频地址
                    vtype: "",//默认选用哪种清晰度，分别有d,hd,shd，默认不填则会采用校验网速然后自动匹配
                    autoPlay: true//是否自动播放，默认false
                });
                fn.showPop("video-pop");
            });
            $(".Layer,.close,.btn-close").bind('click', function () {
                fn.hidePop();
                $('.video-box').empty();
            });
        },
        yingxiaoFn: function () {
            function rand (num) {
                return Math.floor(Math.random() * num) + 1;
            }
            $("body").append("<iframe src='" + $("#js_yingxiao").html() + "&cache=" + rand(9999999) + "&pre=" + escape(document.referrer) + "' width='0' height='0' style='display: none'></iframe>")
        },
        bindFn: function () {
            //底部版权
            $(".showCopyBtn").click(function () {
                $(this).toggleClass("on");
                $(".bottom_copyright").toggleClass("on");
            })
            //时装男女切换
            $(".szChangeBtn a").click(function () {
                var index = $(this).index()
                $(this).addClass("on").siblings().removeClass("on");
                $(".szRoleWrap .roleItem").eq(index).addClass("on").siblings().removeClass("on");
            })
            //坐骑切换
            $(".zqChangeBtn a").click(function () {
                var index = $(this).index()
                $(this).addClass("on").siblings().removeClass("on");
                $(".zqRoleWrap .roleItem").eq(index).addClass("on").siblings().removeClass("on");
            })
        },
        swiperInit: function () {
            var name = [
                'home',
                'cloth',
                'mount'
            ];

            var mySwiper1 = new Swiper('.swiper1', {
                initialSlide: 0,
                direction: 'horizontal',
                speed: 700,
                pagination: '.menu',
                paginationClickable: true,
                mousewheelReleaseOnEdges: true,
                preloadImages: false,
                onlyExternal: true,
                simulateTouch: false,
                mousewheelControl: true,
                paginationBulletRender: function (swiper, index, className) {
                    return '<span class="' + className + '"><i class="' + name[(index)] + '"></i></span>';
                },
            });
        },
        init: function () {
            var that = this;
            that.videoFn();
            that.bindFn();
            that.swiperInit();
        }
    };
    fn.init()
})
nie.config.stats.clickStats = true;
nie.config.stats.clickStatsPrecent = 1;
// nie.config.copyRight.setWhite();
