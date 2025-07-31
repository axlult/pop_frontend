import { Component } from '@angular/core';
import { MembresiaListComponent } from '../../components/membresia/membresia-list/membresia-list.component';
import { MembresiaFormComponent } from '../../components/membresia/membresia-form/membresia-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [
    MembresiaListComponent,
    MembresiaFormComponent,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './membresia.component.html',
  styleUrl: './membresia.component.scss'
})
export class MembresiaComponent {
 
}