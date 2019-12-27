const express = require("express");

/**
 * @class Server
 */
class Server {
	constructor() {
		this.app = express();
		// Here we will have all our configuration, don't forget to rename config file from config.example to config
		this.config = require("../config");
		this.handlers = require("./handlers");

		this.serverSetup();
	}

	/**
	 * @description This method will setup all that we need for the server to work fine
	 * @returns {void}
	 */
	serverSetup() {
		/* Set the ip-address of your trusted reverse proxy server such as
		haproxy or Apache mod proxy or nginx configured as proxy or others.
		The proxy server should insert the ip address of the remote client
		through request header "X-Forwarded-For" as
		"X-Forwarded-For: some.client.ip.address"
		Insertion of the forward header is an option on most proxy software*/
		this.app
			.set("trust proxy");

		this.app
			// A built-in middleware to parse incoming requests with JSON payloads
			.use(express.json())
			// A built-in middleware to parse incoming requests with urlencoded payloads
			.use(express.urlencoded({ extended: false }))
			// A middleware to log HTTP requests, learn more about all available options of the module by going on the module NPM page https://www.npmjs.com/package/morgan
			.use(require("morgan")("dev"));

		// This method will load all our routes
		this.routesLoader();
		// A middleware that will attempt to compress response bodies for all request that traverse through it (https://www.npmjs.com/package/compression)
		this.app.use(require("compression")());

		// Here are a some little errors handlers
		this.app.use((req, res) => {
			res.status(404).json({
				error: { status: 404, message: this.handlers.errorsHandler.messages[404] },
			});
		});

		this.app.use((err, req, res, next) => {
			res.status(err.status || 500).json({
				error: { status: err.status || 500, message: this.handlers.errorsHandler.messages[err.status || 500] },
			});
		});

		// And finally this method will launch the API server.
		this.listen();
	}

	/**
	 * @description Load all necessary routes
	 * @returns {void}
	 */
	routesLoader() {
		// Don't forget to add your routes here, this is required.
		// If you don't do it, the server will respond a 404
		this.app.use(new (require("./routes/api"))(this));
	}

	/**
	 * @description Launch the server on the specifed port
	 * @returns {undefined}
	 */
	listen() {
		return this.app.listen(process.env.PORT || this.config.website.port || 3000, (err) => {
			if (err) return console.error(err);
			console.log(`[Server] Running on port :::${process.env.PORT || this.config.website.port || 3000}`);
		});
	}
}

module.exports = new Server();
