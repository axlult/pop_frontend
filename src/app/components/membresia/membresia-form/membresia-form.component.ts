import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IMembresia } from '../../../interfaces';
import { MembresiaService } from '../../../services/membresia.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-membresia-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './membresia-form.component.html',
  styleUrl: './membresia-form.component.scss'
})
export class MembresiaFormComponent implements OnInit {
  @Input() title: string = '';
  @Output() onSubmitEvent = new EventEmitter<IMembresia>();
  
  private membresiaService = inject(MembresiaService);
  
  membresia: IMembresia = {
    tipo: '',
    inicio: new Date().toISOString().split('T')[0],
    vencimiento: this.calcularVencimiento(30), // Por defecto 30 días
    estado: 'Activa'
  };

  ngOnInit(): void {
    // No se necesita cargar datos adicionales
  }

  calcularVencimiento(dias: number): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toISOString().split('T')[0];
  }

  onSubmit() {
    this.membresiaService.saveMembresiaSignal(this.membresia).subscribe({
      next: (response) => {
        console.log('Membresía guardada:', response);
        this.onSubmitEvent.emit(response);
      },
      error: (error) => {
        console.error('Error guardando membresía', error);
      }
    });
  }
}