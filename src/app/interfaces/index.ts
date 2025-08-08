export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole;
}


export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRoleType {
  admin = "ROLE_ADMIN",
  user = "ROLE_USER",
  superAdmin = 'ROLE_SUPER_ADMIN'
}

export interface IRole {
  createdAt: string,
  description: string,
  id: number
  name : string,
  updatedAt: string
}

export interface IGame {
  id?: number
  name?: string,
  imgURL?: string,
  status?: string,
  description?: string,
  createdAt?: string,
  updatedAt?: string
}
export interface IAsistencia {
  id: number;
  fecha: string;
  hora: string;
  user: {
    id: number;
    name?: string;  // Opcional pero el objeto siempre existe
    lastname?: string;
  };
}

export interface IMembresia {
  id?: number;
  tipo?: string;
  inicio?: string;
  vencimiento?: string;
  estado?: string;
  user: {  // Nueva propiedad para la relación con usuario
    id: number;
    name?: string;
    lastname?: string;
  };
}

export interface IPago {
  id?: number;
  monto?: number;
  fecha?: string;
  metodo?: string;
  membresia?: {
    id: number;
    tipo?: string;
    user?: {  // Anidar información de usuario
      id: number;
      name?: string;
    }
  };
}

export interface IClaseGimnasio {
  id?: number;
  nombre: string;
  horario: string;
  entrenador: {
    id: number;
    username?: string;
  };
}
