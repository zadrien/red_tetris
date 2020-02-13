const params = {
	server:{
		host: '0.0.0.0'
		, port: 8080
		, get url() { return `http://${this.host}:${this.port}`}
		, db: "mongodb://192.168.99.101:27017/rooms"
	},
}

module.exports = params

