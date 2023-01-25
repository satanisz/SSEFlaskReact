export default function validateCalculationData(filterTitle, linesData) {
    console.log('Validation')
    let errors = []

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
    for (let i = 0 ; i < linesData.length ; i++){
        if(linesData[i].calculationType === ''){

            errors.push(`Error in step ${i+1}... Cannot create a calculation with unspecified action.`)

        }else if(linesData[i].calculationType === 'deallocation'){
            
            let tmpErrors = validateDeallocationForm(linesData[i].data)
            if(tmpErrors.length > 0){
                errors.push(`Error in step ${i+1}... ${[...tmpErrors]}`)
            }
            
        }else if(linesData[i].calculationType === 'allocation' || linesData[i].calculationType === 'reallocation'){
            let tmpErrors = validateAllocationReallocationForm(linesData[i].data)
            if(tmpErrors.length > 0){
                errors.push(`Error in step ${i+1}... ${[...tmpErrors]}`)
            }            
        }else{
            errors.push(`Error in step ${i+1}... Invalid action type!`)
        }
    }
    return(errors);
}


function validateAllocationReallocationForm(data){
    let errors = []
    if(data.demand === null || data.demand===''){
        errors.push('[Insert demand value]  ')
    }
    
    if(data.limes === null){
        errors.push('[Select limes]  ')
    }
    
    if(data.flow === null){
        errors.push('[Select flow]  ')
    }

    if (data.filteringAlgorithmId === null){
        errors.push('[Select filtering algorithm]  ')
    }
    
    if (data.allocationAlgorithmId === null){
        errors.push('[Select allocation algorithm]  ')
    }
    
    if(data.useSpecialOrder){
        if( !('specialOrderDemand' in data) || data.specialOrderDemand === ''){
            errors.push('[Insert special order demand value or turn off special order functionality]  ')
        }
        if( !('specialOrderId' in data) || data.specialOrderId === null){
            errors.push('[Select special order or turn off special order functionality]  ')
        }
    }

    return errors
}

function validateDeallocationForm(data){
    let errors = []
    if (data.filteringAlgorithmId === null){
        errors.push('[Select filtering algorithm]  ')
    }
    if (data.allocationAlgorithmId === null){
        errors.push('[Select allocation algorithm]  ')
    }
    return errors
}
