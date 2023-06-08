import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Subscription, merge } from 'rxjs';
import { weatherUnit } from './types/types';
import { WeatherDataService } from './services/weather-data.service';
import { isUnit } from 'src/app/helpers/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(public weatherService: WeatherService, private weatherDataService: WeatherDataService) {}

  title = 'TNTET_Assigment_angular';

  subscriptions$: Subscription = new Subscription();

  currentGeoLocation: GeolocationPosition | undefined; 

  weatherUnit: weatherUnit | undefined;

  currentCity: string | undefined;

  locationState: boolean = true;

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  setUp(): void {
    let merged = merge(this.weatherService.weatherUnits$.asObservable(), this.weatherService.currentCity$.asObservable());
    this.subscriptions$.add(
      merged.subscribe((resp) => {
        if (isUnit(resp)) {
          this.weatherUnit = resp;
        } else {
          this.currentCity = resp;
          this.currentGeoLocation = undefined;
        }

        if (this.weatherUnit) {
          if (this.currentGeoLocation) {
            this.getWeatherDataFromGeoLocation(this.currentGeoLocation);
          } else if (this.currentCity) {
            this.getWeatherDataFromCityName(this.currentCity);
          }
        }
      })
    );
  }

  setCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((resp) => {
        this.currentGeoLocation = resp; 
        this.setUp();
      }, (err) => {
        this.setUp();
        this.weatherService.currentCity$.next("tbilisi");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      this.setUp();
      this.weatherService.currentCity$.next("tbilisi");
    }
  }

  changeUnit(unit: weatherUnit): void {
    this.weatherService.weatherUnits$.next(unit);
  }

  getWeatherDataFromGeoLocation(loc: GeolocationPosition): void {
    let data$ = this.weatherDataService.getWeatherWithCords(loc.coords.latitude, loc.coords.longitude, this.weatherUnit!);
    this.weatherService.weatherData$ = data$;
  }

  getWeatherDataFromCityName(city: string): void {
    this.currentGeoLocation = undefined;
    let data$ = this.weatherDataService.getWeatherWithCityName(city, this.weatherUnit!);
    this.weatherService.weatherData$ = data$;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
