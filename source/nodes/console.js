const Riven = require('..')

class ConsoleNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.render
	}

	receive(q) {
		console.log(q)
	}
}

module.exports = ConsoleNode