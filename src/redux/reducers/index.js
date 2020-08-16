import currentSymbol from './currentSymbol'
import currentStrategies from './currentStrategies'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    currentSymbol,
    currentStrategies
})

export default rootReducer;