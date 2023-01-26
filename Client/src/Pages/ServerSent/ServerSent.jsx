import React, { useState } from "react";
import useFetch from "../../Hook/useFetch"

import {Button, Card, ProgressBar, Row} from "react-bootstrap";



// import "antd/dist/antd.css";
// import { Card, Button, Progress, Row } from "antd";


function ProgressBarComponent() {
    const [fetching, setFetching] = useState(false);
    const [selectedFile, setFiles] = useState(undefined);
    const [uploadPercentage, setUploadPercentage] = useState(70);

    const [allowUpload, setAllowUpload] = useState(false);
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData();
      data.append("file", selectedFile);
      let url = "http://localhost:8080/api/import";
      const eventSource = new EventSource("http://localhost:8080/api/progress");
      let guidValue = null;
  
      eventSource.addEventListener("GUI_ID", (event) => {
        guidValue = JSON.parse(event.data);
        console.log(`Guid from server: ${guidValue}`);
        data.append("guid", guidValue);
        eventSource.addEventListener(guidValue, (event) => {
          const result = JSON.parse(event.data);
          if (uploadPercentage !== result) {
            setUploadPercentage(result);
          }
          if (result === "100") {
            eventSource.close();
          }
        });
        uploadToServer(url, data);
      });
  
      eventSource.onerror = (event) => {
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("SSE closed (" + event.target.readyState + ")");
        }
        setUploadPercentage(0);
        eventSource.close();
      };
  
      eventSource.onopen = () => {
        console.log("connection opened");
      };
    };
  
    const uploadToServer = (url, data) => {
      setFetching(true);
      console.log("Upload File");
      let currentFile = selectedFile;
      console.log(currentFile);
  
      const requestOptions = {
        method: "POST",
        mode: "no-cors",
        body: data,
      };
      fetch(url, requestOptions).then(() => setAllowUpload(false));
    };
  // percent={(uploadPercentage / 100) * 100} />
    return (
      <div>

          <br></br>
            {fetching &&

            <ProgressBar disabled animated now={uploadPercentage} label={`${uploadPercentage}%`} />
            }

          <br></br>

            {fetching &&
              (uploadPercentage / 100) * 100 !== 100 &&
              `Uploading [${(uploadPercentage / 100) * 100}/100]%`}
            {(uploadPercentage / 100) * 100 === 100 &&
              "File Uploaded Successfully"}

          <br />

            <Button type="primary submit" variant="success" disabled={allowUpload} onClick={handleSubmit}>
            IMPORT
            </Button>


      </div>
    );
}
  
export default ProgressBarComponent;

// function ServerSentPage(props) {

//     // comunication with API
//     const sendFetchRequest = useFetch()

//     const [infoMessage, setInfoMessage] = React.useState('')
//     const [MESDataDB, setMESDataDB] = React.useState(null)
    

    
//     function setDataXYZInfo(data, isPending, error){
//         if(!isPending){
//             console.log(data)
//         }
        
//     }

//     const downloadMES = React.useCallback(() => {
//         // Api request here
//         sendFetchRequest(`/importMES/import`, setMESFromApi)
//     }, []);
    
//     function setMESFromApi(data, isPending, error){
//     if(!isPending){
//         if(data.status !== "Ok"){ // some errors
//             setInfoMessage(error)
//             console.log(error)
//             setMESDataDB(data.status);
//         }
//         else{ // ok
//             setMESDataDB("Sukces! Baza MES zaktualizowana");
//         }


//     }
//     else{
//         setMESDataDB("progress...");
//     }
//     // setErrorFiltersFromApi(error) // ??
//     // setIsPendingFiltersFromApi(isPending) // ??
//     }


//     return (
//         <>
//         {/* <Button onClick={createFilter}>RUN</Button>  */}
//         <Button variant="secondary" onClick={downloadMES}>RUN</Button>
//             {/* <div className='d-grid gap-2 col-8 mx-auto'>
//                 <MultiStageSwitch
//                     title='mySwitch1'
//                     switchOptions={switchOptions}
//                     defaultOptionIndex={0}
//                     setSelectedValue={setSelectedValue}
//                 />
//             </div> */}
//         {MESDataDB &&
//             <h2>{MESDataDB}</h2>
//         } 

//         </>
//     );
// }

// export default ServerSentPage;