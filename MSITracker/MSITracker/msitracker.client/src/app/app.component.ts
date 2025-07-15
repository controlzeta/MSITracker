import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; // Opcional: para paginación
import { MatSort } from '@angular/material/sort';             // Opcional: para ordenamiento

interface Installment {
  Banco: string;
  Descripcion: string;
  FechaInicial: Date;
  Saldo: number;
  Parcialidades: number;
  FechaFinal?: Date;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  formularioFecha = new FormGroup({
    fechaSeleccionada: new FormControl<Date | null>(null),
  });

  DATOS_INSTALMENTOS: Installment[] = [
    { Banco: 'BANCOMER', Descripcion: 'Crédito auto', FechaInicial: new Date('2023-01-15'), Saldo: 150000, Parcialidades: 60, FechaFinal: new Date('2028-01-15') },
    { Banco: 'HSBC', Descripcion: 'Préstamo personal', FechaInicial: new Date('2024-03-01'), Saldo: 50000, Parcialidades: 24, FechaFinal: new Date('2026-03-01') },
    { Banco: 'CITIBANAMEX', Descripcion: 'Tarjeta de crédito', FechaInicial: new Date('2024-05-10'), Saldo: 12500, Parcialidades: 12 }, // FechaFinal es opcional
    { Banco: 'SCOTIABANK', Descripcion: 'Hipoteca', FechaInicial: new Date('2022-08-20'), Saldo: 2500000, Parcialidades: 360, FechaFinal: new Date('2052-08-20') },
    { Banco: 'BBVA', Descripcion: 'Electrodomésticos', FechaInicial: new Date('2024-07-01'), Saldo: 8000, Parcialidades: 18, FechaFinal: new Date('2026-01-01') },
    { Banco: 'SANTANDER', Descripcion: 'Crédito estudios', FechaInicial: new Date('2023-11-05'), Saldo: 30000, Parcialidades: 36, FechaFinal: new Date('2026-11-05') },
  ];

  displayedColumns: string[] = ['Banco', 'Descripcion', 'FechaInicial', 'Saldo', 'Parcialidades', 'FechaFinal'];

  dataSource = new MatTableDataSource(this.DATOS_INSTALMENTOS);

  // Opcional: Para paginación y ordenamiento
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //dataSource: Installment[] = [
  //  { Banco: 'BBVA', Descripcion: 'Manzana', FechaInicial: new Date('01/01/2025'), Saldo: 1000, Parcialidades: 12, FechaFinal: new Date('02/02/2028')  },
  //  { Banco: 'Banamex', Descripcion: 'Manzana', FechaInicial: new Date('01/01/2025'), Saldo: 1000, Parcialidades: 12, FechaFinal: new Date('02/02/2028') }
  //];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(): void {
    console.log('Fecha seleccionada:', this.formularioFecha.value.fechaSeleccionada);
    // Aquí puedes enviar la fecha a tu backend o hacer algo con ella
  }

  title = 'msitracker.client';
}
