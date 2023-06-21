import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/AdminLayout';
import UniversityList from './UniversityList';
import { createUniversity } from '../../state/actions/universities';
import { Description, Heading } from '../../styles/titles';
import { CreateUnversityPage } from '../../styles/pages';

import { Row, Input, Button, Col, Modal, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const CreateUniversity = () => {
	const [name, setName] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const handleModalVisible = () => setIsModalVisible(!isModalVisible);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createUniversity({ name }));
	};

	// * states
	const {
		universityCreateLoading,
		universityCreateSuccess,
		universityCreateError,
		universityDeleteError,
		universityDeleteSuccess,
		universityUpdateSuccess,
		universityUpdateError,
	} = useSelector(state => state.university);

	useEffect(() => {
		if (universityCreateSuccess) {
			message.success('University Created Successfully!', 3);
		}

		if (universityCreateError) {
			message.error(universityCreateError, 3);
		}

		if (universityDeleteSuccess) {
			message.success('University deleted!', 3);
		}

		if (universityDeleteError) {
			message.error(universityDeleteError, 3);
		}

		if (universityUpdateSuccess) {
			message.success('University updated!', 3);
		}

		if (universityUpdateError) {
			message.error(universityUpdateError, 3);
		}
	}, [
		universityCreateSuccess,
		universityDeleteError,
		universityDeleteSuccess,
		universityCreateError,
		universityUpdateError,
		universityUpdateSuccess,
	]);

	const localSearch = term => university => {
		return university.name.toLowerCase().includes(term);
	};

	const universityCreateForm = () => (
		<Modal
			title='Create new university'
			centered
			visible={isModalVisible}
			onOk={handleSubmit}
			confirmLoading={universityCreateLoading}
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
								placeholder='Type university name'
								onChange={e => setName(e.target.value)}
								size='large'
							/>
						</label>
					</Col>
				</Row>
			</form>
		</Modal>
	);

	return (
		<AdminLayout>
			<CreateUnversityPage>
				<Heading level={4}>Universities</Heading>
				<Description type='secondary'>
					Create and filter universities
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
							onClick={() => handleModalVisible()}
						>
							Create
						</Button>
						{universityCreateForm()}
					</div>
				</Row>
				<UniversityList
					localSearch={localSearch}
					searchTerm={searchTerm}
				/>
			</CreateUnversityPage>
		</AdminLayout>
	);
};

export default CreateUniversity;
