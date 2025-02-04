import classNames from 'classnames';

import { ButtonProps } from '$/declaration';

/**
 * Button component with various styles based on the provided variant.
 *
 * @param {string} text - Button text.
 * @param {string} variant - Variant of button.
 * @param {MouseEventHandler} [onClick] - Optional click event handler.
 * 
 * @returns {JSX.Element} The rendered button element.
 */
const Button = ({ text, variant = 'contained', onClick }: ButtonProps): JSX.Element => {
	const baseClass = 'text-base font-semibold m-0 cursor-pointer select-none';

	const styles = {
		text: `${baseClass} px-4 py-2 text-left text-success w-full`,
		contained: `${baseClass} bg-blue py-2.5 px-5 rounded-lg`,
		danger: '!text-white bg-danger',
		outlined: 'bg-transparent  py-2.5 px-5 border border-success rounded-lg',
		textDisabled: '!text-darkgray !cursor-not-allowed',
		slim: '!py-1.5 !px-5 !rounded-md !text-white',
		textSlim: '!text-danger !font-bold',
		long: 'w-11/12',
		containedDisabled: '!text-darkgray bg-disabled !cursor-not-allowed',
	};

	const variantStyles = {
		'text': styles.text,
		'text-slim': `${styles.text} ${styles.textSlim}`,
		'text-disabled': `${styles.text} ${styles.textDisabled}`,
		'outlined': `${styles.text} ${styles.outlined}`,
		'contained-danger': `${styles.contained} ${styles.danger}`,
		'contained-danger-slim': `${styles.contained} ${styles.danger} ${styles.slim}`,
		'contained-disabled': `${styles.contained} ${styles.containedDisabled}`,
		'contained-long': `${styles.contained} ${styles.long}`,
		'contained-long-disabled': `${styles.contained} ${styles.long} ${styles.containedDisabled}`,
		'contained-slim': `${styles.contained} ${styles.slim}`,
		'contained': styles.contained,
	};

	const className = variantStyles[variant] || variantStyles['contained'];

	return (
		<button
			className={classNames(className, { 'cursor-pointer': variant !== 'text-disabled' })}
			onClick={variant.includes('disabled') ? undefined : onClick}
			disabled={variant.includes('disabled')}
		>
			{text}
		</button>
	);
};

export default Button;