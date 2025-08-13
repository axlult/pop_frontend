import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../../services/pago.service';
import { IPago } from '../../../interfaces';

@Component({
  selector: 'app-pago-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-list.component.html',
  styleUrl: './pago-list.component.scss'
})
export class PagoListComponent implements OnInit {
  pagos$ = this.pagoService.pagos$;

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.getAllSignal();
  }

  deletePago(pago: IPago) {
    if (confirm(`¿Eliminar pago de ${pago.monto}?`)) {
      this.pagoService.deletePagoSignal(pago).subscribe();
    }
  }
}
