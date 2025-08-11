import { Component, OnInit, inject } from '@angular/core';
import { ClaseGimnasioService } from '../../../services/clase-gimnasio.service';
import { IClaseGimnasio } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clase-gimnasio-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clase-gimnasio-list.component.html',
  styleUrl: './clase-gimnasio-list.component.scss'
})
export class ClaseGimnasioListComponent implements OnInit {
  private claseService = inject(ClaseGimnasioService);
  clases = this.claseService.clases$;  // Signal<IClaseGimnasio[]>

  ngOnInit(): void {
    this.claseService.getAllSignal();
    console.log(this.claseService.getAllSignal());
  }

  deleteClase(clase: IClaseGimnasio) {
    if (clase.id && confirm(`¿Estás seguro de eliminar la clase "${clase.nombre}"?`)) {
      this.claseService.deleteClaseSignal(clase.id).subscribe();
    }
  }
}