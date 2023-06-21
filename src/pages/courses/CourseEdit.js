import { useState, memo } from 'react';
import { Button, Col, Input, Row, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { editCourse } from '../../state/actions/courses';

const { Option } = Select;

const CourseEdit = ({ course }) => {
	const [title, setTitle] = useState(course.title);
	const [description, setDescription] = useState(course.description);
	const [imageUrl, setImageUrl] = useState(course.imageUrl);
	const [label, setLabel] = useState(course.label);
	const [level, setLevel] = useState(course.level);
	const [type, setType] = useState(course.type);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const handleModalVisible = () => setIsModalVisible(!isModalVisible);

	const handleEditCourse = e => {
		e.preventDefault();

		dispatch(
			editCourse({
				courseId: course._id,
				title,
				description,
				label,
				image: imageUrl,
				level,
				type,
			})
		);
	};

	const { courseEditLoading } = useSelector(state => state.course);

	const courseEditForm = () => (
		<Modal
			title='Edit this course'
			centered
			visible={isModalVisible}
			onOk={handleEditCourse}
			confirmLoading={courseEditLoading}
			okText='Edit'
			onCancel={handleModalVisible}
			width={1000}
		>
			<form onSubmit={handleEditCourse}>
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
							Course Level
							<Select
								labelInValue
								defaultValue={{ value: level }}
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
					<Col xs={24} md={12}>
						<label>
							Course Type
							<Select
								labelInValue
								defaultValue={{ value: type }}
								onChange={e => setType(e.value)}
								size='large'
								style={{ width: '100%' }}
							>
								<Option value='general'>Genearl</Option>
								<Option value='clinical'>Clinical</Option>
							</Select>
						</label>
					</Col>
				</Row>
			</form>
		</Modal>
	);

	return (
		<>
			<Button onClick={handleModalVisible}>Edit</Button>
			{courseEditForm()}
		</>
	);
};

export default memo(CourseEdit, (prevProps, nextProps) => {
	return prevProps.course._id === nextProps.course._id &&
		prevProps.course.title === nextProps.course.title &&
		prevProps.course.description === nextProps.course.description &&
		prevProps.course.imageUrl === nextProps.course.imageUrl &&
		prevProps.course.label === nextProps.course.label &&
		prevProps.course.level === nextProps.course.level &&
		prevProps.course.type === nextProps.course.type &&
		prevProps.course.enabled === nextProps.course.enabled
		? true
		: false;
});
