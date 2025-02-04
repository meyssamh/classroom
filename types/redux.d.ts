export interface UserName {
	username: string;
	firstname: string;
	lastname: string;
}

export interface Classes {
	id: number;
	classname: string;
}

interface AuthData {
	user: UserName;
}

interface HomeData {
	classes: Classes[];
}

interface Load {
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
}

export interface HomeState extends Load {
	data: HomeData;
}

export interface Student {
	firstname: string;
	lastname: string;
}

export interface Students extends Student {
	id: number;
}

export interface Sessions {
	id: number;
	date: Date;
	situation: object;
}

interface ClassData {
	class: Classes;
	students: Students[];
	sessions: Sessions[];
}

export interface ClassState extends Load {
	data: ClassData;
	// selectedSessionId: number;
}

export interface AuthState extends Load {
	data: AuthData;
}

export interface SigninData {
	username: string;
	password: string;
}

export interface SignupData {
	firstname?: string;
	lastname?: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}