import React from 'react';
import {useNavigate} from 'react-router-dom'

const usePost = () =>{

    const navigate = useNavigate()

    function sendPostRequest(url, data, action, redirect){
        action(null, true, null)
        fetch("http://localhost:5000/api" + url,{
            method:'POST',
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

    return sendPostRequest
    
}

export default usePost