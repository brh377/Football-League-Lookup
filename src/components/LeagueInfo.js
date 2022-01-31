import React from 'react';
import './LeagueInfo.css';

import {connect} from 'react-redux';
import {fetchStandings,fetchSchedule} from '../actions';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import {Link} from 'react-router-dom'
import Nav from './Nav';

class LeagueInfo extends React.Component{
    
    
    componentDidMount(){
        //So Api wont be called more than once
        if(this.props.league_id && this.props.teams.length < 1){
            this.props.fetchStandings(this.props.league_id)
        }
        
    }

    getHeader = () =>{
        let head =[" ","GP","W","D","L","F","A","GD","P"]
        let res = []
        for(let i = 0;i<head.length;i++){
            res.push(<TableCell key= {i}>{head[i]}</TableCell>)
        }
        return res
    }

    showTop = () => {
        if(this.props.league !== undefined){
            let id = this.props.location.state.id
            const newId = this.props.league.find((league) => league['league_id'] ===id)
            return(
                <div className = "info-left">
                    <img src={newId.logo} alt= {newId.name}/>
                    <div>
                        <h2 className = "league-header">{newId.name}</h2>
                        <p>Season Start Date: {newId.season_start}</p>
                        <p>Season End Date: {newId.season_end}</p>
                    </div>
                </div>
            )
        }
    }
    showRoster=  () =>{
        if(this.props.teams !== undefined){
            return this.props.teams.map((team ,index)=>{
                    return(
                        <TableRow className="rank-slot" key={index}>
                                <TableCell className="slot-1">
                                    <h2 className="rank-number">{index+1}</h2>
                                    <Link league_id={this.props.league_id}   
                                        to={{pathname:`/Leagues/${team.teamName}/Schedule`,
                                        state:{team:team.team_id,league:this.props.league_id}}} >
                                            <img src={team.logo} alt={team.name}></img>
                                            <h2 className="rank-name">{team.teamName}</h2>
                                    </Link>
                                </TableCell>
                            <TableCell>{team.all.matchsPlayed}</TableCell>
                            <TableCell>{team.all.win}</TableCell>
                            <TableCell>{team.all.draw}</TableCell>
                            <TableCell>{team.all.lose}</TableCell>
                            <TableCell>{team.all.goalsFor}</TableCell>
                            <TableCell>{team.all.goalsAgainst}</TableCell>
                            <TableCell>{team.goalsDiff}</TableCell>
                            <TableCell>{team.points}</TableCell>
                        </TableRow>        
                    )
            }) 
        }else{
            return(
                <div className='league-error'>There is no data for this league</div>
            )
        }
    }

    render(){
        return (
            <div className = "info-league-container" >
                <Nav/>
                <div className="table-page">
                    {this.showTop()}
                    <div className="right-roster">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow className="table-headers">
                                    {this.getHeader()}
                                </TableRow>
                            </TableHead>
                            <TableBody className="roster">
                                {this.showRoster()}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

        );
    };

}
const mapStateToProps = (state,ownProps) => {
    return {
        teams:state.teams.teams,
        league_id:ownProps.location.state.id,
        league:state.leagues[0]
    }
}
export default connect(mapStateToProps,{fetchStandings,fetchSchedule})(LeagueInfo);
