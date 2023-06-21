import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import FacultyList from './FacultyList';
import { Description, Heading } from '../../styles/titles';
import { CreateFacultyPage } from '../../styles/pages';

import { Row, Input, Button, Col, Modal, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { createFaculty } from '../../state/actions/faculties';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllUniversities,
	getUniversityFaculties,
} from '../../state/actions/universities';
import { getAllTypes } from '../../state/actions/type';

const { Option } = Select;

const CreateFaculty = () => {
	const [name, setName] = useState('');
	const [universityId, setUniversityId] = useState('');
	// eslint-disable-next-line
	const [university, setUniversity] = useState('');
	const [facultyTypes, setFacultyTypes] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const handleModalVisible = () => setIsModalVisible(!isModalVisible);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createFaculty({ name, universityId, types: facultyTypes }));
	};

	const handleUniversityChange = e => {
		setUniversity(e.value);
		dispatch(getUniversityFaculties(e.value));
	};

	// * states
	const {
		universities,
		universityFaculties,
		universityFaculiesListLoading,
		universityFaculiesListError,
	} = useSelector(state => state.university);
	const {
		facultyCreateLoading,
		facultyCreateError,
		facultyCreateSuccess,
		facultyUpdateSuccess,
		facultyUpdateError,
		facultyDeleteSuccess,
		facultyDeleteError,
	} = useSelector(state => state.faculty);
	const { types } = useSelector(state => state.type);

	useEffect(() => {
		dispatch(getAllUniversities());
		dispatch(getAllTypes());
	}, [dispatch]);

	useEffect(() => {
		if (facultyCreateSuccess) {
			message.success('Faculty Created Successfully!', 3);
		}

		if (facultyCreateError) {
			message.error(facultyCreateError, 3);
		}

		if (facultyUpdateSuccess) {
			message.success('Faculty Updated Successfully!', 3);
		}

		if (facultyUpdateError) {
			message.error(facultyUpdateError, 3);
		}

		if (facultyDeleteSuccess) {
			message.success('Faculty Deleted Successfully!', 3);
		}

		if (facultyDeleteError) {
			message.error(facultyDeleteError, 3);
		}
	}, [
		facultyCreateSuccess,
		facultyCreateError,
		facultyUpdateSuccess,
		facultyUpdateError,
		facultyDeleteSuccess,
		facultyDeleteError,
	]);

	const localSearch = term => faculty => {
		return faculty.name.toLowerCase().includes(term);
	};

	const facultyCreateForm = () => (
		<Modal
			title='Create new faculty'
			centered
			visible={isModalVisible}
			onOk={handleSubmit}
			confirmLoading={facultyCreateLoading}
			okText='Create'
			onCancel={handleModalVisible}
		>
			<form onSubmit={handleSubmit}>
				<Row gutter={[10, 10]}>
					<Col xs={24}>
						<label>
							Name
							<Input
								value={name}
								placeholder='Type faculty name'
								onChange={e => setName(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24}>
						<label>
							University
							<Select
								labelInValue
								defaultValue={{ value: 'Select University' }}
								onChange={e => setUniversityId(e.value)}
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
					<Col xs={24}>
						<label>
							Faculty Types
							<Select
								size='large'
								mode='multiple'
								placeholder='Select types'
								value={facultyTypes}
								onChange={e => setFacultyTypes(e)}
								style={{ width: '100%' }}
							>
								{types?.map(type => (
									<Option value={type._id} key={type._id}>
										{type.name}
									</Option>
								))}
							</Select>
						</label>
					</Col>
				</Row>
			</form>
		</Modal>
	);

	return (
		<AdminLayout>
			<CreateFacultyPage>
				<Heading level={4}>Faculties</Heading>
				<Description type='secondary'>
					Create and filter faculties
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
					</div>
					<div>
						<Button
							type='primary'
							icon={<PlusOutlined />}
							onClick={() => handleModalVisible()}
						>
							Create
						</Button>
						{facultyCreateForm()}
					</div>
				</Row>
				<FacultyList
					localSearch={localSearch}
					searchTerm={searchTerm}
					universityFaculties={universityFaculties}
					universityFaculiesListLoading={
						universityFaculiesListLoading
					}
					universityFaculiesListError={universityFaculiesListError}
				/>
			</CreateFacultyPage>
		</AdminLayout>
	);
};

export default CreateFaculty;
