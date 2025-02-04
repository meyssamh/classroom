import * as React from 'react';

import { BodyProps } from '$/declaration';

/**
 * Functional component for body of dashboard.
 *
 * @param {ReactNode} buttons Button/s at the top of body.
 * @param {ReactNode} children Content of the body.
 * 
 * @returns {JSX.Element} Body of the dashboard.
 */
const Body = ({ buttons, children }: BodyProps): JSX.Element => {

	const classes = {
		header: 'flex items-center justify-between mt-[30px]',
		button: 'flex items-center gap-[30px]',
		children: 'mt-[30px] w-full h-screen bg-white',
	};

	return (
		<>
			<section className={classes.header}>
				<section className={classes.button}>
					{buttons}
				</section>
			</section>
			<section className={classes.children} role={'children'}>
				{children}
			</section>
		</>
	);
};

export default Body;