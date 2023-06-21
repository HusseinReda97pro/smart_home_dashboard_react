import { Row, message, Spin, Alert } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/AdminLayout";
import { Description, Heading } from "../../styles/titles";
import { SingleHistory, UserPage } from "../../styles/pages";
import { getAllEnrollRequests } from "../../state/actions/enrollRequests";
import RequestItem from "./RequestItem";

const EnrollRequest = () => {
  const dispatch = useDispatch();
  const {
    enrollRequestsListLoading,
    enrollRequestsListError,
    enrollRequests,

    enrollRequestsUpdateSuccesss,
    enrollRequestsUpdateError,
  } = useSelector((state) => state.enrollRequests);

  useEffect(() => {
    dispatch(getAllEnrollRequests());
  }, [dispatch]);

  useEffect(() => {
    if (enrollRequestsUpdateSuccesss) {
      dispatch(getAllEnrollRequests());
      message.success("Request Updated Successfuly", 3);
    }
    if (enrollRequestsUpdateError) {
      message.error("Error Updating Request", 3);
    }
  }, [enrollRequestsUpdateSuccesss, enrollRequestsUpdateError, dispatch]);

  //   const handleAddMultiBalance = () => {
  //     dispatch(updateMultiBalance(selectedUsers, chargeAmount));
  //   };

  const requestsItems = () => (
    <Row gutter={[10, 10]}>
      {enrollRequests?.length === 0 ? (
        <Alert message="No Requests" type="info" />
      ) : (
        <SingleHistory>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollRequests.map((request) => (
                <RequestItem key={request._id} request={request} />
              ))}
            </tbody>
          </table>
        </SingleHistory>
      )}
    </Row>
  );

  return (
    <AdminLayout>
      <UserPage>
        <Heading level={4}>Enroll Requests</Heading>
        <Description type="secondary">
          approve or decline enroll requests
        </Description>

        <div style={{ marginTop: "25px" }}>
          {enrollRequestsListLoading ? (
            <Spin />
          ) : enrollRequestsListError ? (
            <Alert message={enrollRequestsListError} type="error" />
          ) : (
            requestsItems()
          )}
        </div>
      </UserPage>
    </AdminLayout>
  );
};

export default EnrollRequest;
