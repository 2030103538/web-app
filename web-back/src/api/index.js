import axios from 'axios'


export  default function ajax(url = '', params = {}, type = 'GET') {
    // 0. 变量
     let promise;

    // 1. 返回promise
    return new Promise((resolve, reject)=>{
         // 1.1 判断请求的类型
        if(type.toUpperCase() === 'GET'){ // get请求
            promise = axios({
                url,
                params
            })
        }else if(type.toUpperCase() === 'POST'){ // post请求
            promise = axios({
                method: 'post',
                url,
                data: params
            })
        }

        //  1.2 处理结果并返回
        promise.then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    });
}