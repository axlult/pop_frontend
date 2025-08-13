import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagoService } from '../../../services/pago.service';
import { IPago } from '../../../interfaces';

@Component({
  selector: 'app-pago-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pago-form.component.html',
  styleUrl: './pago-form.component.scss'
})
export class PagoFormComponent {
  @Input() title: string = '';

  // Asegura que `membresia` esté inicializada aunque sea opcional en la interfaz
  pago: IPago = {
    monto: 0,
    fecha: '',
    metodo: '',
     membresiaId: 0 ,
  };

  constructor(private pagoService: PagoService) {}

  save() {
    // Validar que tenemos un ID de membresía
    if (!this.pago.membresiaId) {
      alert('Debe seleccionar una membresía');
      return;
    }

    this.pagoService.savePagoSignal(this.pago).subscribe(() => {
      alert('Pago guardado correctamente');
    });
  }

}