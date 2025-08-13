import { Component } from '@angular/core';
import { ReporteListComponent } from '../../components/reporte/reporte-list/reporte-list.components';
import { ReporteFormComponent } from '../../components/reporte/reporte-form/reporte-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    ReporteListComponent,
    ReporteFormComponent,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent { }
