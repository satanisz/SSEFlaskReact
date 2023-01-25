import React from 'react';

function validateFilterData(filterTitle, linesData, existingFilters, attributeNames) {
    
    let errors = []
    let undefinedLine = false;
    let globalAmountOfOppeningBrackets = 0;
    let globalAmountOfClosingBrackets = 0;

    if(filterTitle.length > 60){
        errors.push("Title is too long. The maximum length of the title is 60 characters.")
    }
    if(filterTitle.length  < 1){
        errors.push("Title is required")
    }
    if (linesData.length === 0)
    {
        errors.push("Cannot create a filter without conditions")
    }

    for(let i = 0 ; i < linesData.length ; i++){
        globalAmountOfOppeningBrackets += linesData[i].numberOfOpeningBrackets;
        globalAmountOfClosingBrackets += linesData[i].numberOfClosingBrackets;
        if(!isFilterDefined(linesData[i]))
        {
            undefinedLine=true
            errors.push(`Error in line ${i+1}... [Undefined condition]`)
        }
    }

    if(globalAmountOfOppeningBrackets!==globalAmountOfClosingBrackets){
        errors.push("The brackets are set incorrectly")
    }
    return(errors);
}
export default validateFilterData;



function isFilterDefined(line)
{
    if(!line.isLineObjectExist){
        return false
    }

    if(line.isNewCondition){
        if('attributeName' in line.lineObject && line.lineObject.attributeName != '' &&
        'operator' in line.lineObject  && line.lineObject.operator != '' &&
        'value' in line.lineObject &&  line.lineObject.value != '')
        {
            return true;
        }
        else{
            return false;
        }            
    }
    else
    {
        if('id' in line.lineObject && line.lineObject.id != -1){
           return true
        }
        else{
            return false
        }
    }
}