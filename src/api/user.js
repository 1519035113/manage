import request from '@/utils/request'

export function getRole() {
    return request({
        url: 'roles',
        method: 'GET'
    })
}

// 分配用户角色
export function getAllotRole(id, rid) {
    return request({
        url: `users/${id}/role`,
        method: 'PUT',
        data: {
            rid
        }
    })
}