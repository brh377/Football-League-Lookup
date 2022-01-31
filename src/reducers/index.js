import {combineReducers} from 'redux';
import leagueReducer from './leagueReducer';
import countryReducer from './countryReducer';
import teamsReducer from './teamsReducer';
import playerReducer from './playerReducer';
import gamesReducer from './gamesReducer';
import fixtureReducer from './fixtureReducer';

const appReducer =  combineReducers({
    leagues:leagueReducer,
    countries:countryReducer,
    teams:teamsReducer,
    roster:playerReducer,
    games:gamesReducer,
    fixture:fixtureReducer
})

const rootReducer = (state,action)=>{
    if(action.type === 'HOME_PAGE'){
        state = undefined;
    }
    return appReducer(state,action);
};

export default rootReducer;