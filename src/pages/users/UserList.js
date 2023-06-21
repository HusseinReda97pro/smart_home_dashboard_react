import { Row, Alert, Spin, message, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersHistory } from '../../state/actions/history';
import { SingleHistory } from '../../styles/pages';
import UserItem from './UserItem';

const UserList = ({ localSearch, searchTerm, userSelected, selectedUsers }) => {
	const dispatch = useDispatch();
	const [pageSize, setPageSize] = useState(250);
	const [page, setPage] = useState(1);

	// * states
	const {
		historyUserListLoading,
		historyUserListError,
		historyUsers,
		updateBalanceError,
		updateBalanceSuccess,
		resetUserDeviceSuccess,
		resetUserDeviceError,
		userEditSuccess,
		userEditError,
		updatePasswordSuccess,
		updatePasswordError,
		userDeleteSuccess,
		userDeleteError,
	} = useSelector(state => state.history);

	useEffect(() => {
		dispatch(getAllUsersHistory(pageSize, page, searchTerm));
	}, [dispatch, pageSize, page, searchTerm]);

	useEffect(() => {
		if (userDeleteSuccess) {
			dispatch(getAllUsersHistory(pageSize, page, searchTerm));
			message.success('User successfully deleted', 1);
		}
		if (userDeleteError) {
			message.error('Error deleting user');
		}

		if (updatePasswordSuccess) {
			dispatch(getAllUsersHistory(pageSize, page, searchTerm));
			message.success('Password updated successfully');
		}
		if (updatePasswordError) {
			message.error(updatePasswordError, 3);
		}

		if (updateBalanceSuccess) {
			dispatch(getAllUsersHistory(pageSize, page, searchTerm));
			message.success('Balance Updated Successfully!', 3);
		}

		if (resetUserDeviceSuccess) {
			dispatch(getAllUsersHistory(pageSize, page, searchTerm));
			message.success('Device Reset Successfully!', 3);
		}

		if (updateBalanceError) {
			message.error(updateBalanceError, 3);
		}

		if (resetUserDeviceError) {
			message.error(resetUserDeviceError, 3);
		}

		if (userEditSuccess) {
			message.success('User updated', 3);
			dispatch(getAllUsersHistory(pageSize, page, searchTerm));
		}

		if (userEditError) {
			message.error(userEditError, 3);
		}
	}, [
		updateBalanceSuccess,
		updateBalanceError,
		resetUserDeviceError,
		resetUserDeviceSuccess,
		dispatch,
		userEditSuccess,
		userEditError,
		updatePasswordSuccess,
		updatePasswordError,
		userDeleteSuccess,
		userDeleteError,
		pageSize,
		page,
	]);

	const usersItems = () => (
		<Row gutter={[10, 10]}>
			{historyUsers?.length === 0 ? (
				<Alert message='No users' type='info' />
			) : historyUsers.length === 0 ? (
				<Alert message='No users matched your keywords' type='info' />
			) : (
				<SingleHistory>
					<table>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
								<th>Points</th>
								<th>Balance</th>
								<th>Reset Passowrd</th>
								<th>Delete</th>
								<th>Device</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{historyUsers

								.map(user => (
									<UserItem
										user={user}
										key={user._id}
										userSelected={userSelected}
										selectedUsers={selectedUsers}
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
			{historyUserListLoading ? (
				<Spin />
			) : historyUserListError ? (
				<Alert message={historyUserListError} type='error' />
			) : (
				usersItems()
			)}
			<Space style={{ marginTop: 10 }}>
				<Button
					disabled={page === 1}
					onClick={() => setPage(prev => prev - 1)}
				>
					Prev
				</Button>
				<Button disabled={page === 11} onClick={() => setPage(prev => prev + 1)}>Next</Button>
			</Space>
		</div>
	);
};

export default UserList;
