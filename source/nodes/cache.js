const Riven = require('..')

class CacheNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.cache
		this.cache = null
	}

	receive(q) {
		if (this.cache) { return cache }
		this.cache = this.request()
		return this.cache
	}
}

module.exports = CacheNode