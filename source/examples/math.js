const Riven = require('..')

const rvn = new Riven()
const { Ø } = rvn.bind()

Ø('add').create({x: 0, y: 0}, AddNode)

class AddNode extends Riven.Node {
	constructor(id, rect) {
		super(id, rect)
		this.glyph = Riven.NODE_GLYPHS.equal
		this.label = 'add'
	}

	add() {
		let sum = 0
		let values = this.request()

		for (let value in values) {
			sum += value
		}

		return sum
	}

	receive(q) {
		this.send(this.add())
	}

	answer() {
		return this.add()
	}
}