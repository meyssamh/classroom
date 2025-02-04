export type ButtonPropsVariant = 'text' | 'text-slim' | 'text-disabled' | 'outlined' |
'contained-danger' | 'contained-danger-slim' | 'contained' | 'contained-disabled' |
'contained-slim' | 'contained-long' | 'contained-long-disabled';

export interface ButtonProps {
	text: string;
	variant: ButtonPropsVariant;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface IconButtonProps {
	icon: 'submit' | 'submit-danger' | 'submit-disabled' | 'cancel';
	text: 'Submit' | 'Cancel' | 'Delete';
	variant: 'outlined' | 'contained' | 'contained-disabled' | 'contained-danger';
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface NavigationButtonProps {
	variant: 'text' | 'icon-text';
	text: string;
	icon?: 'home' | 'table' | 'settings' | 'logout';
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface InputProps {
	name: string;
	value: string;
	label: string;
	error: boolean;
	errorText?: string;
	required: boolean;
	type: 'text' | 'password' | 'email';
	maxLength: 50 | 100 | 255;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface SnackbarProps {
	text: string;
	severity: 'success' | 'error';
}

export interface TagProps {
	text: string;
	buttonText: string;
	variant: 'open' | 'edit' | 'delete';
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface StudentTagProps {
	text: string;
	variant?: 'absent' | 'present' | 'unresolved';
	onClick?: MouseEventHandler<HTMLButtonElement>;
	onAbsentClick?: MouseEventHandler<HTMLButtonElement>;
	onPresentClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface BodyProps {
	buttons: React.ReactNode;
	children: React.ReactNode;
}

export interface MainProps {
	title: string;
	buttons: React.ReactNode;
	children: React.ReactNode;
}

export interface LinkButtonProps {
	text: string;
	link?: string;
	variant: 'contained' | 'contained-slim' | 'text' | 'text-disabled';
}

export interface DropdownProps {
	label: string;
	menu: JSX.Element[] | null;
	variant: 'contained' | 'contained-disabled';
}

export interface ModalProps {
	type: 'edit' | 'edit-disabled' | 'delete';
	label: string;
	children?: JSX.Element;
	question?: string;
	onCancelClick: React.MouseEventHandler<HTMLButtonElement>;
	onProceedClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface TableHeader {
	date: string[];
}

export interface TableBody {
	student: { [id: number]: string };
	information: { [id: number]: boolean[] };
}

export interface Situation {
	[key: number]: boolean | undefined;
}

export interface ValidationCheck {
	error: boolean;
	errorText: string;
}

export interface LazyloaderProps {
	WrappedComponent: LazyExoticComponent<() => Element>
}

export interface UserName {
	firstname?: string;
	lastname?: string;
	username: string;
}

export interface UserProps {
	user: UserName;
}