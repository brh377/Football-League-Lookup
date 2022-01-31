const INITIAL_STATE={
teams:[]
}
export default (state = INITIAL_STATE,action) =>{
    switch (action.type){  
      case 'FETCH_STANDINGS':   
        if(state.teams.length === 0){
          return {...state,teams:action.payload};
        }

        else if(state.teams !== action.payload){
          return{...state,teams:action.payload}
        }
        else{
          return state.teams.map((item,index) => {
            
            if (item.team_id === action.payload[index].team_id) {
              // This isn't the item we care about - keep it as-is
              return item
            };
            
          })
      }
      default:
        return state;
    }
    
}