export default [{
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        redirect: '/home/welcome',
        children: [{
            path: '/home/welcome',
            component: () => import('@/views/welcome'),
        }]
    },
    {
        path: '/home/users',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/users'),
            meta:{
                bread:['用户管理','用户列表']
            }
        }]
    },
    {
        path: '/home/roles',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/power/roles'),
            meta:{
                bread:['权限管理','角色列表']
            }
        }]
    },
    {
        path: '/home/rights',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/power/rights'),
            meta:{
                bread:['权限管理','权限列表']
            }
        }]
    }
]