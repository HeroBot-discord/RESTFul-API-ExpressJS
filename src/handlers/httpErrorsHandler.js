
module.exports.messages = require('http').STATUS_CODES
console.log(module.messages)
module.exports.response = (res, status, data) => {
	const error = status !== 200;
	return res.status(status).json({
		data: (data ? data : null),
		response: (messages[status] ? messages[status] : "No message found."),
		error,
	});
};
