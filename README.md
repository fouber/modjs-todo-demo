## 安装fis

```bash
npm install -g fis
```

非win系统最好将npm的包安装在用户目录下，尽量避免使用 ``sudo`` 来安装。修改npm install -g安装目录的方法为：

```bash
# 设置global路径为用户目录
npm config set prefix ~/npm
# 将~/npm/bin路径加到PATH变量中
echo -e '\nexport PATH=~/npm/bin:$PATH' >> ~/.bashrc
# 重新载入.bashrc
source ~/.bashrc
# 安装fis
npm install -g fis
```

安装成功后执行 ``fis -h`` 即可看到相关开发命令帮助

## 让代码跑起来！

首先，启动内置的调试服务器：

```bash
fis server start --no-rewrite
```

此时fis会启动一个精巧的jetty服务器，并且打开浏览器访问了 http://127.0.0.1:8080 ，现在这个调试环境什么也没有，接下来，我们在命令行下cd到我们下载的样例项目中：

```bash
cd todo-demo
```

第三步，执行fis的编译命令：

```bash
fis release
```

第四步，刷新浏览器，查看我们的项目。

## 各种功能体验

1. 给所有资源加 ``md5版本戳``，执行：

    ```bash
    fis release -m
    ```
    
    然后刷新浏览器，看一下源码吧！

1. 压缩js、css、图片，执行：

    ```bash
    fis release -o
    ```

1. 校验js，执行：

    ```bash
    fis release -l
    ```

1. 自动csssprite，执行：

    ```bash
    fis release -p
    ```
    
    可以看到 ``#todo-list label`` 的图片都自动合并了哦

1. 所有静态资源加域名，先修改fis-conf.js文件，去除掉 ``第2行`` 的注释，然后执行：

    ```bash
    fis release -D
    ```

1. 文件监听，执行：

    ```bash
    fis release -w
    ```
    
    命令行窗口不要关闭，然后去修改源码->保存->刷新浏览器，就能看到更新的效果。

1. 文件上传，执行：

    ```bash
    fis release -d remote
    ```
    
    就可以发布到我的一个小服务器上，然后浏览器访问： http://vm-1.chongzi.kd.io/

1. 加域名、压缩、加md5戳、校验、csssprite、把编译好的文件产出到output目录中（其实就是随意组合使用前面提到面的参数啦）：

    ```bash
    fis release -Domlp -d ../output
    ```

1. 文件监听、启动live-reload服务器、同时发布到本地调试目录、outpu目录和远端服务器：

    ```bash
    fis release -wLd preview,remote,../output
    ```

    使用自动刷新功能需要添加 ``live-reload`` 浏览器插件，请google之，我没做可以自动添加脚本的功能，因为懒。。。

## 目录规范

任何 ``目录规范``、``部署规范``、``编译规范`` 都是可配置的，不过略微麻烦一些，有兴趣的同学可以在issues里留言，这里只介绍内置的规范。

内置的规范包括：

1. ``.less`` 后缀的文件是less文件，编译后得到css文件。
1. ``.minix.less`` 后缀的文件定义less的minix，编译后不会产出。
1. ``.coffee`` 后缀的文件是coffee-script，编译后得到js文件。
1. ``.tmpl`` 后缀的文件是underscore前端模板，左右定界符为 ``<%`` 和 ``%>``，编译后不会产出。在js或coffee中使用 [``__inline('path')``](https://github.com/fouber/seajs-todo-demo/blob/c80f78cd56c2ad31ff344892f7a0dd5648f049d0/sea-modules/views/todos.js#L12) 函数将其嵌入到js或coffee文件中作为模板函数使用。
1. 扔在 ``sea-modules`` 目录下的js、css、less、coffee文件都是模块化文件，会自动包装define，自己就不要写了。使用seajs.use或者require加载模块的时候id与文件的对应规则是这样的：
<table>
    <tr>
        <td>文件</td>
        <td>引用id</td>
        <td>举个例子</td>
    </tr>
    <tr>
        <td>/sea-modules/a.js</td>
        <td>a</td>
        <td>seajs.use('a');</td>
    </tr>
    <tr>
        <td>/sea-modules/b/b.js</td>
        <td>b</td>
        <td>seajs.use('b');</td>
    </tr>
    <tr>
        <td>/sea-modules/b/c.js</td>
        <td>b/c</td>
        <td>seajs.use('b/c');</td>
    </tr>
</table>
1. 扔在 ``lib`` 目录下的文件不被认为是模块化的，请直接在页面上使用script或link标签引用。

> 如果使用中遇到什么觉得诡异的地方，欢迎在 [issues](https://github.com/fouber/fis/issues) 留言