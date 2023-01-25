
import React from "react";

import { Button } from 'react-bootstrap';
// import { Chart } from "react-chartjs-2";
// import PieChart from "../../Components/PieChart";
import "./styles.css";
//import { Pie } from "react-chartjs-2";
//import { Bar } from "react-chartjs-2";
//import { Line } from "react-chartjs-2";
// import LineChart from "../../Components/LineChart";
import BarChart from "../../Components/BarChart";
import Popup from "./Popup";

import MainForm from './MainForm';
import initFlowData from "./flow_data";

import { v4 } from 'uuid';
import { initDataChart } from "./initData";

import useFetch from '../../Hook/useFetch';
import usePut from '../../Hook/usePut';
import BigMessageCard from "../../Components/BigMessageCard";

function FlowLine() {

  const lineName = JSON.parse(localStorage.getItem('currentLine'))

  const [filters, setFilters] = React.useState(null)
  const [errorFiltersFromApi, setErrorFiltersFromApi] = React.useState(null)
  const [isPendingFiltersFromApi, setIsPendingFiltersFromApi] = React.useState(true)
  const [rerender, setRerender] = React.useState(false)
  const [infoMessage, setInfoMessage] = React.useState('')

  const [errorValidation, setErrorValidation] = React.useState(null)
  // comunication with API
  const sendGetRequest = useFetch()
  const sendPutRequest = usePut()

  const [flowDataDB, setFlowDataDB] = React.useState(null)
  const [flowData, setFlowData] = React.useState(null)

  const myRef = React.useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView()  


  // prepare data for object
  React.useEffect(()=>{
    sendGetRequest(`/flows/${lineName}`, setFlowFromApi)
    // if(flowDataDB == null){
    //   sendGetRequest(`/flows/${lineName}`, setFlowFromApi)
    // }
  },[])

  function setFlowFromApi(data, isPending, error){
    if(!isPending){
        if(error !== null || data.status !== "Ok"){
          setInfoMessage(error)
        }
        setFlowDataDB(data.data);
    }
    // setErrorFiltersFromApi(error) // ??
    // setIsPendingFiltersFromApi(isPending) // ??
  }


  // function putFlowToApi(data, isPending, error){
  //   if(!flowData){
      
  //   }
  //   // setErrorFiltersFromApi(error) // ??
  //   // setIsPendingFiltersFromApi(isPending) // ??
  // }




  // prepare data for object 
  React.useEffect(()=>{
    if(flowDataDB !== null){
      setFlowData(flowDataDB.map(element=>{    //iterate throught all elements from data and add id for each json object
            return {...element, id:v4()}
        }))      
    }

  },[flowDataDB])



  // --------------------------------------------------------
  const [isOpen, setIsOpen] = React.useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  // ############ SAVE  TO DB
  function saveRequestsFlow(){
    if(validateData()){
        submitToApi()
    }else{
        executeScroll()
    }
  }

  function validateData(){ 
    let errors = false //validateCalculationData(calculationTitle, calculationFormData)
    setErrorValidation(errors)
    if (errors){
        return false
    }            
    return true 
  }

  function submitToApi(){
    let flowToSend = getDataToSend()
    sendPutRequest(`/flows/${lineName}`, flowToSend, setPutInfo)
  }

  function getDataToSend(){
    //console.log(props.lineName)
    return JSON.stringify({
        // content: calculationFormData,
        // title: calculationTitle,
        // ownerId: 1,
        // line: props.lineName
        data: flowData
    })
  }

  // const saveRequestsFlow = React.useCallback(() => {
  //   // Api request here
  //   // if(flowData && flowDataDB){
  //     let flowToSend = getDataToSend()
  //     //JSON.stringify(flowData)
  //     sendPutRequest(`/flows/${lineName}`, flowToSend, setPutInfo)  
  // }, []);

  function getDataToSend(){
    if (flowData != null) {
      const flowToSend = flowData;
      const x = userData;
      const y = flowDataDB
      // dataToSend.content = linesData
      // dataToSend.title = filterTitle
      // dataToSend.filterType = filterType
      // dataToSend.ownerId = 1
      return JSON.stringify(flowToSend)
    }
    
  }
  // const getDataToSend = () => 


  function setPutInfo(response, isPending, error){   
    if(error === null && !isPending)
    {   
        // setInfoMessage("Filter has been updated successfully")
        // setContentToDisplay('info-card')
        // setTimeout(()=>{
        //     navigate('/filters')
        // }, 3000)
    }
    if(isPending){
        // setContentToDisplay('updating')
    }
    if(error){
        // setInfoMessage(error)
        // setContentToDisplay('info-card')
    }
  }


  // function setPutInfo(response, isPending, error){   
  //   if(error === null && !isPending)
  //   {   
  //       setInfoMessage("Filter has been updated successfully")
  //       setContentToDisplay('info-card')
  //       setTimeout(()=>{
  //           navigate('/filters')
  //       }, 3000)
  //   }
  //   if(isPending){
  //       setContentToDisplay('updating')
  //   }
  //   if(error){
  //       setInfoMessage(error)
  //       setContentToDisplay('info-card')
  //   }
  // }


  // ############ Update from DB
  // ################################
  const [isSending, setIsSending] = React.useState(false)
  const isMounted = React.useRef(true)

  // set isMounted to false when we unmount the component
  const restartRequestFlow = React.useCallback(() => {
        // Api request here
        sendGetRequest(`/flows/${lineName}`, setFlowFromApi)
  }, []);

  const importRequestFlow = React.useCallback(() => {
    // Api request here
    sendGetRequest(`/flows/${lineName}/import`, setFlowFromApi)
}, []);
  // ############################
  // ############################
    
  const [userData, setUserData] = React.useState({
    labels: initDataChart.map((data) => data.flowName),
    datasets: [
      {
        label: "interval",
        data: initDataChart.map((data) => [Math.max(0, data.valueMin), Math.max(0, data.valueTgt)]),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderSkipped: false,
        order: 0,
        stack: "range"
      },
      {
        label: "interval",
        data: initDataChart.map((data) => [0, Math.max(0,  data.valueTgt, data.valueMax) - Math.max(0, data.valueTgt)]),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderSkipped: false,
        order: 0,
        stack: "range"
      },
      {
        label: "Zaalokowane",
        data: initDataChart.map((data) => data.quantity),
        borderColor: 'rgba(54, 162, 235, 1.0)',
        backgroundColor: 'rgba(54, 162, 235, 1.0)',
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 15,
        type: 'line',
        fill: false,
        borderWidth: 0,
        order: 1,
        stack: "quantity1"
      },
      {
        label: "Model Dealokacja",
        data: initDataChart.map((data) => data.valueDealo),
        borderColor: 'rgba(250, 70, 70, 1.0)',
        backgroundColor: 'rgba(250, 70, 70, 1.0)',
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 15,
        type: 'line',
        fill: false,
        borderWidth: 0,
        order: 1,
        stack: "quantity2"
      },
      {
        label: "Model Alokacja",
        data: initDataChart.map((data) => data.valueAlo),
        borderColor: 'rgba(0, 255, 128, 1.0)',
        backgroundColor: 'rgba(0, 255, 128, 1.0)',
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 15,
        type: 'line',
        fill: false,
        borderWidth: 0,
        order: 1,
        stack: "quantity3"
      },

    ]
  })

  React.useEffect(()=>{
    if(flowDataDB !== null){
      setUserData({
        labels: flowData.map((data) => data.flowName),
        datasets: [
          {
            label: "interval",
            data: flowData.map((data) => [Math.max(0, data.valueMin), Math.max(0, data.valueTgt)]),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            borderSkipped: false,
            order: 0,
            stack: "range"
          },
          {
            label: "interval",
            data: flowData.map((data) => [0, Math.max(0,  data.valueTgt, data.valueMax) - Math.max(0, data.valueTgt)]),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            borderSkipped: false,
            order: 0,
            stack: "range"
          },
          {
            label: "Zaalokowane",
            data: flowData.map((data) => data.quantity),
            borderColor: 'rgba(54, 162, 235, 1.0)',
            backgroundColor: 'rgba(54, 162, 235, 1.0)',
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 15,
            type: 'line',
            fill: false,
            borderWidth: 0,
            order: 1,
            stack: "quantity1"
          },
          {
            label: "Model Dealokacja",
            data: flowData.map((data) => data.valueDealo),
            borderColor: 'rgba(250, 70, 70, 1.0)',
            backgroundColor: 'rgba(250, 70, 70, 1.0)',
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 15,
            type: 'line',
            fill: false,
            borderWidth: 0,
            order: 1,
            stack: "quantity2"
          },
          {
            label: "Model Alokacja",
            data: flowData.map((data) => data.valueAlo),
            borderColor: 'rgba(0, 255, 128, 1.0)',
            backgroundColor: 'rgba(0, 255, 128, 1.0)',
            pointStyle: 'circle',
            pointRadius: 8,
            pointHoverRadius: 15,
            type: 'line',
            fill: false,
            borderWidth: 0,
            order: 1,
            stack: "quantity3"
          },

        ]
      })
    }

  },[flowData])







  return (
    <>
      {/* <BigMessageCard message={infoMessage}/> */}
      <h1>{infoMessage}</h1>

      <div>
          {/* render element only when data isn't null */}
          {flowData &&
              <>
                  <h2>{lineName} FLOWS:</h2>
                  <MainForm
                      data={flowData}
                      setData={setFlowData}
                  />
              </>
          }
      </div>
      <Button variant="outline-dark" onClick={saveRequestsFlow}>SAVE</Button> 
      <Button variant="outline-dark" onClick={restartRequestFlow}>LOAD</Button>
      <Button variant="outline-dark"onClick={importRequestFlow}>IMPORT</Button> 

      {/*******************************************/}
      <div className="MyChart">
        <div style={{ height:500 }}>
        <BarChart chartData={userData} />
        </div>
      </div>        
    </>

  );
}

export default FlowLine;
