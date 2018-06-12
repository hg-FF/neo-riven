const Riven = require('..')
const ConsoleNode = require('../nodes/console')
const rvn = new Riven()
const { Ø } = rvn.bind()

class BangNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.bang
	}
}

Ø("bang").create({x:2,y:4},BangNode)
Ø("print").create({x:20,y:4},ConsoleNode)

Ø("bang").connect("print")
Ø("bang").send('NēoRiven.')

