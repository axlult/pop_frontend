import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IClaseGimnasio, IResponse } from '../interfaces';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaseGimnasioService extends BaseService<IClaseGimnasio> {
  protected override source: string = 'clases';
  private claseListSignal = signal<IClaseGimnasio[]>([]);
  
  get clases$() {
    return this.claseListSignal;
  }

  getAllSignal() {
    this.findAll().subscribe({
      next: (response: IResponse<IClaseGimnasio[]>) => {
        const clases = response.data || [];
        this.claseListSignal.set(clases);
      },
      error: (error: any) => {
        console.error('Error fetching clases', error);
      }
    });
  }

  saveClaseSignal(clase: IClaseGimnasio): Observable<IResponse<IClaseGimnasio>> {
    // Transformar para enviar al backend
    const request = {
      nombre: clase.nombre,
      horario: clase.horario,
      entrenadorId: clase.entrenador?.id || 0
    };

    return this.add(request).pipe(
      tap((response: IResponse<IClaseGimnasio>) => {
        if (response.data) {
          this.claseListSignal.update(clases => [response.data, ...clases]);
        }
      }),
      catchError(error => {
        console.error('Error saving clase', error);
        return throwError(error);
      })
    );
  }

  updateClaseSignal(clase: IClaseGimnasio): Observable<IResponse<IClaseGimnasio>> {
    if (!clase.id) {
      return throwError(() => new Error('ID de clase no proporcionado'));
    }
    
    // Transformar para enviar al backend
    const request = {
      nombre: clase.nombre,
      horario: clase.horario,
      entrenadorId: clase.entrenador?.id || 0
    };

    return this.edit(clase.id, request).pipe(
      tap((response: IResponse<IClaseGimnasio>) => {
        if (response.data) {
          const updatedClases = this.claseListSignal().map(c => c.id === clase.id ? response.data : c);
          this.claseListSignal.set(updatedClases);
        }
      }),
      catchError(error => {
        console.error('Error updating clase', error);
        return throwError(error);
      })
    );
  }

  deleteClaseSignal(id: number): Observable<IResponse<any>> {
    return this.del(id).pipe(
      tap(() => {
        const updatedClases = this.claseListSignal().filter(c => c.id !== id);
        this.claseListSignal.set(updatedClases);
      }),
      catchError(error => {
        console.error('Error deleting clase', error);
        return throwError(error);
      })
    );
  }

  // Método para asignar entrenador a una clase
  asignarEntrenador(claseId: number, entrenadorId: number): Observable<IResponse<IClaseGimnasio>> {
    return this.http.post<IResponse<IClaseGimnasio>>(
      `${this.source}/${claseId}/asignar-entrenador/${entrenadorId}`, 
      {}
    ).pipe(
      tap((response: IResponse<IClaseGimnasio>) => {
        if (response.data) {
          this.claseListSignal.update(clases => 
            clases.map(c => c.id === response.data.id ? response.data : c)
          );
        }
      }),
      catchError(error => {
        console.error('Error asignando entrenador', error);
        return throwError(error);
      })
    );
  }

  // Método para buscar clases por nombre
  buscarPorNombre(nombre: string): Observable<IResponse<IClaseGimnasio[]>> {
    return this.http.get<IResponse<IClaseGimnasio[]>>(`${this.source}/buscar?nombre=${nombre}`);
  }

  // Método para obtener clases por entrenador
  getClasesPorEntrenador(entrenadorId: number): Observable<IResponse<IClaseGimnasio[]>> {
    return this.http.get<IResponse<IClaseGimnasio[]>>(`${this.source}/entrenador/${entrenadorId}`);
  }
}