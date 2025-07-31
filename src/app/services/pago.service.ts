import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IPago } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagoService extends BaseService<IPago> {
  protected override source: string = 'pagos';
  private pagoListSignal = signal<IPago[]>([]);
  
  get pagos$() {
    return this.pagoListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.pagoListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching pagos', error);
      }
    });
  }

  savePagoSignal(pago: IPago): Observable<any> {
    return this.add(pago).pipe(
      tap((response: any) => {
        this.pagoListSignal.update(pagos => [response, ...pagos]);
      }),
      catchError(error => {
        console.error('Error saving pago', error);
        return throwError(error);
      })
    );
  }

  updatePagoSignal(pago: IPago): Observable<any> {
    return this.edit(pago.id, pago).pipe(
      tap((response: any) => {
        const updatedPagos = this.pagoListSignal().map(p => p.id === pago.id ? response : p);
        this.pagoListSignal.set(updatedPagos);
      }),
      catchError(error => {
        console.error('Error updating pago', error);
        return throwError(error);
      })
    );
  }

  deletePagoSignal(pago: IPago): Observable<any> {
    return this.del(pago.id).pipe(
      tap(() => {
        const updatedPagos = this.pagoListSignal().filter(p => p.id !== pago.id);
        this.pagoListSignal.set(updatedPagos);
      }),
      catchError(error => {
        console.error('Error deleting pago', error);
        return throwError(error);
      })
    );
  }
}