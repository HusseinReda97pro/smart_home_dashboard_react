import { Row, Alert, Spin, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUniversities } from '../../state/actions/universities';
import SingleUniveristy from './SingleUniveristy';

const UniversityList = ({ localSearch, searchTerm }) => {
	const dispatch = useDispatch();

	// * states
	const { universityListLoading, universities, universityListError } =
		useSelector(state => state.university);

	useEffect(() => {
		dispatch(getAllUniversities());
	}, [dispatch]);

	const universityItems = () => (
		<Row gutter={[10, 10]}>
			{universities?.length === 0 ? (
				<Alert message='No universities' type='info' />
			) : universities?.filter(localSearch(searchTerm)).length === 0 ? (
				<Alert
					message='No universities matched your keywords'
					type='info'
				/>
			) : (
				<Space wrap>
					{universities
						?.filter(localSearch(searchTerm))
						.map(university => (
							<SingleUniveristy
								university={university}
								key={university._id}
							/>
						))}
				</Space>
			)}
		</Row>
	);

	return (
		<div style={{ marginTop: '25px' }}>
			{universityListLoading ? (
				<Spin />
			) : universityListError ? (
				<Alert message={universityListError} type='error' />
			) : (
				universityItems()
			)}
		</div>
	);
};

export default UniversityList;
