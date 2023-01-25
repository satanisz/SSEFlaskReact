export default class DefaultElements{
    
    getDefaultDeallocationDataStructure(){
        return {
            filteringAlgorithmId: null,
            allocationAlgorithmId: null
        }
    }
    
    getDefaultAllocationReallocationDataStructure(){
        return {
            demand:null,
            limes:null,
            flow:null,
            filteringAlgorithmId:null,
            allocationAlgorithmId:null,
            useSpecialOrder: false,
        }
    }
}

