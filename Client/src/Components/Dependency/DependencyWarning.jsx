import React from 'react';
import { Button, Row, Col} from 'react-bootstrap';

function DependencyWarning(props) {

    const [filters, setFilters] = React.useState(null)
    const [filteringAlgorithms, setFilteringAlgorithms] = React.useState(null)
    const [calculations, setCalculations] = React.useState(null)
    const [nextRoundFilteringAlgorithms, setNextRoundFilteringAlgorithms] = React.useState(null)
    const [nextRoundCalculations, setNextRoundCalculations] = React.useState(null)

    
    React.useEffect(()=>{
        if(props.dependencies.filters && props.dependencies.filters.length > 0){
            setFilters(props.dependencies.filters.map(element=>{
                return (<> [<b>{element.title}</b>] </>)
            }))
        }
        if(props.dependencies.filteringAlgorithms && props.dependencies.filteringAlgorithms.length > 0){
            setFilteringAlgorithms(props.dependencies.filteringAlgorithms.map(element=>{
                return (<> [<b>{element.title}</b>] </>)
            }))
        }
        if(props.dependencies.calculations && props.dependencies.calculations.length > 0){
            setCalculations(props.dependencies.calculations.map(element=>{
                return (<> [<b>{element.title}</b>] </>)
            }))
        }
        if(props.dependencies.nextRoundFilteringAlgorithms && props.dependencies.nextRoundFilteringAlgorithms.length > 0){
            setNextRoundFilteringAlgorithms(props.dependencies.nextRoundFilteringAlgorithms.map(element=>{
                return (<> [<b>{element.title}</b>] </>)
            }))
        }
        if(props.dependencies.nextRoundCalculations && props.dependencies.nextRoundCalculations.length > 0){
            setNextRoundCalculations(props.dependencies.nextRoundCalculations.map(element=>{
                return (<> [<b>{element.title}</b>] </>)
            }))
        }
    },[])


    // *************************************************************************************** //
    
    return (
        <div>
            <div style={{ paddingBottom: '12px' }}>
                <h4>Editing this element will directly affect the following objects:</h4>
            </div>
            {filters && 
                <>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <h5>Filters</h5>
                        </Col>
                        <Col>
                            {filters}
                        </Col>
                    </Row>
                </>
            }

            {filteringAlgorithms && 
                <>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <h5>Filtering algorithms</h5>
                        </Col>
                        <Col>
                            {filteringAlgorithms}
                        </Col>
                    </Row>
                </>
            }
            
            {calculations && 
                <>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <h5>Calculations</h5>
                        </Col>
                        <Col>
                            {calculations}
                        </Col>
                    </Row>
                </>
            }
            
            {(nextRoundFilteringAlgorithms || nextRoundCalculations) &&
                <div style={{ paddingBottom: '12px', paddingTop: '12px' }}>
                    <h4>____________________________________________________<br></br>
                    Please note that these changes will affect other elements that are not directly related
                    to the base element. Here is a list of elements that will be modified indirectly.
                    </h4>
                </div>
            }

            {nextRoundFilteringAlgorithms && 
                <>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <h5>nextRoundFilteringAlgorithms</h5>
                        </Col>
                        <Col>
                            {nextRoundFilteringAlgorithms}
                        </Col>
                    </Row>
                </>
            }

            {nextRoundCalculations && 
                <>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <h5>nextRoundCalculations</h5>
                        </Col>
                        <Col>
                            {nextRoundCalculations}
                        </Col>
                    </Row>
                </>
            }

            <div style={{paddingTop: '20px' }}>
                <h4>
                    Are you sure you want to continue?
                </h4>
            </div>
            <Row className='mt-3'>
            <Col sm={1}><Button variant="danger" onClick={props.leftButtonFunction}>{props.leftButtonText}</Button></Col>
            <Col sm={1}><Button onClick={props.rightButtonFunction}>{props.rightButtonText}</Button></Col>
            </Row>
        </div>
    );
}

export default DependencyWarning;