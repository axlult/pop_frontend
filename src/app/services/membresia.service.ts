import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IMembresia } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembresiaService extends BaseService<IMembresia> {
  protected override source: string = 'membresias';
  private membresiaListSignal = signal<IMembresia[]>([]);
  
  get membresias$() {
    return this.membresiaListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.membresiaListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching membresias', error);
      }
    });
  }

  saveMembresiaSignal(membresia: IMembresia): Observable<any> {
    return this.add(membresia).pipe(
      tap((response: any) => {
        this.membresiaListSignal.update(membresias => [response, ...membresias]);
      }),
      catchError(error => {
        console.error('Error saving membresia', error);
        return throwError(error);
      })
    );
  }

  updateMembresiaSignal(membresia: IMembresia): Observable<any> {
    return this.edit(membresia.id, membresia).pipe(
      tap((response: any) => {
        const updatedMembresias = this.membresiaListSignal().map(m => m.id === membresia.id ? response : m);
        this.membresiaListSignal.set(updatedMembresias);
      }),
      catchError(error => {
        console.error('Error updating membresia', error);
        return throwError(error);
      })
    );
  }

  deleteMembresiaSignal(membresia: IMembresia): Observable<any> {
    return this.del(membresia.id).pipe(
      tap(() => {
        const updatedMembresias = this.membresiaListSignal().filter(m => m.id !== membresia.id);
        this.membresiaListSignal.set(updatedMembresias);
      }),
      catchError(error => {
        console.error('Error deleting membresia', error);
        return throwError(error);
      })
    );
  }
}