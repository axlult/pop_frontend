import { Component } from '@angular/core';
import { ReporteListComponent } from '../../components/reporte/reporte-list/reporte-list.components';
import { ReporteFormComponent } from '../../components/reporte/reporte-form/reporte-form.components';
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
  templateUrl: './reporte.components.html',
  styleUrl: './reporte.components.scss'
})
export class ReporteComponent { }
