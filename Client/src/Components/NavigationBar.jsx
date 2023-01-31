import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";
import logo_small_deathly_hallow from '../Assets/Images/Deathly_Hallows_Sign.png';
import "../style.css";

function NavigationBar(props) {
    

    return (
        
        <Navbar bg="secondary" variant="secondary" className="myNavbar mb-4">
            <Container>
                <Navbar.Text>
                    Welcome
                </Navbar.Text>

                <Navbar.Brand href="/"><img
                            src={logo_small_deathly_hallow}
                            width="50"
                            height="40"
                            className="d-inline-block align-top"
                            alt="logo_small_deathly_hallow"
                            />
                </Navbar.Brand>
                
                <Nav className="me-auto">

                    <Button href="/server-sent" variant="success">IMPORT DB</Button>
                    <Button href="http://localhost:5000/download" variant="danger"> DOWNLOAD </Button>

                </Nav>
            </Container>
        </Navbar>
            
    );
}

export default NavigationBar;