export interface Installment {
  Banco: string;
  Descripcion: string;
  FechaInicial: Date;
  Saldo: number;
  Parcialidades: number;
  Mensualidad: number;
  FechaFinal?: Date;
}

export interface Banco {
  id: string;
  nombre: string;
}
