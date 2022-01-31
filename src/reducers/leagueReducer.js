export default (state = [],action) =>{
    switch (action.type){
      case 'FETCH_LEAGUES':
        if(state.length ===0){
          return [...state,action.payload];
        }
        else{
          return state.map((item) => {
            if (action.payload === item) {
              // This isn't the item we care about - keep it as-is
              return item
            };
        
            // Otherwise, this is the one we want - return an updated value
            return [
              ...action.payload
            ]
          })
      }
      
      default:
        return state;
    }
    
}