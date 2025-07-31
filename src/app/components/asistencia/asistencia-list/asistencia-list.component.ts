import { Component, OnInit, inject } from '@angular/core';
import { AsistenciaService } from '../../../services/asistencia.service';
import { IAsistencia } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asistencia-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencia-list.component.html',
  styleUrl: './asistencia-list.component.scss'
})
export class AsistenciaListComponent implements OnInit {
  private asistenciaService = inject(AsistenciaService);
  asistencias = this.asistenciaService.asistencias$;

  ngOnInit(): void {
    this.asistenciaService.getAllSignal();
  }

  editAsistencia(asistencia: IAsistencia) {
    // Implementar lógica para editar
    console.log('Editar asistencia', asistencia);
  }

  deleteAsistencia(asistencia: IAsistencia) {
    if (confirm(`¿Estás seguro de eliminar la asistencia con ID ${asistencia.id}?`)) {
      this.asistenciaService.deleteAsistenciaSignal(asistencia).subscribe();
    }
  }
}