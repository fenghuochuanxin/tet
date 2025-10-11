import type { IUserInfoRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserInfo,
} from '@/api/login'

// 初始化状态
const userInfoState: IUserInfoRes = {
  userId: -1,
  username: '',
  nickname: '',
  avatar: '/static/images/default-avatar.png',
  实名认证状态: {}, // 添加实名认证状态字段
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoRes>({ ...userInfoState })
    // 设置用户信息
    const setUserInfo = (val: IUserInfoRes) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      }
      // 确保实名认证状态存在
      if (!val['实名认证状态']) {
        val['实名认证状态'] = {}
      }
      userInfo.value = val
    }
    const setUserAvatar = (avatar: string) => {
      userInfo.value.avatar = avatar
      console.log('设置用户头像', avatar)
      console.log('userInfo', userInfo.value)
    }
    // 删除用户信息
    const clearUserInfo = () => {
      userInfo.value = { ...userInfoState }
      uni.removeStorageSync('user')
    }

    // 检查某个功能是否已实名认证
    const checkAuthStatus = (featureType: string): boolean => {
      return userInfo.value['实名认证状态']?.[featureType] === true
    }

    // 设置某个功能的实名认证状态
    const setAuthStatus = (featureType: string, status: boolean = true) => {
      if (!userInfo.value['实名认证状态']) {
        userInfo.value['实名认证状态'] = {}
      }
      userInfo.value['实名认证状态'][featureType] = status
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
      const res = await getUserInfo()
      setUserInfo(res)
      return res
    }

    return {
      userInfo,
      clearUserInfo,
      fetchUserInfo,
      setUserInfo,
      setUserAvatar,
      checkAuthStatus,
      setAuthStatus,
    }
  },
  {
    persist: true,
  },
)
