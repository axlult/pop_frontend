import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IReporte } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteService extends BaseService<IReporte> {
  protected override source: string = 'reporte';
  private reporteListSignal = signal<IReporte[]>([]);

  get reportes$() {
    return this.reporteListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.reporteListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching reportes', error);
      }
    });
  }

  saveReporteSignal(reporte: IReporte): Observable<any> {
    return this.add(reporte).pipe(
      tap((response: any) => {
        this.reporteListSignal.update(reportes => [response, ...reportes]);
      }),
      catchError(error => {
        console.error('Error saving reporte', error);
        return throwError(error);
      })
    );
  }

  updateReporteSignal(reporte: IReporte): Observable<any> {
    return this.edit(reporte.id, reporte).pipe(
      tap((response: any) => {
        const updated = this.reporteListSignal().map(r => r.id === reporte.id ? response : r);
        this.reporteListSignal.set(updated);
      }),
      catchError(error => {
        console.error('Error updating reporte', error);
        return throwError(error);
      })
    );
  }

  deleteReporteSignal(reporte: IReporte): Observable<any> {
    return this.del(reporte.id).pipe(
      tap(() => {
        const updated = this.reporteListSignal().filter(r => r.id !== reporte.id);
        this.reporteListSignal.set(updated);
      }),
      catchError(error => {
        console.error('Error deleting reporte', error);
        return throwError(error);
      })
    );
  }
}
