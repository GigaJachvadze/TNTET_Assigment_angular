import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { IWeatherInfo, weatherUnit } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  currentCity$: Subject<string> = new Subject();

  weatherUnits$: BehaviorSubject<weatherUnit> = new BehaviorSubject<weatherUnit>('metric');

  weatherData$: Observable<IWeatherInfo> | undefined;
}
