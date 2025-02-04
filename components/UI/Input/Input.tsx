import React from 'react';

import { InputProps } from '$/declaration';

/**
 * ForwardRef exotic component of an input field. It can have its own ref!
 * 
 * @param {string} name Name of the input field.
 * @param {string} value Value of the input field.
 * @param {string} label Label of the input field.
 * @param {boolean} error Whether the input value is correct or incorrect.
 * @param {string} errorText Text to show if the input is incorrect. Optional!
 * @param {boolean} required Whether the input field is required or not.
 * @param {string} type Type of the input field.
 * @param {number} maxLength Max length for input value. It can be 50, 100 or 255.
 * @param {ChangeEventHandler} onChange Changes the value of input field.
 * 
 * @returns {JSX.Element} An input field with its own ref.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(({
	name,
	value = '',
	label,
	error,
	errorText,
	required = false,
	type = 'text',
	maxLength = 255,
	onChange
}, ref) => {
	const classes = {
		container: 'relative w-full px-7 mt-7.5 pb-10',
		input: 'block bg-whitesmoke w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-success text-base ring-1 ring-inset ring-whitesmoke placeholder:text-darkgray sm:text-sm sm:leading-6 outline-0',
		information: 'absolute top-1.5 right-10 flex items-center',
		label: 'sr-only',
		svg: 'size-6 text-danger',
		error: 'absolute text-left text-danger text-sm my-1',
	};

	return (
		<div className={classes.container}>
			<input
				id={name}
				className={classes.input}
				type={type}
				name={name}
				value={value}
				maxLength={maxLength}
				placeholder={label}
				ref={ref}
				required={required}
				onChange={onChange}
				autoComplete={'true'}
			/>
			<div className={classes.information}>
				<label htmlFor={name} className={classes.label}>
					{label}
				</label>
				{
					error && <svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className={classes.svg}
					>
						<path
							fillRule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
							clipRule="evenodd"
						/>
					</svg>}
			</div>
			{error && errorText && <p className={classes.error}>{errorText}</p>}
		</div>
	);
});

Input.displayName = 'Input';

export default Input;