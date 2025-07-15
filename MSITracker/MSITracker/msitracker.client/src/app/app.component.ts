import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  formularioFecha = new FormGroup({
    fechaSeleccionada: new FormControl<Date | null>(null),
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    //this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
    //  (result) => {
    //    this.forecasts = result;
    //  },
    //  (error) => {
    //    console.error(error);
    //  }
    //);
  }

  onSubmit(): void {
    console.log('Fecha seleccionada:', this.formularioFecha.value.fechaSeleccionada);
    // Aquí puedes enviar la fecha a tu backend o hacer algo con ella
  }

  title = 'msitracker.client';
}
