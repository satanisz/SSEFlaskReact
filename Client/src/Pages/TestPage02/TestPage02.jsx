import React from 'react';
import MultiStageSwitch from '../../Components/MultiStageSwitch';


function TestPage02(props) {
    
    const switchOptions = [
        { name: 'Order', value: 'order'},
        { name: 'Material', value: 'material' },
        { name: 'Special order', value: 'special-order' }
    ]
    const [selectedValue, setSelectedValue] = React.useState(null)


    return (
        <>
            <div className='d-grid gap-2 col-8 mx-auto'>
                <MultiStageSwitch
                    title='mySwitch1'
                    switchOptions={switchOptions}
                    defaultOptionIndex={0}
                    setSelectedValue={setSelectedValue}
                />
            </div>
            {selectedValue &&
                <h2>Wybrane jest {selectedValue}</h2>
            }

        </>
    );
}

export default TestPage02;