# NēoRiven
A Node friendly re-implementation of [Riven](https://github.com/XXIIVV/Riven).

## Usage.
This implementation is *almost* cross-compatible with the original Riven implementation. However, the Node implementation must be done with ES5 classes.

```javascript
import Riven from 'neo-riven'
const rvn = new Riven()
const { Ø } = rvn.bind()

Ø("bang").create({x:2,y:4},BangNode)
Ø("print").create({x:20,y:4},PrintNode)

Ø("bang").connect("print")
Ø("bang").bang()

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
```