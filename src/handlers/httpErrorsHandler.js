// We load the status codes from the http module.
module.exports.messages = require('http').STATUS_CODES

module.exports.response = (res, status, data) => {
	const error = status !== 200;
	return res.status(status).json({
		data: (data ? data : null),
		response: (messages[status] ? messages[status] : "No message found."),
		error,
	});
};
