import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import cities from 'cities.json';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  filterWord: string = "";

  list: any[] = [];

  allCities = (cities as Array<any>)

  ngOnInit(): void {
  }

  filter(): void {
    if (!this.filterWord) {
      this.list = [];
      return;
    };
    this.list = this.allCities.filter((city: any) => (city.name).toLowerCase().startsWith((this.filterWord).toLowerCase()));
  }

  reset(): void {
    this.list = [];
  }

  handleClick(city: string): void {
    this.weatherService.currentCity$.next(city);
    this.reset();
  }
}
