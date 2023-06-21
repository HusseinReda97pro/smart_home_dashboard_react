import { Row, Alert, Spin, message, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHistories } from '../../state/actions/history';
import { SingleHistory } from '../../styles/pages';
import HistoryItem from './HistoryItem';

const HistoryList = ({ localSearch, searchTerm }) => {
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState(20);
	const [page, setPage] = useState(1);

	// * states
	const {
		historyListLoading,
		histories,
		historyListError,
		updateBalanceError,
		updateBalanceSuccess,
	} = useSelector(state => state.history);

	useEffect(() => {
		dispatch(getAllHistories(pageSize, page));
	}, [dispatch, pageSize, page]);

	useEffect(() => {
		if (updateBalanceSuccess) {
			dispatch(getAllHistories(pageSize, page));
			message.success('Balance Updated Successfully!', 3);
		}

		if (updateBalanceError) {
			message.error(updateBalanceError, 3);
		}
	}, [updateBalanceSuccess, updateBalanceError, dispatch, pageSize, page]);

	const historyItems = () => (
		<Row gutter={[10, 10]}>
			{histories?.length === 0 ? (
				<Alert message='No histories' type='info' />
			) : histories?.filter(localSearch(searchTerm)).length === 0 ? (
				<Alert
					message='No histories matched your keywords'
					type='info'
				/>
			) : (
				<SingleHistory>
					<table>
						<thead>
							<tr>
								<th>Transaction Amout</th>
								<th>Transaction Type</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Points</th>
								<th>Balance</th>
							</tr>
						</thead>
						<tbody>
							{histories
								?.filter(localSearch(searchTerm))
								.map(history => (
									<HistoryItem
										history={history}
										key={history._id}
									/>
								))}
						</tbody>
					</table>
				</SingleHistory>
			)}
		</Row>
	);

	return (
		<div style={{ marginTop: '25px' }}>
			{historyListLoading ? (
				<Spin />
			) : historyListError ? (
				<Alert message={historyListError} type='error' />
			) : (
				historyItems()
			)}
			<Space style={{ marginTop: 10 }}>
				<Button
					disabled={page === 1}
					onClick={() => setPage(prev => prev - 1)}
				>
					Prev
				</Button>
				<Button onClick={() => setPage(prev => prev + 1)}>Next</Button>
			</Space>
		</div>
	);
};

export default HistoryList;
