import { expect } from 'chai'

import { socketMiddleware } from '../../../src/client/middleware/middleware'

import io from 'socket.io'

describe('socket middleware', () => {
	const option = {
		transport: ['websocket'],
		'force new connection': true
	}

	const create = (middleware, dispatch, next) => {
		const store = {
			getState: jest.fn(() => ({})),
			dispatch: dispatch
		}
		const m = middleware(store)
		const invoke = action => m(next)(action)
		return { store, next, invoke }
	}
	let server

	beforeEach(() => {
		server = io.listen(3004)
	})

	afterEach(() => {
		if (server)
			server.close()
	})

	it('should connected to the server', (done) => {
		server.on('connect', (socket) => {
			done()
		})

		create(socketMiddleware, jest.fn(), jest.fn())
	})

	it('should go to non-funtion action', () => {
		const action = { type: "TEST" }
		const next = (e) => {
			expect(e).to.be.eql(action)
		}
		const { invoke } = create(socketMiddleware, jest.fn(), next)

		invoke(action)
	})

	describe("Middleware event Listener removal", () => {
		const { invoke } = create(socketMiddleware, jest.fn(), jest.fn())

		it('should trigger test event', (done) => {
			server.on('connect', (socket) => {
				socket.emit("TEST")
			})

			const action = {
				event: "TEST",
				handle: (data) => done()
			}

			invoke(action)
		})

		it('should remove eventListener TEST', () => {
			const action = {
				leave: true,
				event: "TEST"
			}
			let s = invoke(action)
			expect(s._callbacks).to.not.have.property('$TEST')
		})
	})
	
	it('should trigger event on server', (done) => {
		server.on('connect', (socket) => {
			socket.on('TEST', (data) => {
				expect(data).to.be.eql("TRIGGER")
				done()
			})
		})

		const action = {
			emit: true,
			event: "TEST",
			payload: "TRIGGER"
		}

		const { invoke } = create(socketMiddleware, jest.fn(), jest.fn())
		invoke(action)
	})
	it('should trigger action handler', (done) => {
		const action = {
			event: "TEST",
			handle: (data) => {
				expect(data).to.be.eql("OK")
				done()
			}
		}

		server.on('connect', (socket) => {
			socket.emit('TEST', "OK")
		})
		const { invoke } = create(socketMiddleware, jest.fn(), jest.fn())
		invoke(action)
	})

	it('should dispatch when event is trigger (handler as string)', (done) => {
		const action = {
			event: "TEST",
			handle: "TYPE_TEST"
		}
		const dispatch = (e) => {
			expect(e).to.be.eql({type: "TYPE_TEST", result: "OK"})
			done()
		}

		server.on('connect', (socket) => {
			socket.emit('TEST', "OK")
		})
		const { invoke } = create(socketMiddleware, dispatch, jest.fn())

		invoke(action)
	})


})
