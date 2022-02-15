import React from 'react'
import {connect} from 'react-redux'
import {fetchFixture,fetchStats} from '../actions';
import './Fixture.css'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class Fixture extends React.Component{
    constructor(props){
        super(props)
        this.state ={renderedStats:null};
    }
    
    componentDidMount(){
        this.props.fetchFixture(this.props.match.params.id)
        this.props.fetchStats(this.props.match.params.id)
    }

   
    showStats = (event)=>{
        let clickId = event.currentTarget.id
        const player = this.props.stats.find( id => clickId == id.player_id)
        if(player === null){return this.props.stats}
        this.setState({renderedStats:player})
        

    }
    statBox = ()=>{
        let player = this.state.renderedStats;
        if (player !== null){
        return (
            <div className = "stat-box">
                <div className = "stat-shots">
                    <p>Shots: {player.shots.total}</p>
                    <p>On Target: {player.shots.on}</p>
                </div>
                <div className = "stat-goals">
                    <p>Goals: {player.goals.total}</p>
                    <p>Assists: {player.goals.total}</p>
                    <p>Saves: {player.goals.total}</p>
                </div>
                <div className = "stats-passes">
                    <p>Passes: {player.passes.total}</p>
                    <p>Accuracy: {player.passes.accuracy}</p>
                </div>
            </div>
        )
    }
}

    Header(){
        const  {game} = this.props.location.state;
        const day = new Date(game.event_date).toUTCString("en-US").split("/");

        return(
            <div className="top-info">
                <div className="team-logos">
                    <img src={game.homeTeam.logo} alt="home"/>
                    <img src={game.awayTeam.logo} alt="away"/>
                </div>
                <div className = "names">
                    <h1>{game.homeTeam.team_name}</h1>
                    <h1>{game.goalsHomeTeam}</h1> 
                </div>
                <div className = "names">
                    <h1>{game.awayTeam.team_name}</h1>
                    <h1>{game.goalsAwayTeam}</h1>
                </div>
                <div className="date-venue">
                    <p>{day}</p>
                    <p>{game.venue}</p>
                    <img src={game.league.logo} alt="league-logo"/>
                </div>

            </div>
        )
    }

    showLinup(){
        const {game} = this.props.location.state;
        let starters = [];
        let subs = [];

        /* Checks if match has stats */
        if (!(this.props.fixture) || this.props.fixture.length === 0) {
            return <h1>Stats are not avalable for this match</h1>
        }else{
            starters[0] = this.props.fixture[0].startXI.map( player =>{
                
                return <div className="player-info" key={player.player.id} stats = {this.props.fixture[player]}>
                    {this.props.stats && this.props.stats.length > 0 ? <div className = "arrow-accordion" >
                        <ArrowDownwardIcon 
                        onClick = {this.showStats} id ={player.player.id}/>
                    </div>:null}
                    <p>{player.player.number}</p>
                    <p>{player.player.name}</p>
                    <p>{player.player.pos}</p>
                    {this.state.renderedStats !== null && this.state.renderedStats.player_id === player.player.id ?this.statBox():null}
                    </div>
            })
            subs[0] = this.props.fixture[0].substitutes.map(player =>{
                return <div  className="sub" key={player.player.id}>
                            <p>{player.player.number}</p>
                            <p>{player.player.name}</p>
                            <p>{player.player.pos}</p>
                        </div>
            })
            starters[1] = this.props.fixture[1].startXI.map( player =>{
                return <div className="player-info" key={player.player.id}>
                    {this.props.stats && this.props.stats.length > 0 ? <div className = "arrow-accordion" >
                        <ArrowDownwardIcon 
                        onClick = {this.showStats} id ={player.player.id}/>
                    </div>:null}
                    <p>{player.player.number}</p>
                    <p>{player.player.name}</p>
                    <p>{player.player.pos}</p>
                    {this.state.renderedStats !== null && this.state.renderedStats.player_name === player.player.name ?this.statBox():null}
                    </div>
            })
            subs[1] = this.props.fixture[1].substitutes.map(player =>{
                return <div className=" sub" key={player.player.id}>
                            <p>{player.player.number}</p>
                            <p>{player.player.name}</p>
                            <p>{player.player.pos}</p>
                            
                        </div>
        })
        
        return (
            <div className="player-table">
                <div className="home">
                    <div className="lineup-header">
                        <img src={game.homeTeam.logo} alt="home"/>
                        <h3>{game.homeTeam.team_name}</h3>
                    </div>
                    <div className="lineup-starters">
                        {starters[0]}
                    </div>
                    <div className="lineup-subs">
                        {subs[0]}
                    </div>
                </div>
                <div className="away">
                    <div className="lineup-header">
                        <img src={game.awayTeam.logo} alt="home"/>
                        <h3>{game.awayTeam.team_name}</h3>
                    </div>
                    <div className="lineup-starters">
                        {starters[1]}
                    </div>
                    <div className="lineup-subs">
                        {subs[1]}
                    </div>
                </div>
            </div>
        )
        
        }
}

    render(){
        return(
            <div className="fixture-container">
                {this.Header()}
                {this.showLinup()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        fixture:state.fixture.fixture,
        stats:state.fixture.stats
    }
}

export default connect(mapStateToProps,{fetchFixture,fetchStats})(Fixture)