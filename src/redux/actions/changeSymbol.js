const changeSymbol = (newSymbol) => {
    return {
        type: "CHANGE_SYMBOL",
        payload: newSymbol
    }
}

export default changeSymbol;