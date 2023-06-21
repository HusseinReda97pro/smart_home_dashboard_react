import { Row, Space, Alert, Spin } from 'antd';
import SingleFaculty from './SingleFaculty';

const FacultyList = ({
	localSearch,
	searchTerm,
	universityFaculties,
	universityFaculiesListLoading,
	universityFaculiesListError,
}) => {
	const facultyItems = () => (
		<Row gutter={[10, 10]}>
			{universityFaculties?.length === 0 ? (
				<Alert message='No university selected' type='info' />
			) : universityFaculties?.filter(localSearch(searchTerm)).length ===
			  0 ? (
				<Alert
					message='No universities matched your keywords'
					type='info'
				/>
			) : (
				<Space wrap>
					{universityFaculties
						?.filter(localSearch(searchTerm))
						.map(faculty => (
							<SingleFaculty
								faculty={faculty}
								key={faculty._id}
							/>
						))}
				</Space>
			)}
		</Row>
	);

	return (
		<div style={{ marginTop: '25px' }}>
			{universityFaculiesListLoading ? (
				<Spin />
			) : universityFaculiesListError ? (
				<Alert message={universityFaculiesListError} type='error' />
			) : (
				facultyItems()
			)}
		</div>
	);
};

export default FacultyList;
