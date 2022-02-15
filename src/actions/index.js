import axios from 'axios';
require('dotenv').config();
const api_key = process.env.REACT_APP_X_RAPIDAPI_KEY

export const leagueData = code => async (dispatch) =>{
    
    axios({
        "method":"GET",
        "url":`https://api-football-v1.p.rapidapi.com/v2/leagues/country/${code}/2019`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
        "x-rapidapi-key":`${api_key}`,
        "useQueryString":true
        }
        })
        .then((response)=>{
            dispatch({type:'FETCH_LEAGUES',payload:response.data.api.leagues});
        })
        .catch((error)=>{
          console.log(error)
        })
}
export const fetchCountry = () => async (dispatch) =>{
    axios({
        "method":"GET",
        "url":"https://api-football-v1.p.rapidapi.com/v2/countries",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
        "x-rapidapi-key":`${api_key}`,
        "Access-Control-Allow-Origin":"*",
        "useQueryString":true
        }
        })
    .then((response)=>{
        dispatch({type:'FETCH_COUNTRIES',payload:response.data.api.countries});
        
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const clearData = () => async (dispath) =>{
    dispath({type:'HOME_PAGE'})
}

export const fetchStandings = (league_id) => async (dispatch) =>{
    axios({
        "method":"GET",
        "url":`https://rapidapi.p.rapidapi.com/v2/leagueTable/${league_id}`,
        "headers":{
        "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
        "x-rapidapi-key":`${api_key}`,
        }
        })
        .then((response)=>{
            //For MLS Standings
            if(league_id === 294){
                response.data.api.standings = response.data.api.standings[0].concat(response.data.api.standings[1])
                .sort((a,b) => (b.points-a.points))
                dispatch({type:'FETCH_STANDINGS',payload:response.data.api.standings});
            }
            //
            else{
                dispatch({type:'FETCH_STANDINGS',payload:response.data.api.standings[0]});
            }
            
            
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    export const fetchSchedule = (team_id,league_id) => async (dispatch) =>{
        axios({
            method: 'GET',
            url: `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${team_id}/${league_id}`,
            params: {timezone: 'Europe/London'},
            headers: {
                'x-rapidapi-key': `${api_key}`,
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        })
        .then((response)=>{
                dispatch({type:'FETCH_SCHEDULE',payload:response.data.api.fixtures});
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    export const fetchFixture = (fixture_id) => async dispatch =>{
        axios({
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups',
            params: {fixture: fixture_id},
            headers: {
                'x-rapidapi-key': `${api_key}`,
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        })
        .then((response)=>{
            dispatch({type:'FETCH_FIXTURE',payload:response.data.response});

        })
        .catch((error)=>{
            console.log(error)
        });

    }

    export const fetchStats = (fixture_id) => async dispatch =>{
        axios({
            method: 'GET',
            url: `https://api-football-v1.p.rapidapi.com/v2/players/fixture/${fixture_id}`,
            headers: {
                'x-rapidapi-key': `${api_key}`,
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        })
        .then((response)=>{
            dispatch({type:'FETCH_STATS',payload:response.data.api.players});

        })
        .catch((error)=>{
            console.log(error)
        });
      
    }