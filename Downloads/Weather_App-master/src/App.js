import React from "react";
import "./App.css";
import Form from "./app_component/form.component";
import Weather from "./app_component/weather.component";
// import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/erikflowers/weather-icons
import "weather-icons/css/weather-icons.css";

const Api_Key = "7d042f9a7907467d9aae9389c8b75c63";
//use https://home.openweathermap.org/ , a free weather api

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_feels_like:null,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
      input: true,
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  //absolute zero is taken as −273.15 degrees on the Celsius scale (International System of Units), which equals −459.67 degrees on the Fahrenheit scale (United States customary units or Imperial units).

  getWeather = async (e) => {
    e.preventDefault();
    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
    if (country && city) {
      try {
        await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
        ).then((res) => {
          console.log(res); //
          if (res.ok) {
            const response = res.json();
            this.setState({
              input: true,
            });
            // console.log(response)//promise//pending
            // console.log(response.name)//undefined
            response.then((res2) => {
              console.log(res2);
              console.log(res2.weather[0].description.charAt(0));
              this.setState({
                city: `${res2.name}, ${res2.sys.country}`,
                country: res2.sys.country,
                main: res2.weather[0].main,
                celsius: this.calCelsius(res2.main.temp),
                temp_max: this.calCelsius(res2.main.temp_max),
                temp_min: this.calCelsius(res2.main.temp_min),
                feels_like: this.calCelsius(res2.main.feels_like),
                description: res2.weather[0].description,
                error: false,
              });
              // setting icons
              this.get_WeatherIcon(this.weatherIcon, res2.weather[0].id);
              //response.weather[0].id is 'rangeId'
            });
          }
        });
      } catch (err) {
        console.log("dada" + err); //为什么打不出来error？
        this.setState({
          error: true,
        });

        //   // The request was made and the server responded with a status code
        //   // that falls out of the range of 2xx
        //   console.error('Failed with response', err.response.data)
        // } else if (err.request) {
        //   // The request was made but no response was received
        //   console.error('Failed request', err)
        // } else {
        //   // Something happened in setting up the request that triggered an Error
        //   console.error('Failed in general', err)
        // }
      }
    } else {
      this.setState({
        input: false,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        {/* <Weather {...this.state}/>这种写法可以替代下面的写法但是名字不能变，右边是啥，被组建调用的时候就用啥 */}
        <Weather 
    cityname={this.state.city}
weatherIcon={this.state.icon}
temp_celsius={this.state.celsius}
temp_max={this.state.temp_max}
temp_min={this.state.temp_min}
temp_feels_like={this.state.feels_like}//注意！！！这是来自于你设置的，不是来自api的response
description={this.state.description}
error={this.state.error}
input={this.state.input}
/> 
      </div>
    );
  }
}

export default App;
