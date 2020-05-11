# UmiJS 的一些使用技巧
最近在做一个基于Umi框架的运营平台系统，该项目主要以 Umi(2.x.x) + dva 为底层框架，以Ant Design Pro为 UI 组件库，包含完整的前端工程化实践。
## umi with dva
```shell
npm install --save umi-plugin-react // 使用此命令添加
```
## umi与dva 结合的好处
* 按目录约定注册 model，无需手动 app.model
* 文件名即 namespace，可以省去 model 导出的 namespace key
* 无需手写 router.js，交给 umi 处理，支持 model 和 component 的按需加载
* 内置 query-string 处理，无需再手动解码和编码
* 内置 dva-loading 和 dva-immer，其中 dva-immer 需通过配置开启
* 开箱即用，无需安装额外依赖，比如 dva、dva-loading、dva-immer、path-to-regexp、object-assign、react、react-dom 等
## dva中loading 的使用
由于umi在下载dva时会内置下在dva-loading 插件，不需要你再额外的下载

