const Riven = require('..')
const rvn = new Riven()
const { Ø } = rvn.bind()

class BangNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.bang
	}
}

class PrintNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.render
	}

	receive(q) {
		console.log(q)
	}
}

Ø("bang").create({x:2,y:4},BangNode)
Ø("print").create({x:20,y:4},PrintNode)

Ø("bang").connect("print")
Ø("bang").send('This is a test.')

