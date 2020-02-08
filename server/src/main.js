import params  from '../params'
import * as server from './index'
import { connectToDatabase } from './config'

// import chokidar from 'chokidar'

// const watcher = chokidar.watch('./')

connectToDatabase(params.server.db)

// if (process.env.NODE_ENV === "developpement") {
    
// }

server.create(params.server)
    .then( () => console.log('not yet ready to play tetris with U ...') )
    .catch(err => console.log(err))
