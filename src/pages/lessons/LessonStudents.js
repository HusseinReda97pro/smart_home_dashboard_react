import { Alert, Button, Popover, Spin } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLessonStudents } from '../../state/actions/lesson';

const LessonStudents = ({ courseId, lessonId }) => {
	const dispatch = useDispatch();

	// * state
	const { lessonStudents, lessonStudentsLoading, lessonStudentsError } =
		useSelector(state => state.lesson);

	useEffect(() => {
		dispatch(getLessonStudents(courseId, lessonId));
	}, [dispatch, courseId, lessonId,]);

	let studentItems = () =>
		lessonStudentsLoading ? (
			<Spin />
		) : lessonStudentsError ? (
			<Alert message={lessonStudentsError} type='error' />
		) : (
			lessonStudents?.map(std => <p key={std._id}>{std.count + "/" + std.maxCount + ' * ' + std.email}</p>)
		);

	return (
		<Popover
			content={studentItems()}
			title='Lesson Students'
			trigger='click'
		>
			<Button type='primary' onClick={() => {
				dispatch(getLessonStudents(courseId, lessonId));

			}}>Students</Button>
		</Popover>
	);
};

export default LessonStudents;
