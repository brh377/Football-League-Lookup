const INITIAL_STATE={
    list:null,
}
export default (state=INITIAL_STATE,action) =>{
    switch (action.type){
        case 'FETCH_COUNTRIES':
            return {...state,list:action.payload};
        
        default:
            return state;
    }
}