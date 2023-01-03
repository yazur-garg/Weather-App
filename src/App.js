import {React, Component} from "react";
import LoadData from "./LoadData";
import {getcities} from './Citydata';
import { useLocation,useNavigate,useParams } from "react-router-dom";
import { Navbar, Nav, NavDropdown,Row, Col, Form, Button,Container } from "react-bootstrap";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let params = useParams();
      let navigate = useNavigate();
      return (
        <Component
          {...props}
          location={location} navigate={navigate} params={params}
        />
      );
    }
 
    return ComponentWithRouterProp;
}

class App extends Component{
    constructor(props) {
        super(props);
        this.clickedcityID = this.clickedcityID.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }
    state = {cities: [], city: "", recentlyViewed: []};
    async componentDidMount(){
        getcities().then((data)=>this.setState({cities: data}));   
    }    

    async componentDidUpdate(){
        if (this.props.location.pathname.match(/\/ShowMore/g) != null){
            if ((this.state.recentlyViewed).filter(city => city.id === this.props.params.id).length === 0){
                var temp = this.state.recentlyViewed.concat(this.props.params);
                //console.log(temp);
                this.setState({recentlyViewed: temp});
            }                
        }
    }

    formSubmit(e){
        e.preventDefault();
        var temp = e.target.elements.city.value
        this.setState({city: temp});
        if (this.props.location.pathname !== "/")
            this.props.navigate('/');
    }

    clickedcityID(e){
        this.props.navigate('/City/'+ this.state.recentlyViewed[e.target.id].id +'/' + this.state.recentlyViewed[e.target.id].name);
    }

    render(){
        return(
            <div>
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                        <Navbar.Brand href="/">Today's Weather</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <NavDropdown title="Previously Viewed" id="collasible-nav-dropdown">
                                    {this.state.recentlyViewed.length > 0 ?
                                        this.state.recentlyViewed.map((city, index)=>(
                                            <NavDropdown.Item key={index} id={index} onClick={this.clickedcityID}>City: ({city.id}) {city.name},{city.country}</NavDropdown.Item>)) : (
                                                <NavDropdown.Item>No City visited</NavDropdown.Item>
                                            )}
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <br></br><br></br>
                <Form onSubmit={this.formSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Col sm={{span:8, offset: 2}}>
                            <Form.Control type="text" name="city" placeholder="City,Country" />
                        </Col>
                        <Col sm={2}>
                            <Button type="submit">Search</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <br></br>
                <LoadData cities={this.state.cities} city={this.state.city} params = {this.props.params} location = {this.props.location.pathname}/>
            </div>
        )
    }
}

export default withRouter(App);