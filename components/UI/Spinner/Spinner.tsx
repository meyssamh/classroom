import React from 'react';

import Overlay from '../Overlay/Overlay';
/**
 * Functional component for a spinner that shows when a fetch is pending.
 *
 * @returns {JSX.Element} A spinner with its own overlay.
 */
const Spinner = (): JSX.Element => {
	return (
		<Overlay>
			<span className="relative inline-block w-12 h-12">
				<span className="absolute inset-0 w-12 h-12 rounded-full border-2 border-white animate-[animloader_2s_linear_infinite]"></span>
				<span className="absolute inset-0 w-12 h-12 rounded-full border-2 border-white animate-[animloader_2s_linear_infinite] delay-[1s]"></span>
			</span>
		</Overlay>
	);
};

export default Spinner;