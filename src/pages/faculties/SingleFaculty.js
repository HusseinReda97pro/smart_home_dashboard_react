import { Button, Space, Popover, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFaculty, deleteFaculty } from '../../state/actions/faculties';

const SingleFaculty = ({ faculty }) => {
	const [name, setName] = useState(faculty.name);

	const dispatch = useDispatch();

	const handleUpdateFaculty = id => {
		dispatch(updateFaculty(id, name));
	};

	const handleDeleteFaculty = id => {
		dispatch(deleteFaculty(id));
	};

	const { facultyUpdateLoading, facultyDeleteLoading } = useSelector(
		state => state.faculty
	);

	const facultyDetails = () => (
		<Space direction='vertical'>
			<Input
				value={name}
				placeholder='Type new name'
				onChange={e => setName(e.target.value)}
			/>
			<Space>
				<Button
					loading={facultyUpdateLoading}
					onClick={() => handleUpdateFaculty(faculty?._id, name)}
					type='primary'
				>
					Update
				</Button>
				<Button
					loading={facultyDeleteLoading}
					onClick={() => handleDeleteFaculty(faculty?._id)}
					type='danger'
				>
					Delete
				</Button>
			</Space>
		</Space>
	);

	return (
		<Popover
			content={facultyDetails}
			title='Update Faculty'
			trigger='click'
			key={faculty._id}
		>
			<Button type='primary'>{faculty.name}</Button>
		</Popover>
	);
};

export default SingleFaculty;
