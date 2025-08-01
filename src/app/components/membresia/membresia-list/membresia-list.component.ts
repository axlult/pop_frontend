import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MembresiaService } from '../../../services/membresia.service';
import { IMembresia } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-membresia-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './membresia-list.component.html',
  styleUrl: './membresia-list.component.scss'
})
export class MembresiaListComponent implements OnInit {
  private membresiaService = inject(MembresiaService);
  membresias = this.membresiaService.membresias$;

  @Output() editEvent = new EventEmitter<IMembresia>();

  ngOnInit(): void {
    this.membresiaService.getAllSignal();
  }

esActiva(membresia: IMembresia): boolean {
    // Verificar que vencimiento existe y es una cadena válida
    if (!membresia.vencimiento || typeof membresia.vencimiento !== 'string') {
      return false;
    }
    
    const hoy = new Date();
    const vencimiento = new Date(membresia.vencimiento);
    
    // Verificar si la fecha es válida
    if (isNaN(vencimiento.getTime())) {
      return false;
    }
    
    return membresia.estado === 'Activa' && vencimiento > hoy;
  }

  diasRestantes(membresia: IMembresia): number {
    if (!this.esActiva(membresia) || !membresia.vencimiento) {
      return 0;
    }
    
    const hoy = new Date();
    const vencimiento = new Date(membresia.vencimiento);
    const diff = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  editMembresia(membresia: IMembresia) {
    this.editEvent.emit(membresia);
  }

  deleteMembresia(membresia: IMembresia) {
    if (confirm(`¿Estás seguro de eliminar la membresía con ID ${membresia.id}?`)) {
      this.membresiaService.deleteMembresiaSignal(membresia).subscribe();
    }
  }
}