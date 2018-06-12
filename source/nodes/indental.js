const Indental = require('indental')
const Riven = require('..')

class IndentalNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.database = new Indental(this.ctx.database[this.id]).parse()
		this.glyph = Riven.NODE_GLYPHS.database
	}

	answer(q) {
		return this.database
	}
}

module.exports = IndentalNode