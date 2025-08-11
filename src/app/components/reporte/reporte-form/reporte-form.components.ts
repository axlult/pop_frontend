import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../../services/reporte.service';
import { IReporte } from '../../../interfaces';

@Component({
  selector: 'app-reporte-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporte-form.components.html',
  styleUrl: './reporte-form.components.scss'
})
export class ReporteFormComponent {
  @Input() title: string = '';
  reporte: IReporte = { tipo: '', formato: '', contenido: null, usuario: undefined };

  constructor(private reporteService: ReporteService) {}

  save() {
    this.reporteService.saveReporteSignal(this.reporte).subscribe();
  }
}
