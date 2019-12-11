const { Router } = require("express");

class API extends Router {
	/**
	 * @param server - Our server
	 */
	constructor(server) {
		super();

		console.log("[API] - Successfuly loaded.");

		this
			.get(["/", "/v1"], (req, res) => {
				res.status(200).json({ message: "You found the API!" });
			});
	}
}

module.exports = API;
