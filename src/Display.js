import {React} from 'react'
import { Button, Card,ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Display = ({ weatherdata }) => {
    const navigate = useNavigate();
    function showMore(e){
        for (let i = 0; i < weatherdata.length; ++i)
            document.getElementById(i+"expand").innerHTML = '';
        var temp = '<ListGroup.Item><b>Feels like: </b>' + weatherdata[e.target.id].main.feels_like + '\u00B0C <b>and expect wether from </b>' + weatherdata[e.target.id].main.temp_min + '\u00B0C <b>to</b> ' + weatherdata[e.target.id].main.temp_max + '\u00B0C</ListGroup.Item>';
        temp += '<ListGroup.Item><b>Sunrise: </b>' + new Date(weatherdata[e.target.id].sys.sunrise * 1000).toLocaleTimeString() + '<b> Sunset: </b>' + new Date(weatherdata[e.target.id].sys.sunset * 1000).toLocaleTimeString() + '</ListGroup.Item>';
        temp += '<ListGroup.Item><b>Clouds: </b>' + weatherdata[e.target.id].weather[0].description + '<b> Humidity: </b>' + weatherdata[e.target.id].main.humidity + '% <b>Pressure: </b>' + weatherdata[e.target.id].main.pressure +' hPa</ListGroup.Item>'
        temp += '<ListGroup.Item><b>Wind: </b>' + weatherdata[e.target.id].wind.speed + ' m/s<b> Degree: </b>' + weatherdata[e.target.id].wind.deg + '\u00B0</ListGroup.Item>';
        temp += '<ListGroup.Item><b>Geo Location: </b>' + weatherdata[e.target.id].coord.lon + ' , ' + weatherdata[e.target.id].coord.lat + '</ListGroup.Item>';
        document.getElementById(e.target.id+"expand").innerHTML = temp;
        
        navigate('/ShowMore/'+ weatherdata[e.target.id].id +'/' + weatherdata[e.target.id].name +'/' + weatherdata[e.target.id].sys.country);
    }
    return (
        <div>
            <center><h1>Weather Data</h1></center>
            {weatherdata[0] === undefined ? (
                   <center>
                        <Card className="text-center" style={{ width: '50em' }}>
                            <Card.Body>
                                <Card.Title>
                                    No City found with this name. Check the Name again
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </center>
                ) : (        
                    <div>             
                        {weatherdata.map((weatherdata, index) => (
                            <div key={index}>
                                <center>
                                    <Card className="text-center" style={{ width: '50em' }}>
                                        <Card.Body>
                                            <Card.Title>
                                                {weatherdata.name + ", " + weatherdata.sys.country}&nbsp;&nbsp;
                                                <img src={"http://openweathermap.org/images/flags/" + weatherdata.sys.country.toLowerCase() + ".png"} alt="map"/>
                                            </Card.Title>
                                            <Card.Text>
                                                <img src={"https://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + ".png"} alt="icon" />
                                                &nbsp;&nbsp;&nbsp;Temp: {weatherdata.main.temp + '\u00B0'}C, {weatherdata.weather[0].description}
                                            </Card.Text>
                                            <Button variant="dark" id={index} size="sm" onClick={showMore}>Show more</Button>
                                            <ListGroup id={index + "expand"}></ListGroup> 
                                        </Card.Body>
                                    </Card>
                                    <br></br>
                                </center>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
 };

 export default Display;