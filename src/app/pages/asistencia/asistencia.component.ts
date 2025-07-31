import { Component } from '@angular/core';
import { AsistenciaListComponent } from '../../components/asistencia/asistencia-list/asistencia-list.component';
import { AsistenciaFormComponent } from '../../components/asistencia/asistencia-form/asistencia-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [
    AsistenciaListComponent,
    AsistenciaFormComponent,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent {

}