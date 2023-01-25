import React from 'react';

const useFetch = () =>{

    function sendGetRequest(url, action)
    {   // action(data, isPending, error)
        action(null, true, null)
        setTimeout(() =>{
            fetch("http://localhost:5000/api" + url)
                .then(res => {
                    if(!res.ok){
                        throw Error("ERROR!!! Could not fetch data from the '.../" + url + "'. Unable to reach flask server.");
                    }
                    return res.json();
                })
                .then(data => {
                    action(data, false, null)
                })
                .catch(err=>{
                    action(null, false, err.message)
                })
        },1000);
    }
    return sendGetRequest
}

export default useFetch