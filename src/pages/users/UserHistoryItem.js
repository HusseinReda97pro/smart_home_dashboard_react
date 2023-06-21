const UserHistoryItem = ({ history }) => {
	return (
		<tr>
			<td>{new Date(history.date).toLocaleString()}</td>
			<td>{history.transactionAmout}</td>
			<td>{history.transactionType}</td>
			<td>{history.title}</td>
		</tr>
	);
};

export default UserHistoryItem;
