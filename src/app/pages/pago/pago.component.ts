import { Component } from '@angular/core';
import { PagoListComponent } from '../../components/pago/pago-list/pago-list.component';
import { PagoFormComponent } from '../../components/pago/pago-form/pago-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [
    PagoListComponent,
    PagoFormComponent,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './pago.components.html',
  styleUrl: './pago.components.scss'
})
export class PagoComponent {}
