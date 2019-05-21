export function post (url, body) {
	return fetch(url, {
			headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
			},
					method: "POST",
					body: JSON.stringify(body)
			});
}

export function get (url) {
	return fetch(url);
}