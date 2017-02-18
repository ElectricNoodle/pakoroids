var express = require('express')
var app = module.exports.app = exports.app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var crypto = require('crypto')
var fs = require('fs')

var HIGH_SCORES_FILE = './high-scores.json'
var USERS_FILE = './users.json'

var scores
var users

function loadUsers (cb) {
  fs.readFile(USERS_FILE, function (usersFile) {
    try {
      var usersLoaded = JSON.parse(usersFile)
      users = usersLoaded
    } catch (e) {
      console.log('Error loading user files, setting to default')
      users = {}
    }
    cb()
  })
}

function saveUsers (cb) {
  fs.writeFile(USERS_FILE, JSON.stringify(users), function () {
    console.log('Saved users file')
    users = []
    cb()
  })
}

function loadScores (cb) {
  fs.readFile(HIGH_SCORES_FILE, function (scoresFile) {
    try {
      var scoresLoaded = JSON.parse(scoresFile)
      scores = scoresLoaded
    } catch (e) {
      console.log('Error loading score file')
    }
    cb()
  })
}

function reformatScores() {
  scores.sort(function (a, b) {
    if (a.score < b.score) {
      return -1
    } else if (a.score > b.score) {
      return 1
    } else {
      return 0
    }
  })

  scores = scores.slice(0,10)
  console.log('Reformatted scores')
}

function saveScores (cb) {
  fs.writeFile(HIGH_SCORES_FILE, JSON.stringify(scores), function () {
    console.log('Saved scores file')
  })
}

app.use(express.static(__dirname + '/../src'))
app.use(require('connect-livereload')())

io.on('connection', function (socket) {
  socket.emit('connected', {client_id: crypto.randomBytes(10).toString('base64')})

  socket.on('register', function (token, username) {
    if (users[username] === undefined) {
      users[username] = token
      socket.emit('register-success')
    } else {
      socket.emit('register-error')
    }
  })

  socket.on('relay', function (username, token, score) {
    if (users[username] === token) {
      scores.push({username: username, score: score})
    }

    reformatScores()

    saveScores(function () {
      console.log('Saved scores')
    })
  })

  socket.on('get-scores', function () {
    socket.emit('scores', JSON.stringify(scores))
  })
})

loadScores(function () {
  console.log('Scores loaded')
})

loadUsers(function () {
  console.log('Users loaded')
})

http.listen(9000)
