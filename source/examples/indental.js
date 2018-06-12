const Riven = require('..')
const IndentalNode = require('../nodes/indental')
const ConsoleNode = require('../nodes/console')
const rvn = new Riven()
const { Ø } = rvn.bind()

class BangNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.bang
	}
}

class DatabaseNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.builder
		this.cache = null
	}

	receive(q) {
    this.cache = this.cache ? this.cache : this.request()
		this.send(this.request(this.cache))	
	}
}

rvn.database = {}
rvn.database.table = `
tree
  branch1
    leaf
      flower
        bug
  branch2
    apple
      worm
			caterpillar
`

Ø("bang").create({x:2,y:4},BangNode)
Ø("console").create({x:20,y:4},ConsoleNode)
Ø("database").create({x:4,y:2},DatabaseNode)
Ø("table").create({x:2,y:8},IndentalNode)
Ø("bang").connect("database")
Ø("database").syphon("table")
Ø("database").connect("console")
Ø("bang").bang()