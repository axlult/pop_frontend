import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IClaseGimnasio } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaseGimnasioService extends BaseService<IClaseGimnasio> {
  protected override source = 'clasegimnasio';
  private clasesSignal = signal<IClaseGimnasio[]>([]);
  get clases$() {
    return this.clasesSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response) => {
        const clases = response.data.reverse();
        this.clasesSignal.set(clases);
      },
      error: (error) => {
        console.error('Error fetching clases', error);
      },
    });
  }

  saveClaseSignal(clase: IClaseGimnasio): Observable<any> {
    return this.add(clase).pipe(
      tap((res) => this.clasesSignal.update((clases) => [res.data, ...clases])),
      catchError((error) => {
        console.error('Error saving clase', error);
        return throwError(error);
      })
    );
  }

  updateClaseSignal(clase: IClaseGimnasio): Observable<any> {
    return this.edit(clase.id, clase).pipe(
      tap((res) => {
        const updated = this.clasesSignal().map((c) =>
          c.id === clase.id ? res.data : c
        );
        this.clasesSignal.set(updated);
      }),
      catchError((error) => {
        console.error('Error updating clase', error);
        return throwError(error);
      })
    );
  }

  deleteClaseSignal(clase: IClaseGimnasio): Observable<any> {
    return this.del(clase.id).pipe(
      tap(() => {
        const filtered = this.clasesSignal().filter((c) => c.id !== clase.id);
        this.clasesSignal.set(filtered);
      }),
      catchError((error) => {
        console.error('Error deleting clase', error);
        return throwError(error);
      })
    );
  }
}
