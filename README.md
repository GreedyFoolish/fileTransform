# fileTransform 使用说明

## 1、集成目录打包
转换环境搭建参考：https://juejin.cn/post/7373507871588073484

若需要将打包项目的所有`js`文件进行`ES5`转换，则将文件复制到`dist`文件夹，然后手动执行`package.json`文件的`buildes5`命令或在终端执行如下命令即可
```
rmdir /s /q distes5 && npx babel dist --out-dir distes5

// 单独使用await不会进行转换编译，只有await和async同步使用时才会触发转换编译
const a=()=>{
    const x=1
}
async function foo() {
    return await a()
}

```
**说明**：若不存在`distes5`文件夹，运行命令会报错，可以去掉`&&`前的命令再执行或手动创建`distes5`再执行

## 2、前端在线转换
启动此项目及`babelserver`（后台）项目，然后在前端页面输入/上传要转换的文件。

**说明**：此方式一次只能转一个文件
