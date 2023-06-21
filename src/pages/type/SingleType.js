import { Button, Space, Popover, Input } from 'antd';
import { useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateType, deleteType } from '../../state/actions/type';

const SingleType = ({ type }) => {
	const [name, setName] = useState(type.name);

	const dispatch = useDispatch();

	const handleUpdateType = useCallback(
		(name, id) => {
			dispatch(updateType(name, id));
		},
		[dispatch]
	);

	const handleDeleteType = useCallback(
		id => {
			dispatch(deleteType(id));
		},
		[dispatch]
	);

	const { typeUpdateLoading, typeDeleteLoading } = useSelector(
		state => state.type
	);

	const typeDetails = () => (
		<Space direction='vertical'>
			<Input
				value={name}
				placeholder='Type new name'
				onChange={e => setName(e.target.value)}
			/>
			<Space>
				<Button
					loading={typeUpdateLoading}
					onClick={() => handleUpdateType(name, type?._id)}
					type='primary'
				>
					Update
				</Button>
				<Button
					loading={typeDeleteLoading}
					onClick={() => handleDeleteType(type?._id)}
					type='danger'
				>
					Delete
				</Button>
			</Space>
		</Space>
	);

	return (
		<Popover
			content={typeDetails}
			title='Update Type'
			trigger='click'
			key={type._id}
		>
			<Button type='primary'>{type.name}</Button>
		</Popover>
	);
};

export default memo(SingleType, (prevProps, nextProps) => {
	return prevProps.name === nextProps.name && prevProps._id === nextProps._id
		? true
		: false;
});
