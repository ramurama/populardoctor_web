import { post } from './fetch';
import Endpoint from './endpoints';

export function login(saveData){
	return post(Endpoint.login, saveData);
}


