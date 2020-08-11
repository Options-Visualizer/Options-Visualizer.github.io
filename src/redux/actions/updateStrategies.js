const newStrategy = () => {
    return {
        type: "NEW_STRATEGY",
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

const deleteStrategy = (i) => {
    return {
        type: "DELETE_STRATEGY",
        index: i
    }
}

export default {
    newStrategy,
    updateStrategy,
    updateLeg,
    deleteStrategy
};