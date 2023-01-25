import React from 'react';
import {useNavigate} from 'react-router-dom'

const usePut = () =>{

    const navigate = useNavigate()

    function sendPutRequest(url, data, action, redirect){
        action(null, true, null)
        fetch("http://localhost:5000/api" + url,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: data
            })
            .then(res => {
                if(!res.ok){
                    throw Error("ERROR!!! Could not post data to the '.../" + url + "'.   An unexpected error occurred.");
                }
                return res.json();
            })
            .then(data => {
                action(data, false, null)
                if(redirect)
                {
                    navigate(redirect)
                }
            })
            .catch(err=>{
                action(null, false, err.message)
            })
    }

    return sendPutRequest
    
}

export default usePut