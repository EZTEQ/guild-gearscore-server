/* huge module for request logging */
module.exports = (req, res, next) => {
	console.log(new Date().toLocaleString(), req.method, req.path);
	next();
}