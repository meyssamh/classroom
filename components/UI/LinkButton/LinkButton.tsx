import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { LinkButtonProps } from '$/declaration';

/**
 * Functional component of a button with link navigation functionality.
 * This component has four variants:
 * 
 * 1. contained
 * 2. contained-slim
 * 3. text
 * 4. text-disabled (default)
 *
 * Note: The text-disabled variant is the default variant!
 * 
 * @param {string} text Text to show in the button.
 * @param {string} link The link we want to navigate to. Optional!
 * @param {string} variant Variant of the LinkButton.
 * 
 * @returns {JSX.Element} A button with link navigation ability.
 */
const LinkButton = ({ text, link = '', variant = 'text-disabled' }: LinkButtonProps): JSX.Element => {
	const baseClasses = {
		button: 'bg-blue py-2.5 px-5 rounded-xl outline-0 border-0 cursor-pointer',
		link: 'no-underline',
		slim: 'text-white py-1.25 px-4',
		text: 'text-darkgray bg-transparent outline-0 border-0 cursor-pointer font-normal',
		disabled: 'text-[#f3f3f3] cursor-not-allowed',
	};

	const buttonClass = classNames({
		[baseClasses.button]: variant === 'contained',
		[baseClasses.slim]: variant === 'contained-slim',
		[baseClasses.text]: variant === 'text',
		[baseClasses.disabled]: variant === 'text-disabled',
	});

	const buttonContent = (
		<button className={buttonClass} disabled={variant === 'text-disabled'}>
			{text}
		</button>
	);

	return variant === 'text-disabled' || !link ? (
		buttonContent
	) : (
		<Link href={link} passHref>
			<p className={baseClasses.link}>
				{buttonContent}
			</p>
		</Link>
	);
};

export default LinkButton;