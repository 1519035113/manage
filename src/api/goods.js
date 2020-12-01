import request from '@/utils/request'

// 获取商品列表接口
export function getGoodsList(query,pagenum,pagesize){
    return request({
        url:`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`,
        method:'GET'
    })
}

// 删除商品列表接口
export function removeGoodsList(id){
    return request({
        url:`goods/${id}`,
        method:'DELETE'
    })
}

// 获取商品分类列表
export function getCateList(type,pagenum,pagesize){
    return request({
        url:`categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`,
        method:'GET',
    })
}

// 删除商品分类列表
export function removeCateList(id){
    return request({
        url:`categories/${id}`,
        method:'DELETE',
    })
}

// 添加分类列表接口
export function addCateList(data){
    return request({
        url:'categories',
        method:'POST',
        data
    })
}

// 修改分类列表接口
export function editCateList(name,id){
    return request({
        url:`categories/${id}`,
        method:'PUT',
        data:{cat_name:name}
    })
}

export function cascaderList(){
    return request({
        url:`categories`,
        method:'GET',
    })
}

export function goodsCan(id){
    return request({
        url:`categories/${id}/attributes?sel=many`,
        method:'GET',
    })
}

// 动态参数删除子级接口
export function removeAttr(id1,id2,attr_name,attr_sel,attr_vals){
    return request({
        url:`categories/${id1}/attributes/${id2}`,
        method:'PUT',
        data:{
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}
