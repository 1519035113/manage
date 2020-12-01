import request from '../utils/request'
// 引入封装的request文件

// 获取角色列表接口
export function getRoles(){
    return request({
        url:'roles',
        methods:'GET'
    })
}

// 添加角色接口
export function addRoles(form){
    return request({
        url:'roles',
        method:'POST',
        data:form
    })
}

// 修改角色接口
export function editRoles(name,desc,id){
    return request({
        url:`roles/${id}`,
        method:'PUT',
        data:{
            roleName:name,
            roleDesc:desc
        }
    })
}

// 删除角色接口
export function removeRoles(id){
    return request({
        url:`roles/${id}`,
        method:'DELETE',
    })
}

export function getRight(){
    return request({
        url:'rights/list',
        method:'GET',
    })
}
// 删除权限
export function removeRolesPower(roles,rights){
    return request({
        url:`roles/${roles.id}/rights/${rights}`,
        method:'DELETE'
    })
}
// 获取权限数据
export function getShuData(){
    return request({
        url:'rights/tree',
        method:'GET'
    })
}
// 分配权限接口
export function getFenData(role,data){
    return request({
        url:`roles/${role}/rights`,
        method:'POST',
        data:{rids:data}
    })
}