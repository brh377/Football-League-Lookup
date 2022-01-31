const INITIAL_STATE = {
    fixture:null,
    stats:null
}

export default (state = INITIAL_STATE,action) =>{
    switch (action.type){
        case 'FETCH_FIXTURE':
            return {...state,fixture:action.payload};

        case 'FETCH_STATS':
            return {...state,stats:action.payload}
        default:
            return state;
    }
}