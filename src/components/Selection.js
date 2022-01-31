import React from 'react';
import './Selection.css';
import SelectionItem from './SelectionItem';
import homelogo from '../photos/logo.png';
import {connect} from 'react-redux';
import {fetchCountry,clearData} from '../actions';

 class Selection extends React.Component{
     constructor(props){
         super(props)
         this.state ={clicked: null};
     }

    componentDidMount(){
        this.props.fetchCountry();
        this.props.clearData();
    }

    getCountries = () => {
        let badCountries = ["World","Iraq"]
        let renderedList = []
        if (this.props.countries !== undefined){
            renderedList = this.props.countries.map(country=>{
                if(!badCountries.includes(country.country)){
                    return <SelectionItem key ={country.country}country = {country}></SelectionItem>;
                }else{
                    return null
                }
            });
        }
        
        

        if(this.state.clicked === true){
            this.handleHide()
            this.setState({renderedList:null});
        }
        else{
            this.setState({renderedList:renderedList});
            this.handleShow();
        }
    }

    handleShow = ()=>{
        this.setState({
            clicked: true
        })
    }
  
    handleHide = () =>{
        this.setState({
            clicked: false,
            countryClicked:false
        })
    }

    selectedToggle =() =>{
        if(this.state.clicked === true){
            this.handleHide()
            this.setState({renderedList:null});
        }
       
    }
    render(){ 
        return(
            <div className="welcome-body">
                <div className="welcome-photo">
                    <img src={homelogo} alt="bicycle kick"/>
                </div>
                <div className="welcome-bottom">
                    <div className="welcome-left">
                        <div className = {`menu ${this.state.clicked=== null?'hidden':''}`} onClick={this.selectedToggle}>{this.state.renderedList} </div>
                            <h1>Welcome to the Football League Lookup</h1>
                        </div>
                    <div className="welcome-right">
                        <button className="button1 ui button" href ='#' onClick ={this.getCountries}>Select Country</button>
                        <h3>To begin, click "select country" and choose a league</h3>
                    </div>
                </div>
                
            </div>
        );
    }
    
 }
 const mapStateToProps = state =>{
     return {
        countries:state.countries.list};
 }
 

 export default connect(mapStateToProps,{fetchCountry,clearData})(Selection);