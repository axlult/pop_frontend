import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IMembresia } from '../../../interfaces';
import { MembresiaService } from '../../../services/membresia.service';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-membresia-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './membresia-form.component.html',
  styleUrl: './membresia-form.component.scss'
})
export class MembresiaFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() membresia?: IMembresia | null;; // Membresía existente para editar
  @Output() onSubmitEvent = new EventEmitter<void>();
  
  private membresiaService = inject(MembresiaService);
  private userService = inject(UserService);
  
  users: IUser[] = [];
  formData: IMembresia = {
    tipo: '',
    inicio: new Date().toISOString().split('T')[0],
    vencimiento: this.calcularVencimiento(30),
    estado: 'Activa',
    user: { id: 0 }
  };

  ngOnInit(): void {
    this.loadUsers();
    
    // Si se recibe una membresía para editar, cargamos sus datos
    if (this.membresia) {
      this.loadMembresiaData(this.membresia);
    }
  }

  loadMembresiaData(membresia: IMembresia) {
    this.formData = { ...membresia };
    
    // Convertir fechas a formato YYYY-MM-DD para los inputs
    if (this.formData.inicio) {
      this.formData.inicio = new Date(this.formData.inicio).toISOString().split('T')[0];
    }
    
    if (this.formData.vencimiento) {
      this.formData.vencimiento = new Date(this.formData.vencimiento).toISOString().split('T')[0];
    }
  }

  resetForm() {
    this.formData = {
      tipo: '',
      inicio: new Date().toISOString().split('T')[0],
      vencimiento: this.calcularVencimiento(30),
      estado: 'Activa',
      user: { id: 0 }
    };
  }

  loadUsers() {
    this.userService.findAll().subscribe({
      next: (response: any) => {
        this.users = Array.isArray(response) 
          ? response 
          : response.data || response.content || response.items;
        
        // Seleccionar el primer usuario si no hay membresía cargada
        if (!this.membresia && this.users.length > 0) {
          this.formData.user.id = this.users[0].id!;
        }
      },
      error: (error) => {
        console.error('Error cargando usuarios', error);
      }
    });
  }

  calcularVencimiento(dias: number): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.formData.id) {
      // Modo edición: llamar al método de actualización
      this.membresiaService.updateMembresiaSignal(this.formData).subscribe({
        next: (response) => {
          console.log('Membresía actualizada:', response);
          this.onSubmitEvent.emit();
        },
        error: (error) => {
          console.error('Error actualizando membresía', error);
        }
      });
    } else {
      // Modo creación: llamar al método de guardado
      this.membresiaService.saveMembresiaSignal(this.formData).subscribe({
        next: (response) => {
          console.log('Membresía guardada:', response);
          this.onSubmitEvent.emit();
        },
        error: (error) => {
          console.error('Error guardando membresía', error);
        }
      });
    }
  }
}

