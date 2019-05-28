import { post, get } from './fetch';
import Endpoint from './endpoints';

export function login(saveData){
	return post(Endpoint.login, saveData);
}
export  function loginSatus () {
	return get(Endpoint.loginStatus);
};
export function logout(){
	return get(Endpoint.logout);
}