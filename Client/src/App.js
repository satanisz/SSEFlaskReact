import React from 'react';
import { Routes, Route } from 'react-router-dom'
import NavigationBar from './Components/NavigationBar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import NewFilter from './Pages/NewFilter/NewFilter'
import NewFilteringAlgorithm from './Pages/NewFilteringAlgorithm/NewFilteringAlgorithm';
import Filters from './Pages/Filters/Filters';
import TestPage from './Pages/TestPage/TestPage';
import FilteringAlgorithms from './Pages/FilteringAlgorithms/FilteringAlgorithms';
import UpdateFilteringAlgorithm from './Pages/FilteringAlgorithms/UpdateFilteringAlgorithm';
import UpdateFilter from './Pages/UpdateFilter/UpdateFilter';
import Calculation from './Pages/Calculation/Calculation';

import FlowLine from './Pages/Flows/FlowLine';


import LineInfo from './Components/LineInfo';
import { Container } from 'react-bootstrap';
import UpdateCalculation from './Pages/UpdateCalculation/UpdateCalculation';
import Calculations from './Pages/Calculations/Calculations';
import TestPage02 from './Pages/TestPage02/TestPage02';
import TestPage03 from './Pages/TestPage03/TestPage03';
import TestPage04 from './Pages/TestPage04/TestPage04';
import StaniszTest from './Pages/StaniszTest/StaniszTest';
import "./style.css"

function App(props) {
    return (
        <div>
            <NavigationBar/>
                <Container className='bg-light border border-1 py-3 mb-3 rounded-3' >
                    <Routes>
                    
                        <Route path='/' element={<LineInfo><Home/></LineInfo>} />
                        <Route path='/about' element={<LineInfo><About/></LineInfo>} />
                        <Route path='/new-filter' element={<LineInfo><NewFilter/></LineInfo>} />
                        <Route path='/filters' element={<LineInfo><Filters/></LineInfo>} />
                        <Route path='/new-filtering-algorithm' element={<LineInfo><NewFilteringAlgorithm/></LineInfo>} />
                        <Route path='/filtering-algorithms' element={<LineInfo><FilteringAlgorithms/></LineInfo>} />
                        <Route path='/filtering-algorithm/update/:id' element={<LineInfo><UpdateFilteringAlgorithm/></LineInfo>} />
                        <Route path='/filter/update/:filterId' element={<LineInfo><UpdateFilter/></LineInfo>} />
                        <Route path='/calculation' element={<LineInfo><Calculation/></LineInfo>} />
                        <Route path='/calculations' element={<LineInfo><Calculations/></LineInfo>} />
                        <Route path='/calculation/update/:calculationId' element={<LineInfo><UpdateCalculation/></LineInfo>} />

                        {/* FLOWS  */}
                        <Route path='/flowLine' element={<LineInfo><FlowLine/></LineInfo>} />
                        {/* <Route path='/calculation/:line' element={<Calculation/>} /> */}

                        {/* ************************* TEST PAGES *************************** */}
                        <Route path='/test-page' element={<TestPage/>} />
                        <Route path='/test-page02' element={<TestPage02/>} />
                        <Route path='/test-page03' element={<TestPage03/>} />
                        <Route path='/test-page04' element={<TestPage04/>} />
                        <Route path='/stanisz-test' element={<StaniszTest/>} />

                    </Routes>
                </Container>
        </div>
    );
}

export default App;