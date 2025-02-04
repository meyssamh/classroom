'use client'

import React from 'react';

import Button from '../Button/Button';
import { ButtonPropsVariant, TagProps } from '$/declaration';

/**
 * Functional component for different variants of tags.
 * Supports 'delete', 'edit', and 'open' variants.
 * 
 * @param {TagProps} props The props for the Tag component.
 * @returns {JSX.Element} A tag element with customizable text and button.
 */
const Tag: React.FC<TagProps> = ({ text, buttonText, variant = 'open', onClick }) => {

	const classes = {
		variants: {
			delete: 'contained-danger-slim',
			edit: 'contained-slim',
			open: 'contained-slim',
		},
	};

	const buttonVariant = classes.variants[variant as ButtonPropsVariant];

	return (
		<div className={'inline-flex w-64 p-0.5 pl-5 justify-between mx-auto items-center rounded-lg bg-gray-200'} role={variant}>
			{/* Display the name */}
			<strong className={'w-5/12 font-semibold truncate cursor-default select-none'} role="text" title={text}>
				{text}
			</strong>
			{/* Render the button */}
			<Button variant={buttonVariant} text={buttonText} onClick={onClick} />
		</div>
	);
};

export default Tag;