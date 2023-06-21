import { Alert, Spin } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AdminLayout from '../../components/AdminLayout';
import { getCourseStudents } from '../../state/actions/courses';
import { CourseStudentsPage, SingleHistory } from '../../styles/pages';
import { Description, Heading } from '../../styles/titles';
import SingleStudent from './SingleStudent';

const CourseStudents = () => {
	const dispatch = useDispatch();
	const { courseId } = useParams();

	// * state
	const { courseStudents, courseStudentsLoading, courseStudentsError } =
		useSelector(state => state.course);

	useEffect(() => {
		dispatch(getCourseStudents(courseId));
	}, [dispatch, courseId]);

	const studentItems = () => (
		<SingleHistory>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone Number</th>
					</tr>
				</thead>
				<tbody>
					{courseStudents?.map(student => (
						<SingleStudent student={student} key={student._id} />
					))}
				</tbody>
			</table>
		</SingleHistory>
	);

	return (
		<AdminLayout>
			<CourseStudentsPage>
				<Heading level={4}>Course Students</Heading>
				<Description type='secondary'>
					List of this course studnets
				</Description>
				{/* <Row gutter={[10, 10]} justify='space-between'>
                    <div>
                        <Input 
                            value={searchTerm}
                            placeholder='Type a search keyword'
                            onChange={e => setSearchTerm(e.target.value)} 
                            prefix={<SearchOutlined />}
                        />
                    </div>
                    <div>
                        <Button 
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={handleModalVisible}
                        >Create</Button>
                        {courseCreateForm()}
                    </div>
                </Row> */}
				{courseStudentsLoading ? (
					<Spin />
				) : courseStudentsError ? (
					<Alert message={courseStudentsError} type='error' />
				) : courseStudents?.length > 0 ? (
					studentItems()
				) : (
					<Alert message='No students' type='info' />
				)}
			</CourseStudentsPage>
		</AdminLayout>
	);
};

export default CourseStudents;
