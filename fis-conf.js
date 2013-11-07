//插件与配置
fis.config.merge({
    modules : {
        parser : {
            //.tmpl后缀的文件使用fis-parser-utc插件编译
            tmpl : 'utc',
            //.coffee后缀的文件使用fis-parser-coffee-script插件编译
            coffee : 'coffee-script',
            //.less后缀的文件使用fis-parser-less插件编译
            less : 'less'
        },
        postprocessor : {
            js : 'jswrapper, require-async'
        },
        postpackager : 'modjs'
    },
    settings : {
        parser : {
            'coffee-script' : {
                //不用coffee-script包装作用域
                bare : true
            }
        },
        postprocessor : {
            jswrapper : {
                type : 'amd'
            }
        },
        postpackager : {
            modjs : {
                subpath : 'pkg/map.js'
            }
        }
    },
});

//目录规范

fis.config.merge({
    roadmap : {
        path : [
            {
                //一级同名组件，可以引用短路径，比如sea-modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg : /^\/modules\/([^\/]+)\/\1\.(js|coffee)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id为文件夹名
                id : '$1'
            },
            {
                //sea-modules目录下的其他文件
                reg : /^\/modules\/(.*)\.(js|coffee)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id是去掉sea-modules和.js后缀中间的部分
                id : '$1'
            },
            {
                //.mixin.less后缀的文件
                reg : /\.mixin\.less$/,
                //仅当做函数调用，不发布
                release : false
            },
            {
                //其他js、css、coffee、less文件
                reg : /\.(js|coffee|css|less)$/,
                //less和css文件会做csssprite处理
                useSprite : true,
                //不要放到js资源表里
                useMap : false
            },
            {
                //readme文件，不要发布
                reg : /\/readme.md$/i,
                release : false
            },
            {
                //前端模板
                reg : '**.tmpl',
                //当做类js文件处理，可以识别__inline, __uri等资源定位标识
                isJsLike : true,
                //只是内嵌，不用发布
                release : false
            },
            {
                //map.json没什么用，就不要发布了
                reg : 'map.json',
                release : false
            }
        ],
        ext : {
            //less输出为css文件
            less : 'css',
            //coffee输出为js文件
            coffee : 'js'
        }
    }
});

//静态资源域名，使用spmx release命令时，添加--domains或-D参数即可生效
//fis.config.set('roadmap.domain', 'http://127.0.0.1:8080');

//如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
//否则png图片透明部分在ie下会显示灰色背景
//使用spmx release命令时，添加--optimize或-o参数即可生效
//fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用spmx release命令时，添加--lint或-l参数即可生效
//fis.config.set('settings.lint.jshint.ignored', [ 'lib/**', /jquery|backbone|underscore/i ]);

//csssprite处理时图片之间的边距，默认是3px
fis.config.set('settings.spriter.csssprites.margin', 20);

//配置一些seajs.config的配置项
//请不要在此配置alias项，系统会帮你管理的
//fis.config.set('seajs', {});

//使用spmx release是添加-d remote参数，即可将项目发布到http://vm-1.chongzi.kd.io/机器上
//这个机器有时候可能没开启，大家自己另外搭服务器尝试吧
//receiver.php在：https://github.com/fouber/fis-command-release/blob/master/tools/receiver.php
fis.config.set('deploy.remote', {
    receiver : 'http://vm-1.chongzi.kd.io/receiver.php',
    to : '/home/chongzi/Web/'
});


//打包配置
fis.config.set('pack', {
    'pkg/aio.js' : [ 'modules/**.js', 'modules/**.coffee' ]
});
