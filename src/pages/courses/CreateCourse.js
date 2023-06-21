import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, getAllTeachers } from '../../state/actions/courses';
import {
	getUniversityFaculties,
	getAllUniversities,
} from '../../state/actions/universities';
import AdminLayout from '../../components/AdminLayout';
import CourseList from './CourseList';
import localSearch from '../../utils/localSearch';
import { CreateCoursePage } from '../../styles/pages';
import { Description, Heading } from '../../styles/titles';
import { Row, Modal, Button, Input, Select, Col, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { getFacultyTypes } from '../../state/actions/faculties';

const { Option } = Select;

const CreateCourse = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [teacher, setTeacher] = useState('');
	const [label, setLabel] = useState('');
	// eslint-disable-next-line
	const [university, setUniversity] = useState('');
	const [faculty, setFaculty] = useState('');
	const [level, setLevel] = useState('');
	// const [type, setType] = useState('');
	const [facultyType, setFacultyType] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const handleModalVisible = () => setIsModalVisible(!isModalVisible);

	// * states
	const {
		courseCreateSuccess,
		courseCreateError,
		courseCreateLoading,
		courseEditSuccess,
		courseEditError,
	} = useSelector(state => state.course);
	const { teachers } = useSelector(state => state.teacher);
	const { universities, universityFaculties } = useSelector(
		state => state.university
	);
	const { facultyTypes } = useSelector(state => state.faculty);

	const handleUniversityChange = e => {
		setUniversity(e.value);
		dispatch(getUniversityFaculties(e.value));
	};

	const handleFacultyChange = e => {
		setFaculty(e);
		dispatch(getFacultyTypes(e));
	};

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(
			createCourse({
				title,
				description,
				facultyId: faculty,
				label,
				teacher,
				image: imageUrl,
				level,
				type: facultyType,
			})
		);
	};

	useEffect(() => {
		dispatch(getAllTeachers());
		dispatch(getAllUniversities());
	}, [dispatch]);

	useEffect(() => {
		if (courseCreateSuccess) {
			setIsModalVisible(false);
			message.success('Course Created Successfully!', 3);
		}

		if (courseEditSuccess) {
			message.success('Course Updated Successfully!', 3);
		}

		if (courseEditError) {
			message.error(courseEditError, 3);
		}

		if (courseCreateError) {
			message.error('Error occured, please try again!', 3);
		}
	}, [
		courseCreateSuccess,
		courseEditSuccess,
		courseEditError,
		courseCreateError,
	]);

	const courseCreateForm = () => (
		<Modal
			title='Create new course'
			centered
			visible={isModalVisible}
			onOk={handleSubmit}
			confirmLoading={courseCreateLoading}
			okText='Create'
			onCancel={handleModalVisible}
			width={1000}
		>
			<form onSubmit={handleSubmit}>
				<Row gutter={[10, 10]}>
					<Col xs={24} md={12}>
						<label>
							Title
							<Input
								value={title}
								placeholder='Type course title'
								onChange={e => setTitle(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Description
							<Input
								value={description}
								placeholder='Type course description'
								onChange={e => setDescription(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Image URL
							<Input
								value={imageUrl}
								placeholder='Type course image url'
								onChange={e => setImageUrl(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Course Teacher
							<Select
								labelInValue
								defaultValue={{ value: 'Select Teacher' }}
								onChange={e => setTeacher(e.value)}
								size='large'
								style={{ width: '100%' }}
							>
								{teachers?.length > 0 &&
									teachers.map(teacher => (
										<Option
											value={teacher._id}
											key={teacher._id}
										>
											{teacher.firstName}
										</Option>
									))}
							</Select>
						</label>
					</Col>

					<Col xs={24} md={12}>
						<label>
							Course Label
							<Input
								value={label}
								placeholder='Type course label'
								onChange={e => setLabel(e.target.value)}
								size='large'
							/>
						</label>
					</Col>

					<Col xs={24} md={12}>
						<label>
							University
							<Select
								labelInValue
								defaultValue={{ value: 'Select University' }}
								onChange={handleUniversityChange}
								size='large'
								style={{ width: '100%' }}
							>
								{universities?.length > 0 &&
									universities.map(unversity => (
										<Option
											value={unversity._id}
											key={unversity._id}
										>
											{unversity.name}
										</Option>
									))}
							</Select>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Faculty
							<Select
								placeholder='Select Faculty'
								onChange={handleFacultyChange}
								size='large'
								style={{ width: '100%' }}
							>
								{universityFaculties?.length > 0 &&
									universityFaculties.map(
										universityFaculty => (
											<Option
												value={universityFaculty._id}
												key={universityFaculty._id}
											>
												{universityFaculty.name}
											</Option>
										)
									)}
							</Select>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Faculty Type
							<Select
								placeholder='Select Faculty Type'
								onChange={e => setFacultyType(e)}
								size='large'
								style={{ width: '100%' }}
							>
								{facultyTypes?.length > 0 &&
									facultyTypes.map(facultyType => (
										<Option
											value={facultyType._id}
											key={facultyType._id}
										>
											{facultyType.name}
										</Option>
									))}
							</Select>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Course Level
							<Select
								labelInValue
								defaultValue={{ value: 'Select Level' }}
								onChange={e => setLevel(e.value)}
								size='large'
								style={{ width: '100%' }}
							>
								<Option value='1'>1</Option>
								<Option value='2'>2</Option>
								<Option value='3'>3</Option>
								<Option value='4'>4</Option>
								<Option value='5'>5</Option>
							</Select>
						</label>
					</Col>
				</Row>
			</form>
		</Modal>
	);

	return (
		<AdminLayout>
			<CreateCoursePage>
				<Heading level={4}>Courses</Heading>
				<Description type='secondary'>
					Create and filter courses
				</Description>
				<Row gutter={[10, 10]} justify='space-between'>
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
						>
							Create
						</Button>
						{courseCreateForm()}
					</div>
				</Row>
				<CourseList localSearch={localSearch} searchTerm={searchTerm} />
			</CreateCoursePage>
		</AdminLayout>
	);
};

export default CreateCourse;
