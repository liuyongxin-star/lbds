// import parseTime, formatTime and set to filter
import { USER_STATUS } from "./status"

export function userStatus(status) { //转换用户状态
  return USER_STATUS[status]
}
