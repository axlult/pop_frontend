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
    membresia: {  // Inicializado explícitamente
      id: 0,
      user: { id: 0 }  // Si `user` es requerido en tu lógica
    }
  };

  constructor(private pagoService: PagoService) {}

  save() {
    // Verificación adicional (opcional)
    if (!this.pago.membresia) {
      this.pago.membresia = { id: 0 }; // Fallback seguro
    }

    this.pagoService.savePagoSignal(this.pago).subscribe(() => {
      alert('Pago guardado correctamente');
    });
  }
}