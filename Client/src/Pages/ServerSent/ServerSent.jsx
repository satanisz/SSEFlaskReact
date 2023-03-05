import React, { useState } from "react";
import useFetch from "../../Hook/useFetch"

import {Button, Card, ProgressBar, Row} from "react-bootstrap";


function ProgressBarComponent() {

    const [uploadPercentage, setUploadPercentage] = useState(null);

    const handleSubmit = React.useCallback(() => {
      var source = new EventSource("http://localhost:5000/sse");
      source.addEventListener('message', function(e) {
        console.log(e);
        setUploadPercentage(e.data);
        if (!e.data) {
            console.log('no data in event');
            return () => {
              source.close()
            };
        }
        if (e.data === 'finished') {
            console.log('closing connection')
            source.close()
        }
        return () => {
          source.close()
        };
      });
    }, []);

    
    return (
      <div>

          <br></br>
            {uploadPercentage &&

            <ProgressBar disabled animated now={uploadPercentage} label={`${uploadPercentage}%`} />
            }

          <br></br>

            {(uploadPercentage && uploadPercentage !== 'finished') &&
              (uploadPercentage / 100) * 100 !== 100 &&
              `Uploading ${Math.round((uploadPercentage) * 100) / 100}%`}

            {uploadPercentage === 'finished' &&
              "DB MES Uploaded Successfully"}

          <br />

            {/* <Button type="primary submit" variant="success" disabled={allowUpload} onClick={handleSubmit}> */}
            <Button type="primary submit" variant="success" onClick={handleSubmit}>
            IMPORT
            </Button>

      </div>
    );
}
  
export default ProgressBarComponent;
