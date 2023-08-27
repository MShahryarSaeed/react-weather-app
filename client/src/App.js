import './App.css';
import React, { useEffect, useState } from "react"; 
import CardExampleCard from './components/Weathers';
import { Dimmer ,Loader } from 'semantic-ui-react';

function App() {


  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const[data,setData]=useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
    
      navigator.geolocation.getCurrentPosition((position)=>{
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      console.log("lat :"+lat);
    

      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${'3ce007d4109c5170b0e2be2fd9396285'}`)
      .then(res => res.json())
      .then(result=>{
        setData(result);
        console.log(result);
      })
    }
   
    fetchData();

  },[lat,long]);

  return (
    <div className="App-header">
      {(typeof data.main != 'undefined') ? (
        <CardExampleCard weatherData={data}/>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
      
    </div>
  );
}

export default App;