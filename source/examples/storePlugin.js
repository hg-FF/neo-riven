const Riven = require('..')
const RivenS = require('../plugins/store')

const rvn = new Riven()
rvn.mount(RivenS)

rvn.store.create('a', 12)
rvn.store.store('b', rvn.store.reactor(() => rvn.data.a() + 10 ))
console.log('t1', rvn.data.a(), rvn.data.b())

rvn.store.freeze(() => {
	rvn.store.update('a', 13)
	console.log('t2', rvn.data.a(), rvn.data.b())
})

console.log('t3', rvn.data.a(), rvn.data.b())