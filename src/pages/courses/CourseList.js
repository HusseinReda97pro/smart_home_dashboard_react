import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Spin, Alert, Select } from 'antd';
import { getAllCourses } from '../../state/actions/courses';
import { getAllTypes } from '../../state/actions/type';
import { Switch } from 'antd';
import { Button } from 'antd';
import { updateCourse, archiveCourse } from '../../state/actions/courses';
import CourseEdit from './CourseEdit';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const CourseList = ({ localSearch, searchTerm }) => {
	const [level, setLevel] = useState('');
	const [type, setType] = useState('');

	const dispatch = useDispatch();
	const location = useLocation();

	// * course state
	const { courses, courseListLoading, courseListError, courseUpdateLoading } =
		useSelector(state => state.course);
	const { types } = useSelector(state => state.type);
	let archived;
	try {

		archived = location.state.archived;
	} catch (_) {
		archived = false;
	}
	useEffect(() => {

		if (!archived) archived = false;
		dispatch(getAllCourses(level, type, archived));
	}, [dispatch, level, type, archived]);

	useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const handleCourseEnable = (checked, course) => {
		dispatch(
			updateCourse({
				courseId: course?._id,
				enabled: checked,
			})
		);
	};

	const handleCourseArchived = (course) => {
		dispatch(
			archiveCourse({
				course: course,
			})
		);
		// courses = courses.filter(function (c) {
		// 	return c._id !== course._id;
		// });
	};


	const handleAllChange = () => {
		setLevel('');
		setType('');
	};

	const courseItems = () => (
		<Row gutter={[10, 10]}>
			{courses?.length === 0 ? (
				<Alert message='No courses' type='info' />
			) : courses?.filter(localSearch(searchTerm)).length === 0 ? (
				<Alert message='No courses matched your keywords' type='info' />
			) : (
				courses?.filter(localSearch(searchTerm)).map(course => (
					<Col xs={24} md={12} xl={8} key={course._id}>
						<Card
							type='flux'
							actions={[
								<Row>
									<Col style={{ width: "30%" }}>
										<Link to={`/courses/${course._id}`}>
											<Button type='primary'>View</Button>
										</Link>
									</Col>
									<Col style={{ width: "40%" }}>

										<CourseEdit course={course} />
									</Col>
									<Col style={{ width: "30%" }}>

										<Link to={`/courses/${course._id}/students`}>
											<Button type='primary'>Students</Button>
										</Link>
									</Col>

									<Button style={{ margin: "1.5rem auto 0", background: course.archived ? 'grey' : '' }} type='primary'
										onClick={() => {
											handleCourseArchived(course)
										}}
									>{course.archived ? "UnArchived" : "Move to Archive"}</Button>
								</Row>
							]}
							extra={
								<Switch
									loading={courseUpdateLoading}
									checkedChildren={<CheckOutlined />}
									unCheckedChildren={<CloseOutlined />}
									checked={course.enabled}
									onChange={checked =>
										handleCourseEnable(checked, course)
									}
								/>
							}
							cover={
								<img
									alt={course.title}
									src={
										course.imageUrl
											? course.imageUrl
											: 'https://i.stack.imgur.com/y9DpT.jpg'
									}
								/>
							}
							title={course.title}
							style={{ boxShadow: 'var(--bs)', height: '100%' }}
						>
							{course.description}
						</Card>
					</Col >
				))
			)}
		</Row >
	);

	return (
		<div style={{ marginTop: '25px' }}>
			<Row gutter={[10, 10]} style={{ marginBottom: '25px' }}>
				<Col>
					<label>
						<Select
							placeholder='Select Level'
							onChange={e => setLevel(e)}
							size='large'
							defaultValue='All Levels'
							dropdownMatchSelectWidth={false}
						>
							<Select.Option value='' onChange={handleAllChange}>
								All Levels
							</Select.Option>
							<Select.Option value='1'>1</Select.Option>
							<Select.Option value='2'>2</Select.Option>
							<Select.Option value='3'>3</Select.Option>
							<Select.Option value='4'>4</Select.Option>
							<Select.Option value='5'>5</Select.Option>
						</Select>
					</label>
				</Col>
				<Col>
					<label>
						<Select
							placeholder='Select Type'
							onChange={e => setType(e)}
							size='large'
							defaultValue='All Types'
							dropdownMatchSelectWidth={false}
						>
							<Select.Option value='' onChange={handleAllChange}>
								All Types
							</Select.Option>
							{types?.map(type => (
								<Select.Option value={type.name} key={type._id}>
									{type.name}
								</Select.Option>
							))}
						</Select>
					</label>
				</Col>
			</Row>
			{courseListLoading ? (
				<Spin />
			) : courseListError ? (
				<Alert message={courseListError} type='error' />
			) : (
				courseItems()
			)}
		</div>
	);
};

export default CourseList;
