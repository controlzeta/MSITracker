import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; // Opcional: para paginación
import { MatSort } from '@angular/material/sort';             // Opcional: para ordenamiento
import { Installment, Banco } from '../model/MSITracking.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  formularioFecha = new FormGroup({
    fechaSeleccionada: new FormControl<Date | null>(null),
  });

  bancoSeleccionado: string = '';
  fechaInicial: Date = new Date();
  saldo: number = 0;
  parcialidades: number = 0;
  descripcion: string = '';

  bancos: Banco[] = [
    //{ id: 'AZT', nombre: 'Banco Azteca' },
    { id: 'BBV', nombre: 'BBVA Bancomer' },
    { id: 'CTB', nombre: 'Citibanamex' },
    { id: 'STD', nombre: 'Santander' },
    //{ id: 'NRT', nombre: 'Banorte' },
    //{ id: 'HSB', nombre: 'HSBC' },
    //{ id: 'SCT', nombre: 'Scotiabank' },
    { id: 'BRG', nombre: 'BanRegio' },
    { id: 'BRG', nombre: 'Hey Banco' },
    //{ id: 'AFR', nombre: 'Afirme' },
    //{ id: 'INB', nombre: 'Inbursa' }
  ];


  DATOS_INSTALMENTOS: Installment[] = [  ];

  displayedColumns: string[] = ['Banco', 'Descripcion', 'FechaInicial', 'Saldo', 'Parcialidades','Mensualidad', 'FechaFinal'];

  dataSource = new MatTableDataSource(this.DATOS_INSTALMENTOS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}



  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  agregarMensualidad() {
    const newInstallment: Installment = {
      Banco: this.bancoSeleccionado, Descripcion: this.descripcion, FechaInicial: new Date(this.fechaInicial),
      Saldo: 1000, Parcialidades: this.parcialidades, Mensualidad : this.saldo / this.parcialidades,
      FechaFinal: this.sumarMeses(new Date(this.fechaInicial), this.parcialidades)
    };
    const currentData = this.dataSource.data;
    const updatedData = [...currentData, newInstallment];

    this.dataSource.data = updatedData;

    

  }

  sumarMeses(fechaInicial: Date, mesesASumar: number): Date {
    const nuevaFecha = new Date(fechaInicial); 
    nuevaFecha.setMonth(nuevaFecha.getMonth() + mesesASumar);
    return nuevaFecha;
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
