import React from 'react';

function validateAlgorithmData(filteringAlgorithmFormData) {
    let errors = []
    // title:filteringAlgorithmFormData.title,
    // ownerId:filteringAlgorithmFormData.ownerId,
    // orderFilters:filteringAlgorithmFormData.ordFilterData,
    // isOrderAnd:filteringAlgorithmFormData.isOrdAnd,
    // materialFilters: filteringAlgorithmFormData.matFilterData,
    // isMaterialAnd:filteringAlgorithmFormData.isMatAnd
    if(filteringAlgorithmFormData.title.length > 60){
        errors.push("Title is too long. The maximum length of the title is 60 characters.")
    }
    if(filteringAlgorithmFormData.title.length < 1){
        errors.push("Title is required")
    }

    // there should be error if there is any idOfSelectedOption === -1 in ordFilterData

    let tmp = filteringAlgorithmFormData.ordFilterData.find((element) => {
        console.log(element)
        return (element.idOfSelectedOption < 0)
    })
    if(tmp){
        errors.push("You cant have blanc order filter form.")
    }
    tmp = null
    tmp = filteringAlgorithmFormData.matFilterData.find((element) => {
        console.log(element)
        return (element.idOfSelectedOption < 0)
    })
    if(tmp){
        errors.push("You cant have blanc material filter form.")
    }

    return(errors);
}

export default validateAlgorithmData;