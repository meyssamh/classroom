import * as React from 'react';
import { useSelector } from 'react-redux';

import { Sessions, Students } from '$/redux';
import { RootState } from '@/lib/store';

/**
 * Functional component that makes rows for table's body.
 *
 * @returns {JSX.Element} Rows for table's body.
 */
const Row = (): JSX.Element => {

	// Redux state
	const students: Students[] = useSelector((state: RootState) => state.class.data.students);
	const sessions: Sessions[] = useSelector((state: RootState) => state.class.data.sessions);

	// Situation of student
	const studentSituations = sessions.reduce((acc, session) => {
		Object.entries(session.situation).forEach(([studentId, status]) => {
			if (!acc[studentId]) acc[studentId] = [];
			acc[studentId].push(status);
		});
		return acc;
	}, {} as Record<string, boolean[]>);

	// Helper function to render the correct icon
	const renderIcon = (status: boolean | undefined): JSX.Element => {
		if (status === true) {
			return (
				<td>
					<section className={'block w-[30px] mx-auto'}>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
							<path
								d="M7.1875 16.0831L10.4249 20.5172C11.4396 21.907 13.5224 21.88 14.5008 20.4644L22.8125 8.4375"
								stroke="#2e3452"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</section>
				</td>
			);
		} else if (status === false) {
			return (
				<td>
					<section className={'block w-[30px] mx-auto'}>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
							<path
								d="M21.5625 8.4375L8.4375 21.5625"
								stroke="#fe767f"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8.4375 8.4375L21.5625 21.5625"
								stroke="#fe767f"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</section>
				</td>
			);
		} else {
			return (
				<td className="text-center pt-0.5">
					<section className={'block w-[30px] mx-auto'}>
						<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 96 960 960" fill="#a8a8a8">
							<path d="M200 606v-60h560v60H200Z" />
						</svg>
					</section>
				</td>
			);
		}
	};

	// Generate the table rows with student names and their situations
	const studentRows = students.map((student) => (
		<tr className={"even:bg-white odd:bg-unresolved hover:bg-[#dddddd]"} key={student.id}>
			{/* Student's name */}
			<td className="text-custom pl-[13px] text-[0.875rem]">
				{student.firstname} {student.lastname}
			</td>
			{/* Student's situations */}
			{studentSituations[student.id]?.map((status, index) => (
				<React.Fragment key={`${student.id}-${index}`}>
					{renderIcon(status)}
				</React.Fragment>
			))}
		</tr>
	));

	return (
		<>
			{studentRows}
		</>
	);
};

export default Row;