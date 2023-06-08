import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { WeatherDataService } from './services/weather-data.service';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    CitySearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WeatherDataService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
