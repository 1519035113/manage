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
    },
    {
        path: '/home/goods',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/goods/goods'),
            meta:{
                bread:['商品管理','商品列表']
            }
        }]
    },
    {
        path: '/home/addgoods',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/goods/addgoods'),
        }]
    },
    {
        path: '/home/params',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/goods/params'),
            meta:{
                bread:['商品管理','分类参数']
            }
        }]
    },
    {
        path: '/home/categories',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/goods/cate'),
            meta:{
                bread:['商品管理','商品分类']
            }
        }]
    },
    {
        path: '/home/orders',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/order/index'),
            meta:{
                bread:['订单管理','订单列表']
            }
        }]
    },
    
    {
        path: '/home/reports',
        component: () => import('@/views/home/index'),
        children: [{
            path: '/',
            component: () => import('@/views/reports/index'),
            meta:{
                bread:['数据统计','数据报表']
            }
        }]
    }

]