import { Component, ViewChild } from '@angular/core';
import { MembresiaListComponent } from '../../components/membresia/membresia-list/membresia-list.component';
import { MembresiaFormComponent } from '../../components/membresia/membresia-form/membresia-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { IMembresia } from '../../interfaces';

@Component({
  selector: 'app-membresias',
  standalone: true,
  imports: [
    MembresiaListComponent,
    MembresiaFormComponent,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './membresia.component.html',
  styleUrl: './membresia.component.scss'
})
export class MembresiaComponent {
  @ViewChild('formModal') modal!: ModalComponent;
  @ViewChild(MembresiaFormComponent) formComponent!: MembresiaFormComponent;
  
  formTitle = 'Registrar Membresía';
  editingMembresia: IMembresia | null = null;

  openCreateModal() {
    this.formTitle = 'Registrar Membresía';
    this.editingMembresia = null;
    this.modal.show();
    setTimeout(() => {
      this.formComponent.resetForm();
    }, 0);
  }

  openEditModal(membresia: IMembresia) {
    this.formTitle = 'Editar Membresía';
    this.editingMembresia = membresia;
    this.modal.show();
    setTimeout(() => {
      this.formComponent.loadMembresiaData(membresia);
    }, 0);
  }

  onMembresiaSaved() {
    this.modal.hide();
    this.editingMembresia = null;
  }
}