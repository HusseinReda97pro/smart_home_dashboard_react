import { memo } from 'react';

const SingleStudent = ({ student }) => {
	return (
		<tr>
			<td>{student.firstName}</td>
			<td>{student.lastName}</td>
			<td>{student.email}</td>
			<td>{student.phoneNumber}</td>
		</tr>
	);
};

export default memo(SingleStudent, (prevProps, nextProps) => {
	return prevProps.student.email === nextProps.student.email &&
		prevProps.student.firstName === nextProps.student.firstName &&
		prevProps.student.lastName === nextProps.student.lastName &&
		prevProps.student.phoneNumber === nextProps.student.phoneNumber
		? true
		: false;
});
