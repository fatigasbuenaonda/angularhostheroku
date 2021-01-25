import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData: any;
  RUTA_CLIMA_SN = 'http://api.openweathermap.org/data/2.5/weather?lat=-33.336&lon=-60.225&appid=56d5084ad4bdaa1f6329dabe48044205';

  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true
    };
    this.getWeatherData();
    // console.log(this.WeatherData);
  }

  public getWeatherData(){
    fetch(this.RUTA_CLIMA_SN)
    .then(response => response.json())
    .then(data => {
      // console.log('Desde el fetch viene: ', data);
      this.setWeatherData(data); } );

  }

  public setWeatherData(data){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleDateString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    // console.log('IS DAY:', this.WeatherData.isDay);
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.cloudy = this.WeatherData.clouds.all;
    // console.log('Temp max y min', this.WeatherData.temp_max, this.WeatherData.temp_min);
  }

}
