const Riven = require('..')
const S = require('s-js')

class RivenS {
	static get pluginName() {
		return 'store'
	}

	constructor(ctx) {
		this.ctx = ctx
		ctx.data = {}
	}

	create(key, value) {
		S.root(() => {
			this.ctx.data[key] = S.data(value)
		})
	}

	store(key, value) {
		S.root(() => {
			this.ctx.data[key] = value
		})
	}

	on(val, callback) {
		S.on(val, callback)
	}

	reactor(callback) {
		return S(callback)
	}

	update(key, value) {
		this.ctx.data[key](value)
	}

	freeze(callback) {
		S.freeze(callback)
	}
}

module.exports = RivenS