import type { PageMetaDatum, SubPackages } from '@uni-helper/vite-plugin-uni-pages'
import { isMpWeixin } from '@uni-helper/uni-env'
import { pages, subPackages } from '@/pages.json'
import { useUserStore } from '@/store/user'

export type PageInstance = Page.PageInstance<AnyObject, object> & { $page: Page.PageInstance<AnyObject, object> & { fullPath: string } }

export function getLastPage() {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  // const lastPage = getCurrentPages().at(-1)
  // 上面那个在低版本安卓中打包会报错，所以改用下面这个【虽然我加了 src/interceptions/prototype.ts，但依然报错】
  const pages = getCurrentPages()
  return pages[pages.length - 1] as PageInstance
}

/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 '/pages/login/login'
 * redirectPath 如 '/pages/demo/base/route-interceptor'
 */
export function currRoute() {
  const lastPage = getLastPage() as PageInstance
  if (!lastPage) {
    return {
      path: '',
      query: {},
    }
  }
  const currRoute = lastPage.$page
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute
  // console.log(fullPath)
  // eg: /pages/login/login?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/login?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return parseUrlToObj(fullPath)
}

export function ensureDecodeURIComponent(url: string) {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/login?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/login, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export function parseUrlToObj(url: string) {
  const [path, queryStr] = url.split('?')
  // console.log(path, queryStr)

  if (!queryStr) {
    return {
      path,
      query: {},
    }
  }
  const query: Record<string, string> = {}
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 这里设计得通用一点，可以传递 key 作为判断依据，默认是 excludeLoginPath, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的 pages，如果传递了 key, 则表示通过 key 过滤
 */
export function getAllPages(key?: string) {
  // 这里处理主包
  const mainPages = (pages as PageMetaDatum[])
    .filter(page => !key || page[key])
    .map(page => ({
      ...page,
      path: `/${page.path}`,
    }))

  // 这里处理分包
  const subPages: PageMetaDatum[] = []
  ;(subPackages as SubPackages).forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter(page => !key || page[key])
      .forEach((page) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]
  // console.log(`getAllPages by ${key} result: `, result)
  return result
}

export function getCurrentPageI18nKey() {
  const routeObj = currRoute()
  const currPage = (pages as PageMetaDatum[]).find(page => `/${page.path}` === routeObj.path)
  if (!currPage) {
    console.warn('路由不正确')
    return ''
  }
  console.log(currPage)
  console.log(currPage.style.navigationBarTitleText)
  return currPage.style?.navigationBarTitleText || ''
}

/**
 * 根据微信小程序当前环境，判断应该获取的 baseUrl
 */
export function getEnvBaseUrl() {
  // 请求基准地址
  let baseUrl = import.meta.env.VITE_SERVER_BASEURL

  // # 有些同学可能需要在微信小程序里面根据 develop、trial、release 分别设置上传地址，参考代码如下。
  const VITE_SERVER_BASEURL__WEIXIN_DEVELOP = 'https://ukw0y1.laf.run'
  const VITE_SERVER_BASEURL__WEIXIN_TRIAL = 'https://ukw0y1.laf.run'
  const VITE_SERVER_BASEURL__WEIXIN_RELEASE = 'https://ukw0y1.laf.run'

  // 微信小程序端环境区分
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion },
    } = uni.getAccountInfoSync()

    switch (envVersion) {
      case 'develop':
        baseUrl = VITE_SERVER_BASEURL__WEIXIN_DEVELOP || baseUrl
        break
      case 'trial':
        baseUrl = VITE_SERVER_BASEURL__WEIXIN_TRIAL || baseUrl
        break
      case 'release':
        baseUrl = VITE_SERVER_BASEURL__WEIXIN_RELEASE || baseUrl
        break
    }
  }

  return baseUrl
}

/**
 * 是否是双token模式
 */
export const isDoubleTokenMode = import.meta.env.VITE_AUTH_MODE === 'double'

/**
 * 首页路径，通过 page.json 里面的 type 为 home 的页面获取，如果没有，则默认是第一个页面
 * 通常为 /pages/index/index
 */
export const HOME_PAGE = `/${(pages as PageMetaDatum[]).find(page => page.type === 'home')?.path || (pages as PageMetaDatum[])[0].path}`

/**
 * 实名认证页面路径
 */
export const AUTH_PAGE = '/pages-sub/auth/index'

/**
 * 功能类型枚举
 */
export enum FeatureType {
  纠纷调解 = 'dispute-mediation',
  仲裁办理 = 'arbitration',
  法律咨询 = 'legal-consultation',
  案件代理 = 'case-representation',
}

/**
 * 检查用户是否已经完成了实名认证（任意一个功能）
 * @returns 是否已实名认证
 */
export function isUserAuthenticated(): boolean {
  const userStore = useUserStore()
  // 检查用户信息中是否有实名认证状态，并且至少有一个功能已认证
  const authStatus = userStore.userInfo['实名认证状态'] || {}
  return Object.values(authStatus).includes(true)
}

/**
 * 检查用户是否已经完成了某个功能的实名认证
 * @param featureType 功能类型
 * @returns 是否已认证该功能
 */
export function isFeatureAuthenticated(featureType: string): boolean {
  const userStore = useUserStore()
  return userStore.checkAuthStatus(featureType)
}

/**
 * 跳转到实名认证页面
 * @param featureType 功能类型
 */
export function navigateToAuth(featureType: string): void {
  uni.navigateTo({
    url: `${AUTH_PAGE}?featureType=${featureType}`,
  })
}

/**
 * 处理需要实名认证的功能
 * 如果用户未认证，则跳转到认证页面；如果已认证，则执行回调函数
 * @param featureType 功能类型
 * @param callback 已认证时执行的回调函数
 */
export function handleAuthRequiredFeature(featureType: string, callback?: () => void): void {
  if (isFeatureAuthenticated(featureType)) {
    // 如果已经认证，则执行回调函数
    if (callback) {
      callback()
    }
  }
  else {
    // 如果未认证，则跳转到认证页面
    navigateToAuth(featureType)
  }
}
