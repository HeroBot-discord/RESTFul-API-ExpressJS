/** @typedef {Object} Handlers
 * @prop {import("./httpErrorsHandler")} errorsHandler Our custom http errors handler
 */

module.exports = {
	errorsHandler: require("./httpErrorsHandler"),
};
