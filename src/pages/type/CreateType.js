import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/AdminLayout';
import TypeList from './TypeList';
import { createType } from '../../state/actions/type';
import { Description, Heading } from '../../styles/titles';
import { CreateTypePage } from '../../styles/pages';

import { Row, Input, Button, Col, Modal, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const CreateType = () => {
	const [name, setName] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();

	const handleModalVisible = () => setIsModalVisible(!isModalVisible);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(createType({ name }));
	};

	// * states
	const {
		typeCreateLoading,
		typeCreateSuccess,
		typeCreateError,
		typeDeleteError,
		typeDeleteSuccess,
		typeUpdateSuccess,
		typeUpdateError,
	} = useSelector(state => state.type);

	useEffect(() => {
		if (typeCreateSuccess) {
			message.success('Type Created Successfully!', 3);
		}

		if (typeCreateError) {
			message.error(typeCreateError, 3);
		}

		if (typeDeleteSuccess) {
			message.success('Type deleted!', 3);
		}

		if (typeDeleteError) {
			message.error(typeDeleteError, 3);
		}

		if (typeUpdateSuccess) {
			message.success('Type updated!', 3);
		}

		if (typeUpdateError) {
			message.error(typeUpdateError, 3);
		}
	}, [
		typeCreateSuccess,
		typeDeleteError,
		typeDeleteSuccess,
		typeCreateError,
		typeUpdateError,
		typeUpdateSuccess,
	]);

	const localSearch = term => type => {
		return type.name.toLowerCase().includes(term);
	};

	const typeCreateForm = () => (
		<Modal
			title='Create new type'
			centered
			visible={isModalVisible}
			onOk={handleSubmit}
			confirmLoading={typeCreateLoading}
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
								placeholder='Type name'
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
			<CreateTypePage>
				<Heading level={4}>Types</Heading>
				<Description type='secondary'>
					Create and filter types
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
						{typeCreateForm()}
					</div>
				</Row>
				<TypeList localSearch={localSearch} searchTerm={searchTerm} />
			</CreateTypePage>
		</AdminLayout>
	);
};

export default CreateType;
