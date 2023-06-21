import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, message, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/AdminLayout';
import { createTeacher } from '../../state/actions/courses';
import { TeacherPage } from '../../styles/pages';
import { Description, Heading } from '../../styles/titles';
import TeacherList from './TeacherList';

const Teacher = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [profilePicture, setProfilePicture] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const dispatch = useDispatch();

	// * state
	const {
		teacherCreateLoading,
		teacherCreateSuccess,
		teacherCreateError,
		teacherUpdateSuccess,
		teacherUpdateError,
	} = useSelector(state => state.teacher);

	const localSearch = term => user => {
		return (
			user?.firstName?.toLowerCase().includes(term) ||
			user?.email?.toLowerCase().includes(term) ||
			user?.phoneNumber?.includes(term)
		);
	};

	const handleModalVisible = () => setIsModalVisible(!isModalVisible);

	const handleCreateTeacher = e => {
		e.preventDefault();

		dispatch(
			createTeacher({
				firstName,
				lastName,
				email,
				phoneNumber,
				password,
				profilePicture,
			})
		);
	};

	useEffect(() => {
		if (teacherCreateSuccess) {
			message.success('Teacher created', 3);
		}

		if (teacherCreateError) {
			message.error(teacherCreateError, 3);
		}

		if (teacherUpdateSuccess) {
			message.success('Teacher updated', 3);
		}

		if (teacherUpdateError) {
			message.error(teacherUpdateError, 3);
		}
	}, [
		teacherCreateSuccess,
		teacherCreateError,
		teacherUpdateError,
		teacherUpdateSuccess,
	]);

	const teacherCreateForm = () => (
		<Modal
			title='Create new teacher'
			centered
			visible={isModalVisible}
			onOk={handleCreateTeacher}
			confirmLoading={teacherCreateLoading}
			okText='Create'
			onCancel={handleModalVisible}
		>
			<form onSubmit={handleCreateTeacher}>
				<Row gutter={[10, 10]}>
					<Col xs={24} md={12}>
						<label>
							First Name
							<Input
								value={firstName}
								placeholder='Type first name'
								onChange={e => setFirstName(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Last Name
							<Input
								value={lastName}
								placeholder='Type last name'
								onChange={e => setLastName(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Email
							<Input
								value={email}
								placeholder='Type email'
								onChange={e => setEmail(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Phone Number
							<Input
								value={phoneNumber}
								placeholder='Type phone number'
								onChange={e => setPhoneNumber(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Teacher Password
							<Input
								value={password}
								placeholder='Type password'
								onChange={e => setPassword(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
					<Col xs={24} md={12}>
						<label>
							Profile Picture
							<input
								type='file'
								onChange={e =>
									setProfilePicture(e.target.files[0])
								}
							/>
						</label>
					</Col>
				</Row>
			</form>
		</Modal>
	);

	return (
		<AdminLayout>
			<TeacherPage>
				<Heading level={4}>Teachers</Heading>
				<Description type='secondary'>Manage teachers</Description>
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
						{teacherCreateForm()}
					</div>
				</Row>
				<TeacherList
					localSearch={localSearch}
					searchTerm={searchTerm}
				/>
			</TeacherPage>
		</AdminLayout>
	);
};

export default Teacher;
