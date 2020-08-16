const addStrategy = () => {
    return {
        type: "ADD_STRATEGY"
    }
}

const updateStrategy = (i, newStrat) => {
    return {
        type: "UPDATE_STRATEGY",
        index: i,
        strat: newStrat
    }
}

const updateLeg = (i, l, f, newValue) => {
    return {
        type: "UPDATE_LEG",
        index: i,
        leg: l,
        field: f,
        value: newValue
    }
}

const clearStrategy = (i) => {
    return {
        type: "CLEAR_STRATEGY",
        index: i
    }
}

const deleteStrategy = (i) => {
    return {
        type: "DELETE_STRATEGY",
        index: i
    }
}

const clearAll = () => {
    return {
        type: "CLEAR_ALL"
    }
}

export default {
    addStrategy,
    updateStrategy,
    updateLeg,
    clearStrategy,
    deleteStrategy,
    clearAll
};