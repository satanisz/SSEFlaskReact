import React from 'react';
import MultiStageSwitch from '../../Components/MultiStageSwitch';
import huta from '../../Assets/Images/huta.png';

function About(props) {
    
    // const switchOptions = [
    //     { name: 'Order', value: 'order'},
    //     { name: 'Material', value: 'material' },
    //     { name: 'Special order', value: 'special-order' }
    // ]
    // const [selectedValue, setSelectedValue] = React.useState(null)

//class="card-img-top"
    return (
        <>

            <div class="card">
                <div class="card-body">
                    <h1 class="text-muted fst-italic text-center">SIC FABRICATIO CREATUS EST</h1>
                </div>
                <img src={huta} alt="Logo"/> 
                <div class="card-body">
                    <h1 class="text-muted fst-italic text-center">END CREDITS:</h1>
                    <ul>
                        <li>Paweł Kempys - model and react developer</li>
                        <li>Krzysztof Rudek - flask developer</li>
                        <li>Przemyslaw Stanisz - model developer</li>
                        <li>Aleksandra Piluk - product manager</li>
                        <li>Tomasz Ciurkot - product owner</li>
                        <li>Anna Legutko - product owner and testing</li>
                        <li>Bogdan Pagacz - end user HRM</li>
                        <li>Marzena Prokopiuk - model manager</li>
                        <li>Karol Konarski - model manager</li>
                        <li>Szymon Malara - flask and model developer</li>
                    </ul>

                </div>

            </div>

        </>
    );
}

export default About;