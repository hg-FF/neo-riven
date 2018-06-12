/* NēoRiven
	 - Reactive flow-based programming framework inspired and kind of based by Riven
	 - (^^_)
 */

const S = require('s-js')
const { curryN } = require('ramda')

const bØ = curryN(2, (ctx, selector) => {
	let id = selector.toLowerCase()
	let network = ctx.network

  if(id.indexOf(" ") > -1){
    var nodeID = id.split(" ")[0];
    var portID = id.split(" ")[1];
    return network[nodeID] && network[nodeID].ports[portID] ? network[nodeID].ports[portID] : null;
  }
  else if(network[id]){
    return network[id];
  }
  else{
    return new RNode(ctx, id);
  }
})

class Riven {
	static get PORT_TYPES() {
		return {
			default: "default",
			input: "input",
			output: "output",
			request: "request",
			answer: "answer"
		}
	}

	static get ROUTE_TYPES() { 
		return {
			default: "default",
			request: "request"
		}
	}

	static get NODE_GLYPHS() {
		return {
			default: "M150,60 L150,60 L60,150 L150,240 L240,150 Z",
			router:"M60,120 L60,120 L150,120 L240,60 M60,150 L60,150 L240,150 M60,180 L60,180 L150,180 L240,240",
			parser:"M60,60 L60,60 L240,60 M120,120 A30,30 0 0,1 150,150 M150,150 A30,30 0 0,0 180,180 M180,180 L180,180 L240,180 M120,120 L120,120 L60,120 M60,240 L60,240 L240,240 M240,120 L240,120 L180,120 M60,180 L60,180 L120,180",
			entry:"M60,150 L60,150 L240,150 L240,150 L150,240 M150,60 L150,60 L240,150",
			bang:"M150,60 L150,60 L150,180 M150,240 L150,240 L150,240",
			value:"M60,60 L60,60 L240,60 L240,240 L60,240 Z M60,150 L60,150 L240,150",
			equal:"M60,60 L60,60 L240,60 M60,120 L60,120 L240,120 M60,180 L60,180 L240,180 M60,240 L60,240 L240,240",
			render:"M60,60 L60,60 L240,60 L240,240 L60,240 Z M240,150 L240,150 L150,150 L150,240",
			database:"M60,60 L60,60 L240,60 L240,240 L60,240 Z M120,120 L120,120 L180,120 M120,180 L120,180 L180,180 M120,150 L120,150 L180,150",
			cache:"M60,60 L60,60 L240,60 L240,240 L60,240 Z",
			builder:"M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180",
			selector:"M90,60 L90,60 L60,60 L60,90 M60,210 L60,210 L60,240 L90,240 M210,240 L210,240 L240,240 L240,210 M240,90 L240,90 L240,60 L210,60",
			dom: "M150,60 L150,60 L60,150 L150,240 L240,150 Z",
			template: "M150,60 L150,60 L240,150 L150,240 L60,150 Z M120,150 L120,150 L180,150 M150,120 L150,120 L150,180",
		}
	}

	constructor() {
		this.network = {}
	}

	add(node) {
		this.network[node.id] = node
	}

	bind() {
		return {
			Ø: bØ(this, R.__),
		}
	}
}

class RNode {
	constructor(ctx, id, pos) {
		this.ctx = ctx

		this.id = id;
		this.ports = {}
		this.rect = pos;
		this.parent = null;
		this.children = [];
		this.label = id;
	}

	setup() {
		this.ports.input = new RPort(this, 'in', Riven.PORT_TYPES.input)
		this.ports.output = new RPort(this, 'out', Riven.PORT_TYPES.output)
		this.ports.answer = new RPort(this, 'answer', Riven.PORT_TYPES.answer)
		this.ports.request = new RPort(this, 'request', Riven.PORT_TYPES.request)
	}

	create(pos = {x: 0, y: 0}, type = RNode, ...params) {
		let node = new type(this.ctx, this.id, pos, ...params)
		this.rect = pos
		node.setup()
		this.ctx.add(node)
		return node
	}

	mesh(pos = {x: 0, y: 0}, n) {
		let mesh = new RMesh(this.ctx, this.id, pos)
		mesh.setup()
		this.ctx.add(mesh)

    if(n instanceof Array) {
      for(id in n) {
        n[id].parent = mesh;
        mesh.children.push(n[id]);  
        mesh.update();
      }
    } else {
      n.parent = mesh;
      mesh.children.push(n);  
      mesh.update(); 
    }
    return mesh;
	}

	connect(q, type = Riven.ROUTE_TYPES.output) {
    if (q instanceof Array) {
      for (id in q) {
        this.connect(q[id],type)
      }
    } else {
      this.ports[type == ROUTE_TYPES.request ? "request" : "output"].connect(`${q} ${type == ROUTE_TYPES.request ? "answer" : "input"}`,type);  
    }
	}

	syphon(q) {
		this.connect(q, Riven.ROUTE_TYPES.request)
	}

	bind(q) {
		this.connect(q)
		this.syphon(q)
	}

	signal(target) {
    for (port_id in this.ports) {
      let port = this.ports[port_id]
      for (route_id in port.routes) {
        let route = port.routes[route_id]
        if (!route || !route.host || route.host.id != target.toLowerCase()) { continue; }
        return route.host
      }
    }
    return null;
	}

	send(payload) {
    for (route_id in this.ports.output.routes) {
      let route = this.ports.output.routes[route_id];
      if (!route) { continue; }
      route.host.receive(payload)
    }	
	}

	receive(q) {
   	let port = this.ports.output
    for (route_id in port.routes) {
      let route = port.routes[route_id]
      if (route) {
        route.host.receive(q)  
      }
    }		
	}

	bang() { return this.send(true) }
	answer(q) { return this.request(q) }

	request(q) {
    let payload = {};
    for (route_id in this.ports.request.routes) {
      let route = this.ports.request.routes[route_id]
      if (!route) { continueS }
      let answer = route.host.answer(q)
      if (!answer) { continue }
      payload[route.host.id] = answer
    }
    return payload
	}
}

class RPort {
	constructor(host, id, type = Riven.PORT_TYPES.default) {
		this.host = host
		this.id = id
		this.type = type
		this.routes = []
	}

	connect(b, type = 'transit') {
		const sel = this.host.ctx.bind().Ø
		this.routes.push(sel(b))
	}
}

class RMesh extends RNode {
	constructor(ctx, id, pos) {
		super(ctx, id, pos)
		this.isMesh = true
	}

	setup() {}
	update() {
		let bounds = {x: 0, y: 0}
		for (let child of this.children) {
			bounds.x = node.rect.x > bounds.x ? node.rect.x : bounds.x
			bounds.y = node.rect.y > bounds.y ? node.rect.y : bounds.y
		}
		this.rect.w = bounds.x+4;
		this.rect.h = bounds.y+5;
	}
}

RNode.Port = RPort
RNode.Mesh = RMesh
Riven.Node = RNode

module.exports = Riven