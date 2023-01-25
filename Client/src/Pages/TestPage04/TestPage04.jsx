import React from 'react';
import { v4 } from 'uuid';
import dataFromSomewhere from './data'
import MainForm from './MainForm';

function TestPage04(props) {
    
    const [data, setData] = React.useState(null)
    
    // prepare data for object
    React.useEffect(()=>{
        setData(dataFromSomewhere.map(element=>{    //iterate throught all elements from data and add id for each json object
            return {...element, id:v4()}
        }))
    },[])



    return (
        <div>
            {/* render element only when data isn't null */}
            {data &&
                <>
                    <h2>Main form:</h2>
                    <MainForm
                        data={data}
                        setData={setData}
                    />
                </>
            }
        </div>
    );
}

export default TestPage04;