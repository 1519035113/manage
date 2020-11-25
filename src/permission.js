import router from '@/router'
import store from '@/store'

// router.beforeEach( (to, from, next) => {
//     const token = store.getters.token
//     if(!token){//没有token
//         if(to.path != '/login'){
//             next('/login')
//         }else{
//             next()
//         }
//     }else{//有token
//         if(to.path == '/login'){
//             next('/main')
//         }else{
//             next()
//         }
//     }
// })