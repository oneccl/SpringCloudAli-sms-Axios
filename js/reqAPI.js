/*##### 前台统一请求API:后台网关 #####*/

// 创建Axios实例
const axiosObj = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 3000
})

// Promise: 是一个容器，用来保存某个未来才会结束的事件的结果(异步请求事件)，为了解决回调问题
/*
1.Promise：提供统一的API，各种异步请求操作都可以用同样的方法处理
2.参数resolve和reject：将Promise函数中要传递的值，作为参数传给后面的then和catch函数
3.过程：resolve(par1)把par1传给Promise，然后再由Promise把par1传给then(function(par1){})
reject(par2)把par2给Promise，然后再由Promise把par2传给catch(function(par2){})
4.resolve(res)：事件已完成； reject()：事件已失败
*/

// get请求
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosObj.get(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                // 获取后台网关自定义限流响应message
                if (err.response.data.code === 504){
                    alert(err.response.data.message);
                }else {
                    // sentinel限流message
                    alert("人气太旺啦!请稍后重试!");
                }
                reject(err);
            })

    })
}

// post请求
export const post = (url, params) => {
    return new Promise((resolve, reject) => {
        axiosObj.post(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                // 获取后台网关自定义限流响应message
                if (err.response.data.code === 504){
                    alert(err.response.data.message);
                }else {
                    // sentinel限流message
                    alert("人气太旺啦!请稍后重试!");
                }
                reject(err);
            })
    })
}




