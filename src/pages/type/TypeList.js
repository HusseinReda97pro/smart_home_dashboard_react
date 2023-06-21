import { Row, Alert, Spin, Space } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes } from '../../state/actions/type';
import SingleType from './SingleType';

const TypeList = ({ localSearch, searchTerm }) => {
	const dispatch = useDispatch();

	// * states
	const { typeListLoading, types, typeListError } = useSelector(
		state => state.type
	);

	useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const typeItems = () => (
		<Row gutter={[10, 10]}>
			{types?.length === 0 ? (
				<Alert message='No types' type='info' />
			) : types?.filter(localSearch(searchTerm)).length === 0 ? (
				<Alert message='No types matched your keywords' type='info' />
			) : (
				<Space wrap>
					{types?.filter(localSearch(searchTerm)).map(type => (
						<SingleType type={type} key={type._id} />
					))}
				</Space>
			)}
		</Row>
	);

	return (
		<div style={{ marginTop: '25px' }}>
			{typeListLoading ? (
				<Spin />
			) : typeListError ? (
				<Alert message={typeListError} type='error' />
			) : (
				typeItems()
			)}
		</div>
	);
};

export default TypeList;
