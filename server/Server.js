import express from 'express'
import createError from 'http-errors'
import path from 'path'

let instance = null

class Server {
  constructor () {
    if (!instance) { instance = this }

    this.createApp()
    this.setupAppOptions()
    this.setupAppRoutes()
    this.setupAppErrors()
    return instance
  }

  createApp = () => {
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static('./build'))

  }

  setupAppErrors = () => {
    this.app.use((request, response, next) => {
      next(createError(404))
    })

    this.app.use((error, request, response, next) => {
      response.locals.message = error.message
      response.locals.error = request.app.get('env') === 'development' ? error : {}

      response.status(error.status || 500)
      response.send('error')
    })
  }

  setupAppRoutes = () => {
    const __dirname = path.resolve()
    this.app.get('*', (request, response, next) => {
      response.sendFile(path.join(__dirname, '/build/index.html'))
    })
  }

  setupAppOptions = () => {
    this.app.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', request.headers.origin || '*')
      response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,HEAD,DELETE,OPTIONS')
      response.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with')
      next()
    })
  }
}

export default Server