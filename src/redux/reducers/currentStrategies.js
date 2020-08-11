const currentStrategies = (state = [], action) => {
    switch (action.type) {
      case 'NEW_STRATEGY':
        return [
          ...state,
          {}
        ]
      case 'UPDATE_STRATEGY':
        return [
          ...state.slice(0, action.index),
          {
             ...state[action.index],
             strat: action.strat
          },
          ...state.slice(action.index + 1)
        ]
      case 'UPDATE_LEG':
        return [
          ...state.slice(0, action.index),
          {
            ...state[action.index],
            legs: [
              ...state[action.index].legs.slice(0, action.leg),
              {
                ...state[action.index].legs[action.leg],
                [action.field]: action.val
              },
              ...state[action.index].legs.slice(action.leg + 1)
            ]
          },
          ...state.slice(action.index + 1)
        ]
      case 'DELETE_STRATEGY':
        return [
          ...state.slice(0, action.index),
          ...state.slice(action.index + 1)
        ]
      default:
        return state;
    }
  }
  
  export default currentStrategies;