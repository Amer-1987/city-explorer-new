import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      displayName: '',
      mapStatus: false,
      showError: false,
      key: "",
      locationName: "",
      weatherArr: [],
      high_temp: '',
      low_temp: '',
      date : '',
      description : '',
      cityName2 : '',
    }
  }


  getData = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    const key =process.env.REACT_APP_KEY;

    // const key ='pk.44ab8341906230c69765e9a868cfc4d6';
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`;


    try {
      let respResult = await axios.get(URL);
      // console.log(respResult.data);
      this.setState({
        lat: respResult.data[0].lat,
        lon: respResult.data[0].lon,
        displayName: respResult.data[0].display_name,
        mapStatus: true,
        cityName2 : cityName,
      })
    }
    catch {
      console.log('error');
      this.setState({
        showError: true,
      })
    }
    this.getWeather();
  }

  getWeather = async (event) => { // function of get weather from own server
    // event.preventDefault();
    // let cityName = event.target.cityName.value;
    const serverRoute = process.env.REACT_APP_SERVER;
    // console.log(cityName);
    console.log(serverRoute);


    // 
    const url = `${serverRoute}/weather?city=${this.state.cityName2}&lat=${this.state.lat}&lon=${this.state.lon}`;
    // const url = `${serverRoute}/weather?city_name=Amman`;
    // const url = `${serverRoute}/weather`;

    console.log(url);
    try {

      const result = await axios.get(url);

      // console.log(result.data.data[2].high_temp);
      // console.log(result.data.data[2].low_temp);


      console.log(result.data);
      this.setState({
        locationName: result.data.city_name,
        lat: result.data.lat,
        lon: result.data.lon,
        high_temp: result.data.data[2].high_temp,
        low_temp: result.data.data[2].low_temp,
        date : result.data.data[2].datetime,
        description : result.data.data[2].weather.description,

      })

    }

    catch {
      console.log('error 2');
      this.setState({
        showError: true,
      })
    }
  }


  render() {
    return (
      <>
        <h1>Location App </h1>
        <Form onSubmit={this.getData} >
          <Form.Group className="mb-3" controlId="horned">
            <Form.Label>Where Would you like to explore?</Form.Label>


            <Form.Control type='text' name='cityName' placeholder="Name of The city" />
            <Button variant="primary" type='submit'> Explore
            </Button>

          </Form.Group>
        </Form>

        <h1>Welcome to {this.state.displayName}</h1>
        <h5>{this.state.displayName}  is located at {this.state.lat} by {this.state.lon}</h5>




        {this.state.mapStatus && <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.lat},${this.state.lon}&zoom=<zoom>&size=<width>x<height>&format=JSON&maptype=<MapType>&markers=icon:<icon>|${this.state.lat},${this.state.lon}&markers=icon:<icon>|${this.state.lat},${this.state.lon}`} alt=""/>}

        {this.state.showError && <p>Error, sorry for that</p>}

        <p className='temp'>
          {this.state.locationName}
          <br />
          "description of weather": 
          <br/>
           Low of tempreture : 
           {this.state.low_temp} C
           <br/>
            high of tempreture : {this.state.high_temp} C
          <br />

          with {this.state.description} ,
          <br />
          "date": {this.state.date}
        </p>
      </>
    )
  }
}


export default App;

