import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import './App.css';
 console.log(555);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon: '',
      displayName: '',
      mapStatus: false,
      showError: false,
      key:""
    }
  }


  getData = async (event) => {
    event.preventDefault();
    let cityName = event.target.cityName.value;
    const key =process.env.REACT_APP_KEY;

    // const key ='pk.44ab8341906230c69765e9a868cfc4d6';
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`;

    console.log(key);
    
    try {
      let respResult = await axios.get(URL);
      console.log(respResult);
      this.setState({
        lat: respResult.data[0].lat,
        lon: respResult.data[0].lon,
        displayName: respResult.data[0].display_name,
        mapStatus: true,
      })
    }
    catch {
      console.log('error');
      this.setState({
        showError: true,
      })
    }
  }

  render() {
    return (
      <>
        <h1>Location App </h1>
        <Form onSubmit={this.getData}>
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

      </>
    )
  }
}


export default App;

