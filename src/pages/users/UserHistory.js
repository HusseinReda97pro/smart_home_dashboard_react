import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/AdminLayout';
import { getUserHistory } from '../../state/actions/history';
import { Alert, Spin, Row } from 'antd';
import { SingleHistory } from '../../styles/pages';
import UserHistoryItem from './UserHistoryItem';
import { Description, Heading } from '../../styles/titles';

const UserHistory = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();

	const { historyUserLoading, historyUserError, userHistory } = useSelector(
		state => state.history
	);

	useEffect(() => {
		dispatch(getUserHistory(userId));
	}, [dispatch, userId]);

	console.log({ userHistory });

	const userHistoryItems = () => (
		<Row gutter={[10, 10]}>
			{userHistory?.length === 0 ? (
				<Alert message='No user histories' type='info' />
			) : (
				<SingleHistory>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Transaction Amout</th>
								<th>Transaction Type</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{userHistory?.map(history => (
								<UserHistoryItem
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
		<AdminLayout>
			<div style={{ marginTop: '25px' }}>
				<Heading level={4}>User History</Heading>
				<Description type='secondary'>
					User history, transaction
				</Description>
				{historyUserLoading ? (
					<Spin />
				) : historyUserError ? (
					<Alert message={historyUserError} type='error' />
				) : (
					userHistoryItems()
				)}
			</div>
		</AdminLayout>
	);
};

export default UserHistory;
