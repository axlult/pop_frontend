import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteService } from '../../../services/reporte.service';
import { IReporte } from '../../../interfaces';
import { effect } from '@angular/core';

@Component({
  selector: 'app-reporte-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte-list.components.html',
  styleUrl: './reporte-list.components.scss'
})
export class ReporteListComponent implements OnInit {
  reportes: IReporte[] = [];

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
  effect(() => {
    this.reportes = this.reporteService.reportes$();
  });
  this.reporteService.getAllSignal();
}


}
