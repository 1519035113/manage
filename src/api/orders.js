import request from '@/utils/request'

export function getOrderList(query,pagenum,pagesize){
    return request({
        url:`orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`,
        method:'GET'
    })
}

// 物流信息接口
export function getOutline(id=804909574412544580){
    return request({
        url:`kuaidi/${id}`,
        method:'GET'
    })
}