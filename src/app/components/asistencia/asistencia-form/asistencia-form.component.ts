import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IAsistencia } from '../../../interfaces';
import { UserService } from '../../../services/user.service';
import { AsistenciaService } from '../../../services/asistencia.service'; 
import { IUser } from '../../../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asistencia-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './asistencia-form.component.html',
  styleUrl: './asistencia-form.component.scss'
})
export class AsistenciaFormComponent implements OnInit {
  @Input() title: string = '';
  @Output() onSubmitEvent = new EventEmitter<IAsistencia>();
  
  private userService = inject(UserService);
  private asistenciaService = inject(AsistenciaService); 
  users: IUser[] = [];
  
  asistencia: IAsistencia = {
    id: 0,
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().split(' ')[0],
    user: { id: 0 }
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.findAll().subscribe({
      next: (response: any) => {
        // Ajusta según la estructura de tu API
        this.users = Array.isArray(response) 
          ? response 
          : response.data || response.content || response.items;
        
        console.log('Usuarios cargados:', this.users); // Para depuración
        
        if (this.users.length > 0) {
          this.asistencia.user.id = this.users[0].id!;
        }
      },
      error: (error) => {
        console.error('Error cargando usuarios', error);
      }
    });
  }

   onSubmit() {
    // Llama al servicio para guardar la asistencia
    console.log(this.asistencia);
    this.asistenciaService.saveAsistenciaSignal(this.asistencia).subscribe({
      next: (response) => {
        console.log('Asistencia guardada:', response);
        this.onSubmitEvent.emit(this.asistencia); // Emite el evento
        
      },
      error: (error) => {
        console.error('Error guardando asistencia', error);
      }
    });
  }
}