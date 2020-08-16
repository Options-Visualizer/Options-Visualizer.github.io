const currentStrategies = (state = [], action) => {
    switch (action.type) {
      case 'ADD_STRATEGY':
        return [
          ...state,
          {}
        ]
      case 'UPDATE_STRATEGY':
        return [
          ...state.slice(0, action.index),
          {
            strat: action.strat,
            legs: []
          },
          ...state.slice(action.index + 1)
        ]
      case 'UPDATE_LEG':
        return [
          ...state.slice(0, action.index),
          {
            ...state[action.index],
            legs: {
              ...state[action.index].legs,
              [action.leg]: {
                ...state[action.index].legs[action.leg],
                [action.field]: action.value
              }
            }
          },
          ...state.slice(action.index + 1)
        ]
      case 'CLEAR_STRATEGY':
        return [
          ...state.slice(0, action.index),
          {},
          ...state.slice(action.index + 1)
        ]
      case 'DELETE_STRATEGY':
        return [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
        ]
      case 'CLEAR_ALL':
        return []
      default:
        return state;
    }
  }
  
export default currentStrategies;