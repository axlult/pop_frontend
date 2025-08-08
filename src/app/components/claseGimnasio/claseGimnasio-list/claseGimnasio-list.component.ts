import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IClaseGimnasio } from '../../../interfaces';
import { ClaseGimnasioService } from '../../../services/claseGimnasio.service';

@Component({
  selector: 'app-clasegimnasio-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claseGimnasio-list.component.html',
})
export class ClaseGimnasioListComponent {
  constructor(public service: ClaseGimnasioService) {
    this.service.getAllSignal();
  }

  delete(clase: IClaseGimnasio) {
    if (confirm('¿Estás seguro de eliminar esta clase?')) {
      this.service.deleteClaseSignal(clase).subscribe();
    }
  }
}
