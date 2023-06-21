import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Input, Popover, Row } from 'antd';
import { updateBalance } from '../../state/actions/history';

const HistoryItem = ({ history }) => {
	const [balance, setBalance] = useState('');
	const dispatch = useDispatch();

	// * state
	const { updateBalanceLoading } = useSelector(state => state.history);

	const handleSubmit = e => {
		e.preventDefault();

		dispatch(updateBalance(history.userId._id, balance));
	};

	const updateBalanceForm = (
		<form>
			<Row gutter={[10, 10]}>
				<Col xs={24}>
					<label>
						Balance
						<Input
							value={balance}
							placeholder='Add new balance'
							onChange={e => setBalance(e.target.value)}
							size='large'
							type='number'
						/>
					</label>
				</Col>
				<Button
					loading={updateBalanceLoading}
					onClick={handleSubmit}
					type='primary'
				>
					Add
				</Button>
			</Row>
		</form>
	);

	return (
		<tr>
			<td>{history.transactionAmout}</td>
			<td>{history.title}</td>
			<td>{history.userId.firstName}</td>
			<td>{history.userId.lastName}</td>
			<td>{history.userId.email}</td>
			<td>{history.userId.points}</td>
			<td>
				<Popover
					content={updateBalanceForm}
					title='Update Balance'
					trigger='click'
				>
					<Button>{history.userId.balance}</Button>
				</Popover>
			</td>
		</tr>
	);
};

export default memo(HistoryItem);
