import * as React from 'react';

import Row from './Row/Row';

/**
 * Functional component for table's body.
 *
 * @returns {JSX.Element} Table's body.
 */
const Body = (): JSX.Element => {

	return (
		<tbody>
			<Row />
		</tbody>
	);
};

export default Body;