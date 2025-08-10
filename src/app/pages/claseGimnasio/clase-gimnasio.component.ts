import { Component, ViewChild } from '@angular/core';
import { ClaseGimnasioListComponent } from '../../components/claseGimnasio/claseGimnasio-list/clase-gimnasio-list.component'; // Corregido
import { ClaseGimnasioFormComponent } from '../../components/claseGimnasio/claseGimnasio-form/clase-gimnasio-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-clase-gimnasio',
  standalone: true,
  imports: [
    ClaseGimnasioListComponent, // Componente de lista
    ClaseGimnasioFormComponent, // Componente de formulario
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './clase-gimnasio.component.html',
  styleUrl: './clase-gimnasio.component.scss'
})
export class ClaseGimnasioComponent {
  @ViewChild('formModal') formModal!: ModalComponent;
}