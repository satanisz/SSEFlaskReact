import React from 'react';
import Select from 'react-select'
import {Row} from 'react-bootstrap'


function LineContent(props) {
    

    const attributes = props.attributes.map(attribute=>{
        return({"value":attribute.id, "label":attribute.title})
    })

    function test(selectedOption){
        console.log("CHANGED!!!" + props.id)
        
        let newFilterData = [...props.filterData]
        for(let i = 0 ; i < newFilterData.length ; i++){
            if(newFilterData[i].id === props.id)
            {
                newFilterData[i].idOfSelectedOption = selectedOption.value 
            }
        }
        props.setFilterData(newFilterData)
        // filterData={props.filterData}
        // setFilterData={props.setFilterData}
        
    }

    const [selectedOption, setSelectedOption] = React.useState(null)

    React.useEffect(()=>{
        setSelectedOption(()=>{
            let selectionId;
            let option = null;
            for(let i = 0 ; i < props.filterData.length ; i++){
                if(props.filterData[i].id === props.id)
                {
                    selectionId = props.filterData[i].idOfSelectedOption
                }
            }
            for (let i = 0 ; i < attributes.length ; i++){
                if (selectionId == attributes[i].value)
                {
                    option = attributes[i]
                }
            }
            return option
        })
    },[props])


    return (
        <Row className='line'>
            <Select 
            options={attributes} 
            name="attribute"
            onChange={test}
            value={selectedOption}
            />
            {/* {props.id} */}
        </Row>
    );
}

export default LineContent;