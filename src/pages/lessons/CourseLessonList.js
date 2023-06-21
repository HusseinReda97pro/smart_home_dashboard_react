import { Alert, Col, Row, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseLessons } from '../../state/actions/lesson';
import SingleLesson from './SingleLesson';

const CourseLessonList = ({ courseId, localSearch, searchTerm }) => {
	const dispatch = useDispatch();

	// * lesson state
	const lesson = useSelector(state => state.lesson);
	const { lessons, lessonListLoading, lessonListError } = lesson;

	useEffect(() => {
		dispatch(getCourseLessons(courseId));
	}, [dispatch, courseId]);

	const lessonItems = () => (
		<Row gutter={[10, 10]}>
			{lessons?.length === 0 ? (
				<Alert message='No lessons' type='info' />
			) : lessons?.filter(localSearch(searchTerm)).length === 0 ? (
				<Alert message='No lessons matched your keywords' type='info' />
			) : (
				lessons?.filter(localSearch(searchTerm)).map(lesson => (
					<Col xs={24} md={12} xl={6} key={lesson._id}>
						<SingleLesson
							courseId={courseId}
							lesson={lesson}
							key={lesson._id}
						/>
					</Col>
				))
			)}
		</Row>
	);

	console.log({ lessons });

	return (
		<div style={{ marginTop: '25px' }}>
			{lessonListLoading ? (
				<Spin />
			) : lessonListError ? (
				<Alert message={lessonListError} type='error' />
			) : (
				lessonItems()
			)}
		</div>
	);
};

export default CourseLessonList;
