1.说明：
版本控制：git ，仓库地址：git@github.com:jsweber/link_art.git

本项目最后的发布内容为dist文件中的所有内容
压缩生成的打包css和js文件名以所引用的html文件同名
考虑到渲染性能问题，vue.js和common.js并不参与打包，所以直接复制到dist/js文件下
test.js/css可以当作外链的开发文件或者插件，这些文件统一打包压缩。

/*图片最后统一压缩后放入./dist/img文件夹下（暂时没找到好的jpg的压缩模块，所以现在压缩只针对png）*/

2.开发约定
html文件统一放在linkArt（根目录）下，css文件放在根目录下的css文件夹，js文件放在js文件夹，
css文件选择器命名统一用 "-"隔开（与bootstrap一样）js变量命名统一用驼峰命名法

3.项目开发环境搭建：
（1）下载nodejs（5.0以上）并安装
（2）在linkArt目录下运行npm install，安装项目依赖模块

4.自动化脚本命令：
在根目录下运行cmd（windows）
（1）gulp dev     打包压缩css和js文件，具体在html文件里怎么操作，参考template.html文件 和 https://www.npmjs.com/package/gulp-useref
（2）gulp img      压缩图片，注意新图片如果执行这条命令的话，在dist里的html文件是加载不到相应的img的，因为相对路径变了
（3）gulp         上面两个命令一起执行
