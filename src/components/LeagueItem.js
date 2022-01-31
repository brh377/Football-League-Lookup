import React from 'react';
import './LeagueItem.css'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class LeagueItem extends React.Component{
    render(){
        return (
            <Link className = "league-name" to = {{
                pathname:`/Leagues/${this.props.leagues.country}/Info`,
                state:{id:this.props.leagues.league_id}} }>
                <div className ="league-logo">
                    <img src = {this.props.leagues.logo} alt={this.props.leagues.name}></img>
                </div>
                <p>{this.props.leagues.name}</p>
            </Link>
        )
    }
}

const mapStateToProps = state => {
    return {team:state.teams[0]}
}

export default connect(mapStateToProps)(LeagueItem);