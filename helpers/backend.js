import {del, get, patch, post} from "./api";

export const postLogin = data => post('/user/login', data)
export const fetchUserProfile = data => get('/user/profile', data)

export const patchUserProfile = data => patch('/user/profile', data)

export const patchPassword = data => patch('/user/password', data)

export const postPasswordReset = data => post('/user/password/reset', data)
export const postPasswordToken = data => post('/user/password/token', data)

export const fetchUsers = data => get('/user/list', data)
export const fetchUser = data => get('/user/:uid', data)
export const postUser = data => post('/user', data)
export const patchUser = data => patch('/user/:uid', data)
export const delUser = data => del('/user/:uid', data)

export const fetchSales = data => get('/sale/list', data)
export const fetchSaleElements = data => get('/sale/elements', data)
export const fetchSale = data => get('/sale/:uid', data)
export const postSale = data => post('/sale', data)
export const patchSale = data => patch('/sale/:uid', data)
export const delSale = data => del('/sale/:uid', data)


export const fetchBoxes = data => get('/box/list', data)
export const fetchBox = data => get('/box/:uid', data)
export const postBox = data => post('/box', data)
export const patchBox = data => patch('/box/:uid', data)


export const fetchSalesReport = data => get('/report/sales', data)