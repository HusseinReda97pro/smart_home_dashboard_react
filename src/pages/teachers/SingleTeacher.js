import { Button, Col, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Fragment } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeacher } from '../../state/actions/courses';

const SingleTeacher = ({ teacher }) => {
	const [firstName, setFirstName] = useState(teacher.firstName);
	const [lastName, setLastName] = useState(teacher.lastName);
	const [email, setEmail] = useState(teacher.email);
	const [phoneNumber, setPhoneNumber] = useState(teacher.phoneNumber);
	const [password, setPassword] = useState(teacher.password);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const dispatch = useDispatch();

	const handleModalVisible = () => setIsModalVisible(!isModalVisible);

	const handleCreateTeacher = e => {
		e.preventDefault();

		dispatch(
			updateTeacher(teacher?._id, {
				firstName,
				lastName,
				email,
				phoneNumber,
				password,
			})
		);
	};

	const { teacherUpdateLoading } = useSelector(state => state.teacher);

	const teacherUpdateForm = () => (
		<Modal
			title='Update teacher'
			centered
			visible={isModalVisible}
			onOk={handleCreateTeacher}
			confirmLoading={teacherUpdateLoading}
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
				</Row>
			</form>
		</Modal>
	);

	return (
		<Fragment>
			<Button type='primary' onClick={handleModalVisible}>
				{teacher.email}
			</Button>
			{teacherUpdateForm()}
		</Fragment>
	);
};

export default SingleTeacher;
