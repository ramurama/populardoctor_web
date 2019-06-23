export function post (url, body) {
	return fetch(url, {
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
			},
					method: "POST",
					body: JSON.stringify(body)
			});
}
export function put (url, body) {
	return fetch(url, {
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
			},
					method: "PUT",
					body: JSON.stringify(body)
			});
}
export function get (url) {
	return fetch(url);
}
export function del (url, body) {
	return fetch(url, {
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
			},
					method: "DELETE",
					body: JSON.stringify(body)
			});
}