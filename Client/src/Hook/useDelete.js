import React from 'react';

const useDelete = () =>{

    function sendDeleteRequest(url, action)
    {   // action(data, isPending, error)
        action(null, true, null)
        setTimeout(() =>{
            fetch("http://localhost:5000/api" + url,{
                method:'DELETE',
                })
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
    return sendDeleteRequest
}

export default useDelete