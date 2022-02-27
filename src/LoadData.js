import React, { Component } from 'react';
import Display from './Display';
import Clocation from "./Currentlocation";
import { Button } from "react-bootstrap";

class LoadData extends Component {
    constructor(props) {
        super(props);
        this.pevpage = this.pevpage.bind(this);
        this.nextpage = this.nextpage.bind(this);
        this.setdisplay = this.setdisplay.bind(this);
    }
    state = {
        loading: true,
        dbweatherdata: [],
        weatherdata: [],
        page: 0,
        display: [],
        flag: "",
        flag2: -1
    }
    async componentDidMount(){
        Clocation().then((data)=>{
                fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + data.lat + "&lon=" + data.lon + "&units=metric&appid=c528f5397888b4f37fef45098aebf883")
                .then(res => res.json())
                .then((data) => {
                    this.setState({weatherdata:[]})
                    var list = this.state.weatherdata.concat(data);
                    var list2 = this.state.dbweatherdata.concat(list);
                    this.setState({ dbweatherdata: list2,weatherdata: list, loading: false});
                    //console.log(this.state.weatherdata);
                    this.setdisplay(0);
                })
                .catch(console.log)             
        })       
    }
    async componentDidUpdate(){
        if (this.props.city !== "" && this.props.city !== this.state.flag){
            this.setState({loading: true, flag: this.props.city});
            if(this.props.city.includes(",")){
                fetch("https://api.openweathermap.org/data/2.5/weather?q=" + this.props.city + "&units=metric&appid=c528f5397888b4f37fef45098aebf883")
                .then(res => res.json())
                .then((data) => {
                    this.setState({weatherdata:[]})
                    var list = this.state.weatherdata.concat(data);
                    var list2 = this.state.dbweatherdata.concat(list);
                    this.setState({ dbweatherdata: list2,weatherdata: list, loading: false});
                    this.setdisplay(0);
                // console.log(this.state.weatherdata);
                })
                .catch(()=>{this.setState({weatherdata: [], loading: false})}) 
            }
            else{
                var cities = (this.props.cities).filter(city => city.name.toUpperCase() === this.props.city.toUpperCase());
                //console.log(cities);
                var temp = "";
                if (cities.length > 0)
                {
                    for(let i = 0;i < cities.length - 1; ++i)
                        temp += cities[i].id.toString() + ",";
                    temp += cities[cities.length-1].id.toString();
                }
                fetch("https://api.openweathermap.org/data/2.5/group?id=" + temp + "&units=metric&appid=c528f5397888b4f37fef45098aebf883")
                .then(res => res.json())
                .then((data) => {
                    this.setState({weatherdata:[]})
                    var list = this.state.weatherdata.concat(data.list);
                    var list2 = this.state.dbweatherdata.concat(list);
                    this.setState({ dbweatherdata: list2,weatherdata: list, loading: false});
                    //console.log(this.state.dbweatherdata);
                    this.setdisplay(0);
                })
                .catch(()=>{this.setState({weatherdata: [], loading: false})})
            }
        }
        else if(this.props.params !== undefined && this.state.flag2 !== this.props.params){
            this.setState({flag2: this.props.params});
            if (this.props.location.match(/\/City/g) != null){
                //console.log(this.state.dbweatherdata)
                Clocation().then(()=>{
                    this.setState({weatherdata:[], loading: true});
                    var temp = [];
                    for (let i = 0; i < this.state.dbweatherdata.length && temp.length === 0;++i){
                        if (this.state.dbweatherdata[i] !== undefined){
                            if(this.state.dbweatherdata[i].id.toString() === this.props.params.id)
                                temp.push(this.state.dbweatherdata[i]);
                        }
                    }
                    //console.log(temp);
                    this.setState({weatherdata: temp, loading: false})
                    //console.log(this.state.weatherdata);
                    this.setdisplay(0);
                })
            }
        }
    }
    setdisplay(page){
        var temp = [];
        for(let i = page*3; i < (page*3)+3 && i < this.state.weatherdata.length; ++i){
            temp.push(this.state.weatherdata[i]);
        }
        this.setState({display: temp})
    }
    pevpage(e){
        if(this.state.page > 0){
            this.setState({ page: this.state.page - 1});
            this.setdisplay(this.state.page - 1)
        }
    }
    nextpage(e){
        if(Math.ceil(this.state.weatherdata.length/3) - 1 > this.state.page){
            this.setState({ page: this.state.page + 1});
            this.setdisplay(this.state.page + 1)
        }
    }
    render(){
        return (<div>
            { this.state.loading || !this.state.weatherdata ? 
               (
                    <div> 
                        <center><Button variant="dark" disabled>Loading...</Button></center>
                    </div>
               ) : (
                    <div>
                        <Display weatherdata={this.state.display} />
                        <br></br>
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <button className="page-link" onClick={this.pevpage} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            <li className="page-item"><button className="page-link">{this.state.page + 1}</button></li>
                            <li className="page-item">
                                <button className="page-link" onClick={this.nextpage} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                            </ul>
                        </nav>
                    </div>
               )
            }
        </div>);
    }
}
export default LoadData;