import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IClaseGimnasio } from '../../../interfaces';
import { ClaseGimnasioService } from '../../../services/claseGimnasio.service';

@Component({
  selector: 'app-clasegimnasio-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claseGimnasio-form.component.html',
  styleUrl: './claseGimnasio-form.component.scss'
})
export class ClaseGimnasioFormComponent {
  @Input() title: string = '';
  clase: IClaseGimnasio = {
    nombre: '',
    horario: '',
    entrenador: { id: 0},
  };

  constructor(private service: ClaseGimnasioService) {}

  save() {
    this.service.saveClaseSignal(this.clase).subscribe(() => {
      this.resetForm();
    });
  }

  resetForm() {
    this.clase = {
      nombre: '',
      horario: '',
      entrenador: { id: 0 },
    };
  }
}
