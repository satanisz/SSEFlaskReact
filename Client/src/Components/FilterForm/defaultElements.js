export default class DefaultElements{
    
    getDefaultElementData(){
        return {
            id:0,
            numberOfOpeningBrackets:0,
            isLineObjectExist:true,
            isNewCondition:true,
            lineObject: {},
            isLogicalOperatorExist:false,
            isAnd:true,
            numberOfClosingBrackets:0,
        }
    }
    
    getDefaultNewCondition(){
        return {
            attributeName:"",
            operator:"",
            value:"",
        }
    }
    
    getDefaultExistingFilter(){
        return{
            id:-1,
            filterTitle:"",
            isNegated: false
        }
    }
    
}

