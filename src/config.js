import { merge } from 'lodash'
import secret from './config.secret.js'

export default merge({}, secret)
