import React from 'react';
import './style.css'
import PreviewElement from './PreviewElement';

function FilterConditionsPreview(props) {
    

    function generateUndefinedPreview(isLineActive){
        return(<PreviewElement
            text="--UNDEFINED--" 
            style="preview---undefined"
            isLineActive={isLineActive}
            fontSize = {props.fontSize}
        />)
    }

    function generateOpeningBraketsPreview(row, isLineActive)
    {
        let text = ""
        for(let i = 0 ; i < row.numberOfOpeningBrackets ; i++)
        {
            text += " ( "
        } 
        return(<PreviewElement
            text={text}
            style="preview---bracket"
            isLineActive={isLineActive}
            fontSize = {props.fontSize}
        />)

    }


    function generateNewConditionPreview(row, isLineActive){
        let text = ""
        if('lineObject' in row){
            if(
                'attributeName' in row.lineObject && row.lineObject.attributeName !== '' &&
                'operator' in row.lineObject  && row.lineObject.operator !== '' &&
                'value' in row.lineObject &&  row.lineObject.value !== ''
            ){
                
                text = row.lineObject.attributeName + " " + row.lineObject.operator + " " + row.lineObject.value + " "
                return(<PreviewElement
                    text={text}
                    isLineActive={isLineActive}
                    fontSize = {props.fontSize}
                />)
    
            }
            else{
                return generateUndefinedPreview(isLineActive)
            }            
        }
        
    }

    function generateExistingFilterPreview(row, isLineActive){
        let text = ""
        if('lineObject' in row){
            if('id' in row.lineObject && row.lineObject.id !== -1 &&
                'filterTitle' in row.lineObject && row.lineObject.filterTitle !== '')
            {   
                row.lineObject.isNegated ? text = "!" + "'" + row.lineObject.filterTitle + "'" : text = "'" + row.lineObject.filterTitle + "'"
                
                return(<PreviewElement
                    text={text}
                    style="preview---existing-filter"
                    isLineActive={isLineActive}
                    fontSize = {props.fontSize}
                />)
            }
            else
            {
                return generateUndefinedPreview(isLineActive)
            }
        }

    }

    function generateNoLineObjectPreview(row, isLineActive){
        return(<PreviewElement
            text="--ERROR--" 
            style="preview---undefined"
            isLineActive={isLineActive}
            fontSize = {props.fontSize}
        />)
    }
    
    function generateClosingBraketsPreview(row, isLineActive){
        let text = ""
        for(let i = 0 ; i < row.numberOfClosingBrackets ; i++)
        {
            text += " ) "
        } 
        return(<PreviewElement
            text={text}
            style="preview---bracket"
            isLineActive={isLineActive}
            fontSize = {props.fontSize}
        />)
    }

    function generateLogicalOperaterPreview(row, isLineActive){
        let text = ""
        row.isAnd ? text=" AND " : text=" OR "
        return(<PreviewElement
            text={text}
            style="preview---logical-operator"
            isLineActive={isLineActive}
            fontSize = {props.fontSize}
        />)
    }




    const [dataToDisplay, setDataToDisplay] = React.useState([])
    
    React.useEffect(()=>{
        
        const display = props.filterRows.map(row=>{
        
            const data = []
            //**************** is line active *****************/ 
            let isLineActive = false
            if(row.id === props.activeLine){
                isLineActive = true    
            }
            //*********************************************** */
            
            data.push(generateOpeningBraketsPreview(row, isLineActive))
            if(row.isLineObjectExist){
                if(row.isNewCondition){
                    data.push(generateNewConditionPreview(row, isLineActive))
                }
                else{
                    data.push(generateExistingFilterPreview(row, isLineActive))
                }
            }
            else{
                data.push(generateNoLineObjectPreview(row, isLineActive))
            }

            data.push(generateClosingBraketsPreview(row, isLineActive))
            
            
            
            if(row.isLogicalOperatorExist){
                data.push(generateLogicalOperaterPreview(row, isLineActive))
            }
    
            return data
        })
        setDataToDisplay(display)
    }, [props])
   
    
    return (
        <div className='content-container'>
            {dataToDisplay}
        </div>
    );
}

export default FilterConditionsPreview;