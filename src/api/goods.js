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
// 获取所有商品分类数据
export function cascaderList(){
    return request({
        url:`categories`,
        method:'GET',
    })
}
// 获取商品参数列表
export function goodsCan(id,sel){
    return request({
        url:`categories/${id}/attributes?sel=${sel}`,
        method:'GET',
    })
}
// 添加动态参数或静态属性接口
export function addAttr(id,attr_name,attr_sel,attr_vals){
    return request({
        url:`categories/${id}/attributes`,
        method:'POST',
        data:{
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}

// 修改动态参数或静态属性接口
export function editData(id,attrId,attr_name,attr_sel,attr_vals){
    return request({
        url:`categories/${id}/attributes/${attrId}`,
        method:'PUT',
        data:{attr_name,attr_sel,attr_vals}
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

// 动态参数静态属性添加子级接口
export function addChild(id,attrId,attr_name,attr_sel,attr_vals){
    return request({
        url:`categories/${id}/attributes/${attrId}`,
        method:'PUT',
        data:{
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}

// 添加商品接口
export function addGoods(data){
    return request({
        url:'goods',
        method:'POST',
        data:data
    })
}