import React from 'react';
import {fetchSchedule} from '../actions';
import {connect} from 'react-redux';
import './Schedule.css'
import Nav from './Nav'
import {Link} from 'react-router-dom';


class Schedule extends React.Component{
    componentDidMount(){

        const {state} = this.props.location
        if(state.team){
            this.props.fetchSchedule(state.team,state.league)
        }
    }
    
    showGames(){
        if(this.props.games){
            return this.props.games.map(game =>{
                return(
                    <Link to={{pathname:`/Leagues/fixtures/${game.fixture_id}`,state:{game:game}}} key={game.fixture_id} className="game-container">
                        <div className="team">
                            <img src={game.homeTeam.logo} alt="home team logo"/>
                            {game.homeTeam.team_name}
                        </div>
                        <div className="scores">
                            {game.goalsHomeTeam}
                            <span>{game.statusShort}</span>
                            {game.goalsAwayTeam}
                        </div>
                        
                        <div className="team">
                            
                            {game.awayTeam.team_name}
                            <img src={game.awayTeam.logo} alt="away team logo"/>
                        </div>
                        
                    </Link>
                )
            })
        }
        
    }

    render(){
        return(
            <div className="top-container">
                <Nav 
                    country={this.props.games?this.props.games[0].league.country:null} 
                    league={this.props.games?this.props.games[0].league_id:null}
                    team = {this.props.games?this.props.match.params.id:null}
                />
                <div className = "all-games">{this.showGames()}</div>
                
            </div>
        )
    };
}

const mapStateToProps = state =>{
    return{
        games:state.games.list
    }

}
export default connect(mapStateToProps,{fetchSchedule})(Schedule);