import axios from "@/plugins/axios.js";

export  function user(){
	return	axios({
		url: '/v1/users/create',  
        method: 'get'
	})
}
export  function login(data){
	return	axios({
		url: '/v1/users/login',  
		method: 'post',
		data: data
	})
}
