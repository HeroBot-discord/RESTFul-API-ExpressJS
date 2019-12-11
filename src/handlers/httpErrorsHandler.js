module.exports.messages = {
	"200": "OK",
	"302": "Found",
	"303": "See Other",
	"304": "Not Modified",
	"307": "Temporary Redirect",
	"308": "Resume Incomplete",
	"400": "Bad Request",
	"401": "Unauthorized",
	"403": "Forbidden",
	"404": "Not Found",
	"405": "Method Not Allowed",
	"409": "Conflict",
	"410": "Gone",
	"411": "Length Required",
	"412": "Precondition Failed",
	"413": "Payload Too Large",
	"416": "Requested Range Not Satisfiable",
	"429": "Too Many Requests",
	"500": "Internal Server Error",
	"502": "Bad Gateway",
	"501": "Not Implemented",
	"503": "Service Unavailable",
};

module.exports.response = (res, status, data) => {
	const error = status !== 200;

	return res.status(status).json({
		data: (data ? data : null),
		response: (messages[status] ? messages[status] : "No message found."),
		error,
	});
};
