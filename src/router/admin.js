export default [{
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName:"login_home_welcome" */ '@/views/login')
    },
    {
        path: '/home',
        name: 'home',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"login_home_welcome" */ '@/views/home/index'),
        redirect: '/home/welcome',
        children: [{
            path: '/home/welcome',
            // component: () => import('@/views/welcome'),
            component: () => import( /* webpackChunkName:"login_home_welcome" */ '@/views/welcome'),

        }]
    },
    {
        path: '/home/users',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"user" */ '@/views/home/index'),

        children: [{
            path: '/',
            component: () => import('@/views/users'),
            component: () => import( /* webpackChunkName:"user" */ '@/views/users'),

            meta: {
                bread: ['用户管理', '用户列表']
            }
        }]
    },
    {
        path: '/home/roles',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"role_right" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/power/roles'),
            component: () => import( /* webpackChunkName:"role_right" */ '@/views/power/roles'),

            meta: {
                bread: ['权限管理', '角色列表']
            }
        }]
    },
    {
        path: '/home/rights',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"role_right" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/power/rights'),
            component: () => import( /* webpackChunkName:"role_right" */ '@/views/power/rights'),

            meta: {
                bread: ['权限管理', '权限列表']
            }
        }]
    },
    {
        path: '/home/goods',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/goods/goods'),
            component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/goods/goods'),

            meta: {
                bread: ['商品管理', '商品列表']
            }
        }]
    },
    {
        path: '/home/addgoods',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/goods/addgoods'),
            component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/goods/addgoods'),

        }]
    },
    {
        path: '/home/params',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/goods/params'),
            component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/goods/params'),

            meta: {
                bread: ['商品管理', '分类参数']
            }
        }]
    },
    {
        path: '/home/categories',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/goods/cate'),
            component: () => import( /* webpackChunkName:"good_params_cate" */ '@/views/goods/cate'),

            meta: {
                bread: ['商品管理', '商品分类']
            }
        }]
    },
    {
        path: '/home/orders',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"orders" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/order/index'),
            component: () => import( /* webpackChunkName:"orders" */ '@/views/order/index'),

            meta: {
                bread: ['订单管理', '订单列表']
            }
        }]
    },

    {
        path: '/home/reports',
        // component: () => import('@/views/home/index'),
        component: () => import( /* webpackChunkName:"report" */ '@/views/home/index'),

        children: [{
            path: '/',
            // component: () => import('@/views/reports/index'),
            component: () => import( /* webpackChunkName:"report" */ '@/views/reports/index'),

            meta: {
                bread: ['数据统计', '数据报表']
            }
        }]
    }

]