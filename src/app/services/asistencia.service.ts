import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IAsistencia } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService extends BaseService<IAsistencia> {
  protected override source: string = 'asistencias';
  private asistenciaListSignal = signal<IAsistencia[]>([]);
  
  get asistencias$() {
    return this.asistenciaListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.asistenciaListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching asistencias', error);
      }
    });
  }

  saveAsistenciaSignal(asistencia: IAsistencia): Observable<any> {
    return this.add(asistencia).pipe(
      tap((response: any) => {
        this.asistenciaListSignal.update(asistencias => [response, ...asistencias]);
      }),
      catchError(error => {
        console.error('Error saving asistencia', error);
        return throwError(error);
      })
    );
  }

  updateAsistenciaSignal(asistencia: IAsistencia): Observable<any> {
    return this.edit(asistencia.id, asistencia).pipe(
      tap((response: any) => {
        const updatedAsistencias = this.asistenciaListSignal().map(a => a.id === asistencia.id ? response : a);
        this.asistenciaListSignal.set(updatedAsistencias);
      }),
      catchError(error => {
        console.error('Error updating asistencia', error);
        return throwError(error);
      })
    );
  }

  deleteAsistenciaSignal(asistencia: IAsistencia): Observable<any> {
    return this.del(asistencia.id).pipe(
      tap(() => {
        const updatedAsistencias = this.asistenciaListSignal().filter(a => a.id !== asistencia.id);
        this.asistenciaListSignal.set(updatedAsistencias);
      }),
      catchError(error => {
        console.error('Error deleting asistencia', error);
        return throwError(error);
      })
    );
  }
}