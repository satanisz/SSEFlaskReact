import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";
import dark_logo_small from '../Assets/Images/dark_logo_small.png';
import "../style.css";

function NavigationBar(props) {
    const lineName = JSON.parse(localStorage.getItem('currentLine'))

    return (
        
        <Navbar bg="dark" variant="dark" className="myNavbar mb-4">
            <Container>
                <Navbar.Text>
                    Line: {lineName}
                </Navbar.Text>
                <p>{lineName}</p>
                <Navbar.Brand href="/"><img
                            src={dark_logo_small}
                            width="50"
                            height="40"
                            className="d-inline-block align-top"
                            alt="dark_logo_small"
                            />
                    </Navbar.Brand>
                
                <Nav className="me-auto">
                    <Nav.Link href="/about">About</Nav.Link>  
                    <NavDropdown title="Options" id="navbarScrollingDropdown" collapseonselect="true">
                        <NavDropdown.Item href="/filters">Filters</NavDropdown.Item>
                        <NavDropdown.Item href="/filtering-algorithms">Filtering algorithms</NavDropdown.Item>                    
                        <NavDropdown.Item href="/calculations">Calculations</NavDropdown.Item>                    
                    </NavDropdown>
                    <Nav.Link href="/calculation">Calculation</Nav.Link>
                    <NavDropdown title="New option" id="navbarScrollingDropdown" collapseonselect="true">
                        <NavDropdown.Item href="/new-filter">New filter</NavDropdown.Item>
                        <NavDropdown.Item href="/new-filtering-algorithm">New filtering algorithm</NavDropdown.Item>

                    </NavDropdown>
                    
                    <NavDropdown title="Test pages" id="navbarScrollingDropdown" collapseonselect="true">
                        <NavDropdown.Item href="/test-page">Page 1 </NavDropdown.Item>  
                        <NavDropdown.Item href="/test-page02">Page 2 </NavDropdown.Item>  
                        <NavDropdown.Item href="/test-page03">Page 3 </NavDropdown.Item>  
                        <NavDropdown.Item href="/test-page04">Page 4 </NavDropdown.Item>  
                    </NavDropdown>
                    <Nav.Link title="${lineName} Flows" href="/FlowLine">{lineName} Line</Nav.Link>
                    <Button href="http://localhost:5000/" variant="secondary">Stary Web Serwis</Button>
                    {/* <Button href="http://dark-api.ispatcee.com/" variant="secondary">Stary Web Serwis</Button>  */}
                    <Button href="/stanisz-test" variant="warning">IMPORT MES</Button>
                    <Button href="http://dark-api.ispatcee.com/ExportMESdb/1" variant="danger"> DOWNLOAD </Button>

                    {/* <Nav.Link href="#home">About</Nav.Link>
                    <Nav.Link href="#features">Options</Nav.Link>
                    <Nav.Link href="#pricing">Calculation</Nav.Link>
                    <Nav.Link href="#pricing">Flows</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown" collapseOnSelect={true}>
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#pricing">Flows</Nav.Link>
                    <Button variant="secondary">Secondary</Button>{' '}
                    <Button variant="secondary">Secondary</Button>{' '}
                    <Button variant="primary">export db3</Button> */}
                </Nav>
            </Container>
        </Navbar>
            
    );
}

export default NavigationBar;