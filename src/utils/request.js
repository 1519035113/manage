/**
 * axios请求插件
 * @author flytoyou
 */

import axios from 'axios';
import store from '../store/index'
import { Loading } from 'element-ui';

// 创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,  //请求的url由工具配置
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// 创建loading加载
const loading ={
  loadingService:null,
  // 开启loading加载
  open(){
    if(this.loadingService==null){
      this.loadingService =  Loading.service({
        target:".el-main",
        text:"加载中...",
        background:"rgba(0,0,0,.5)"
      })
    }
  },
  // 关闭loading加载
  close(){
    if(this.loadingService != null){
      this.loadingService.close()
    }
    this.loadingService=null
  }
}

/**
 * request过滤器
 * 此处为发送请求前的过滤操作
 */
request.interceptors.request.use((config) => {

//   loading.open()
  // 开启loading

  // const token = store.getters.token ? store.getters.token : null
  // config.headers[Authorization] = token

  return config;
}, (err) => {

//   loading.close()
  // 关闭loading

  // 将错误抛出，供程序处理
  return Promise.reject(err);
});

/**
 * response过滤器
 * 此处为请求返回时的过滤操作
 */
request.interceptors.response.use((response) => {
//   loading.close()
  // 关闭loading
  return response.data;
}, (err) => {
//   loading.close()
  // 关闭loading

  // 将错误抛出，供程序处理
  return Promise.reject(err);
});

// 返回axios实例
export default request;