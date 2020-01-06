// var Controller = require('./playerController')
// var expect = require('expect.js')

import Controller from './playerController'
import Player from './playerModel'
import Tetraminos from './Game/tetraminos'

import expect from 'expect.js'

import sinon from 'sinon'

import io from 'socket.io'
import ioClient from 'socket.io-client'

import { Socket } from './socket'

const socketURL = "http://localhost:5000"
const options = {
	transports: ['websocket'],
	'force new connection': true
}

describe("User package", function() {
	let data = { name: "testName" }
	let user, server, socket, client
	
	before(function() {
		server = io().listen(5000)
		socket = new Socket(server)
		socket.connect()
		client = ioClient.connect(socketURL, options)
	})

	after(function() {
		server.close()
		client.close()
	})

	describe("-> user Controller", function () {
		it("#login() should return an user object", function () {
			user = Controller.login(client, data)
			expect(Object.keys(Controller.isLogged).length).to.be(1)
		})
		
		it("#logout() should remove user from the Controller variable (isLogged)", function () {
			Controller.logout(user.socket)
			expect(Object.keys(Controller.isLogged).length).to.be(0)
		})
	})

	describe ("-> user Model", function () {
		before(function () {
			user = Controller.login(client, data)
		})
		
		after(function() {
			Controller.logout(user.socket)
		})
		
		it("#Notify should send an event", function (done) {
			client.on("test", function (data) {
				expect(data).to.be("worked")
				done()
			})
			user.Notify("test", "pong")
		})

		it("should init game board", function (done) {
			client.on("DISPLAY", (data) => {
				expect(data).to.be.an('array')
				console.log(data)
				done()
			})
			user.initGame("classic")
			var data = user.get()
			
		})

		describe("#start", function () {
			before(function () {
			})
				   
			after(() => {
				user.stopGame()
			})
			
			it("should return an array", function (done) {
				client.on("DISPLAY", function (data) {

//					done()
				})
				var getPiece = function (id, nbr) {
					return Tetraminos()
				}

				var mallus = (id) => {
					return id
				}
				
				var end = (id) => {
					return id
				}
				user.start("classic", getPiece, mallus, end)
			})
		})

		
	})
})
