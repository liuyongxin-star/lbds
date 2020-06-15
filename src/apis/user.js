import axios from "@/plugins/axios.js";


export function login(data) {
	return axios({
		url: '/users/login',
		method: 'post',
		data: data
	})
}
export function list(data) {
	return axios({
		url: '/users/',
		method: 'get',
		data: data
	})
}
export function create(data) {
	return axios({
		url: '/users/create',
		method: 'post',
		data: data
	})
}
export function userDelete(data) {
	return axios({
		url: '/users/delete',
		method: 'post',
		data: data
	})
}