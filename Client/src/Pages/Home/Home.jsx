import React from 'react';
import amp_dark_logo from '../../Assets/Images/amp_dark_logo.jpg';

function Home(props) {


    return (
        <>
            <div class = "container">
                <div class="row">
                    <div class="col-4">
                    <div class="col">
                    <h4 class="text-dark text-end fw-bold">DARK HOME PAGE</h4>
                    <br></br>
                    <br></br>
                        <div>
                            <h2 class="text-muted text-left fst-italic"><u>D</u>eallokacja</h2>
                            <h2 class="text-muted text-left fst-italic"><u>A</u>lokacja</h2>
                            <h2 class="text-muted text-left fst-italic"><u>R</u>ealokacja</h2>
                            <h2 class="text-muted text-left fst-italic"><u>K</u>regow</h2>
                        </div>
                    <br></br>
                    <br></br>
                    </div>
                    </div>

                    <div class = "col align-self-end">
                        <div class="col align-self-end order-last">
                            <img class="figure-img img-fluid rounded px-3" src={amp_dark_logo} alt="DARK Logo" title="SIC FABRICATIO CREATUS EST" height="500" width="600"/>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Home;