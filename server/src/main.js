import params  from '../params'
import * as server from './index'
import { connectToDatabase } from './config'


connectToDatabase(params.server.db)

server.create(params.server)
    .then( () => console.log('not yet ready to play tetris with U ...') )
    .catch(err => console.log(err))
