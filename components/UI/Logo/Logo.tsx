import React from 'react';
import Image from 'next/image';

import Icon from '#/icons/blackboard.png';

/**
 * Functional component of the logo and name of the website.
 *
 * @returns {JSX.Element} Logo and name of the website.
 */
const Logo = (): JSX.Element => {
	const classes = {
		logo: 'inline-flex items-center bg-transparent gap-[0.94rem]',
		icon: 'hidden lg:block w-[54px]',
		iconText: 'text-2xl font-bold text-success',
	};

	return (
		<div className={classes.logo} role="banner">
			{/* Logo icon */}
			<Image className={classes.icon} src={Icon} alt="Website Icon" />
			{/* Logo name */}
			<strong className={classes.iconText} role="text">
				Classroom
			</strong>
		</div>
	);
};

export default Logo;