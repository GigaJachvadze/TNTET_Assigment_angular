import { Component, Input, OnInit } from '@angular/core';
import { Subscription, merge } from 'rxjs';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { WeatherService } from 'src/app/services/weather.service';
import { speedUnit, tempUnit, weatherUnit } from 'src/app/types/types';
import { isUnit } from 'src/app/helpers/helper';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getTempUnit(weatherUnit: weatherUnit): tempUnit {
    switch (weatherUnit) {
      case "standard":
          return "°K";
      case "metric":
          return "°C";
      case "imperial":
          return "°F";
    }
  }

  getSpeedUnit(weatherUnit: weatherUnit): speedUnit {
    switch (weatherUnit) {
      case "standard":
        return "m/s";
      case "metric":
        return "m/s";
      case "imperial":
        return "ft/s";
    }
  }
}
