import React from 'react';
import FormRow from './FormRow';

function MainForm(props) {

    const [formRows, setFormRows] = React.useState(null)

    React.useEffect(()=>{

        setFormRows(props.data.map((element, index)=>{
            return(
            <>
                <FormRow
                    rowData={element}
                    index = {index}
                    updateValueVer1={updateValueVer1}
                    updateValueVer2={updateValueVer2}
                />
            </>
)
        }))

    },[props.data]) // we should render the form every time a value changes

    function updateValueVer1(value, key, id){
        console.log(value)
        props.setData(prevData=>{
            let newData = prevData.map((element)=>{
                if (element.id === id) {
                    return {
                      ...element,
                      [key]: value
                    };
                  }
                  return element;
            })
            return (newData)
        })
    }

    function updateValueVer2(event, key, id){
        console.log(`Set ${key} ${event.target.value} to element with id ${id}`)
        props.setData(prevData=>{
            let newData = prevData.map((element)=>{
                if (element.id === id) {
                    return {
                      ...element,
                      [key]: event.target.value
                    };
                  }
                  return element;
            })
            return (newData)
        })
    }


    return (
        <div>
            {formRows && 
                formRows
            }
        </div>
    );
}

export default MainForm;