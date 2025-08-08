import { Component } from '@angular/core';
import { ClaseGimnasioListComponent } from '../../components/claseGimnasio/claseGimnasio-list/claseGimnasio-list.component';
import { ClaseGimnasioFormComponent } from '../../components/claseGimnasio/claseGimnasio-form/claseGimnasio-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-clasegimnasio',
  standalone: true,
  imports: [
    ClaseGimnasioListComponent,
    ClaseGimnasioFormComponent,
    ModalComponent,
    LoaderComponent,
  ],
  templateUrl: './claseGimnasio.component.html',
  styleUrl: './claseGimnasio.component.scss'
})
export class ClaseGimnasioComponent {}
