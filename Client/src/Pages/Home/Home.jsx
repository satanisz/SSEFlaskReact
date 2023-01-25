import React from 'react';
import amp_dark_logo from '../../Assets/Images/Deathly_Hallows_Sign_White.png';

function Home(props) {


    return (
        <>
            <div class = "container">
                <div class="row">
                    <div class="col-4">
                    <div class="col">
                    <h4 class="text-dark text-end fw-bold">HELLO WORD!</h4>
                    <br></br>
                    <br></br>
                        <div>
                            <h2 class="text-muted text-left fst-italic">H</h2>
                            <h2 class="text-muted text-left fst-italic">E</h2>
                            <h2 class="text-muted text-left fst-italic">L</h2>
                            <h2 class="text-muted text-left fst-italic">L</h2>
                            <h2 class="text-muted text-left fst-italic">O</h2>
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