import { v4 as uuidv4 } from 'uuid'
// 生成一个随机字符串，且每次执行不能发生改变，游客身份持久储存
export const getUUID = () => {
  // 先从本地存储获取uuid（看一下本地存储是否保存了）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}