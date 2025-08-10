import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IClaseGimnasio, IResponse, IUser } from '../../../interfaces';
import { UserService } from '../../../services/user.service';
import { ClaseGimnasioService } from '../../../services/clase-gimnasio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clase-gimnasio-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './clase-gimnasio-form.component.html',
  styleUrl: './clase-gimnasio-form.component.scss'
})
export class ClaseGimnasioFormComponent implements OnInit {
  @Input() title: string = '';
  @Output() onSubmitEvent = new EventEmitter<IClaseGimnasio>();
  
  private userService = inject(UserService);
  private claseService = inject(ClaseGimnasioService);
  entrenadores: IUser[] = [];
  
  clase: IClaseGimnasio = {
    nombre: '',
    horario: '',
    entrenador: { id: 0 }  // Inicialización segura
  };

  ngOnInit(): void {
    this.loadEntrenadores();
  }

  loadEntrenadores() {
    this.userService.findAll().subscribe({
      next: (response: any) => {
        this.entrenadores = Array.isArray(response) 
          ? response 
          : response.data || response.content || response.items || [];
        
        if (this.entrenadores.length > 0) {
          // Asegurar que entrenador está inicializado
          this.clase.entrenador = this.clase.entrenador || { id: 0 };
          this.clase.entrenador.id = this.entrenadores[0].id!;
        }
      },
      error: (error: any) => {
        console.error('Error cargando entrenadores', error);
      }
    });
  }

  onSubmit() {
    // Verificar que entrenador está inicializado
    if (!this.clase.entrenador) {
      this.clase.entrenador = { id: 0 };
    }
    
    this.claseService.saveClaseSignal(this.clase).subscribe({
      next: (response: IResponse<IClaseGimnasio>) => {
        if (response.data) {
          this.onSubmitEvent.emit(response.data);
          this.resetForm();
        }
      },
      error: (error: any) => {
        console.error('Error guardando clase', error);
      }
    });
  }

  private resetForm(): void {
    this.clase = {
      nombre: '',
      horario: '',
      entrenador: { id: 0 }  // Reinicio seguro
    };
  }
}