import router from './router'
import Performance from '@/tools/performance'
import { usePermissionStore } from "@/store/permission"
import { useUserStore } from "@/store/user"

export function usePermission() {
    let end = null
    const whiteList = ['/login'] // 不重定向白名单
    router.beforeEach(async (to, from, next) => {
        const { GenerateRoutes, routers } = usePermissionStore()
        const { GetUserInfo, token, roles, login, logOut } = useUserStore()
        console.log("token",token)
        if(!token){
            // 靳碧涛 配置登录账号密码
            login({username:"admin",password:"123456"}).then(() => {
                router.push({ path: "/" }).catch((err) => { });
            })
        }
        end = Performance.startExecute(`${from.path} => ${to.path} 路由耗时`) /// 路由性能监控
        if (token) {
            console.log("token1",token)
            if (to.path === '/login') {
                next({ path: '/' })
            } else {
                console.log("roles",roles)
                const hasRoles = roles && roles.length > 0;
                if (hasRoles && routers && routers.length > 0) {
                    next()
                } else {
                    try {
                        const roles = await GetUserInfo()
                        console.log("roles",roles)
                        const accessRoutes = await GenerateRoutes(roles)
                        accessRoutes.forEach(item => {
                            router.addRoute(item)
                        })
                        next({ ...to, replace: true })
                    } catch (error) {
                        await logOut()
                        console.error(error)
                        next('/login')
                    }
                }

            }
        } else {
            if (whiteList.includes(to.path)) {
                next()
            } else {
                next('/login')
            }
        }

        setTimeout(() => {
            end()
        }, 0)
    })

    router.afterEach(() => { })
}
