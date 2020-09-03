/**
 * @param url
 * @param method
 * @param data
 * @returns URL response
 */
function sendServerRequest(url,method,data) {
	return new Promise(function ( resolve ) {
		resolve($.ajax({
			url,
			method: method || 'GET',
			data,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			crossDomain:true,
			success: function ( data ) {
				return data
			},
			error: function ( err ) {
				console.log(err);
				return null;
			}
		}));
	})
}
