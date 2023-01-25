import React from 'react';
import { Routes, Route } from 'react-router-dom'
import NavigationBar from './Components/NavigationBar';
import Home from './Pages/Home/Home';

import LineInfo from './Components/LineInfo';
import { Container } from 'react-bootstrap';
import ServerSent from './Pages/ServerSent/ServerSent';
import "./style.css"

function App(props) {
    return (
        <div>
            <NavigationBar/>
                <Container className='bg-light border border-1 py-3 mb-3 rounded-3' >
                    <Routes>
                    
                        <Route path='/' element={<LineInfo><Home/></LineInfo>} />
                        <Route path='/server-sent' element={<ServerSent/>} />

                    </Routes>
                </Container>
        </div>
    );
}

export default App;