# NēoRiven
A Node friendly re-implementation of [Riven](https://github.com/XXIIVV/Riven).

## Installation
Install it by running  
```shell
$ yarn add neo-riven
# or
$ npm i -s neo-riven
```

## Usage.
The selector must be bound to the Riven instance.
```javascript
import Riven from 'neo-riven'
const rvn = new Riven()

const { Ø } = rvn.bind() // Now the selector is bound to the Riven instance.
```

Nodes are defined as classes:
```js
class ConsoleNode extends Riven.Node {
	constructor(ctx, id, rect) {
		super(ctx, id, rect)
		this.glyph = Riven.NODE_GLYPHS.render
	}

	receive(q) {
		console.log(q)
	}
}
```

