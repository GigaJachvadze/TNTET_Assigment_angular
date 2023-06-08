import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherInfo, weatherUnit } from '../types/types';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient) { }

  getWeatherWithCityName(city: string, units: weatherUnit): Observable<IWeatherInfo> {
    return this.http.get<IWeatherInfo>(environment.apiUrl, {params: {q: city, units: units, appid: environment.apiKey}})
  }

  getWeatherWithCords(lat: number, lon: number, units: weatherUnit): Observable<IWeatherInfo> {
    return this.http.get<IWeatherInfo>(environment.apiUrl, {params: {lat: lat, lon: lon, units: units, appid: environment.apiKey}});
  }
}
