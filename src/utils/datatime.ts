/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/*
 * @Author: Pacific_D
 * @Date: 2022-03-22 23:03:27
 * @LastEditTime: 2022-03-22 23:04:45
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \class-schedule\src\utils\datatime.ts
 */
const datetime = (): string => {
  let date = new Date(),
    year = date.getFullYear(),
    month: number | string = date.getMonth() + 1,
    day: number | string = date.getDate(),
    Hours = date.getHours(),
    Minutes = date.getMinutes(),
    Seconds = date.getSeconds()

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day;
  }
  let s_createtime =
    year +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    Hours +
    ':' +
    Minutes +
    ':' +
    Seconds

  return s_createtime
};

export default datetime
