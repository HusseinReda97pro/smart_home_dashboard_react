import { Alert, Row, Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../../state/actions/courses';
import SingleTeacher from './SingleTeacher';

const TeacherList = ({ localSearch, searchTerm }) => {
	const dispatch = useDispatch();

	// * states
	const { teacherListLoading, teachers, teacherListError } = useSelector(
		state => state.teacher
	);

	useEffect(() => {
		dispatch(getAllTeachers());
	}, [dispatch]);

	const teacherItems = () => (
		<Row gutter={[10, 10]}>
			{teachers?.length === 0 ? (
				<Alert message='No teachers' type='info' />
			) : teachers?.filter(localSearch(searchTerm)).length === 0 ? (
				<Alert
					message='No teachers matched your keywords'
					type='info'
				/>
			) : (
				<Space wrap>
					{teachers?.filter(localSearch(searchTerm)).map(teacher => (
						<SingleTeacher teacher={teacher} key={teacher._id} />
					))}
				</Space>
			)}
		</Row>
	);

	return (
		<div style={{ marginTop: '25px' }}>
			{teacherListLoading ? (
				<Spin />
			) : teacherListError ? (
				<Alert message={teacherListError} type='error' />
			) : (
				teacherItems()
			)}
		</div>
	);
};

export default TeacherList;
