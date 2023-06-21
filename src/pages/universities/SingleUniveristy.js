import { Button, Space, Popover, List, Input } from 'antd';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateUniversity,
	deleteUniversity,
} from '../../state/actions/universities';

const SingleUniveristy = ({ university }) => {
	const [name, setName] = useState(university.name);

	const dispatch = useDispatch();

	// * state
	const { universityDeleteLoading, universityUpdateLoading } = useSelector(
		state => state.university
	);

	const handleUpdateUniversity = useCallback(
		id => {
			dispatch(updateUniversity(id, name));
		},
		[dispatch, name]
	);

	const handleDeleteUniversity = useCallback(
		id => {
			dispatch(deleteUniversity(id));
		},
		[dispatch]
	);

	const showUniversityFas = university => (
		<Space direction='vertical'>
			{university?.faculties?.map(faculty => (
				<List size='small' key={faculty._id}>
					<List.Item>{faculty.name}</List.Item>
				</List>
			))}
			<Space direction='vertical'>
				<Input
					value={name}
					placeholder='Type new name'
					onChange={e => setName(e.target.value)}
				/>
				<Space>
					<Button
						loading={universityUpdateLoading}
						onClick={() => handleUpdateUniversity(university?._id)}
						type='primary'
					>
						Update
					</Button>
					<Button
						onClick={() => handleDeleteUniversity(university?._id)}
						loading={universityDeleteLoading}
						type='danger'
					>
						Delete
					</Button>
				</Space>
			</Space>
		</Space>
	);

	return (
		<Popover
			content={showUniversityFas(university)}
			title='University Faculties'
			trigger='click'
			key={university._id}
		>
			<Button type='primary'>{university.name}</Button>
		</Popover>
	);
};

export default memo(SingleUniveristy);
