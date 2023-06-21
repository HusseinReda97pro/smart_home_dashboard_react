import { Button, Row } from "antd";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEnrollRequest } from "../../state/actions/enrollRequests";

const RequestItem = ({ request }) => {
  const dispatch = useDispatch();

  // * state
  const { enrollRequestsUpdateLoading } = useSelector(
    (state) => state.enrollRequests
  );

  const handleUpdateRequest = (status) => {
    dispatch(updateEnrollRequest(request._id, status));
  };

  return (
    <tr>
      <td>{request.student.firstName} </td>
      <td>{request.student.lastName}</td>
      <td>
        <Link to={`/users/${request.student._id}`}>
          {request.student.email}
        </Link>
      </td>
      <td>{request.student.phoneNumber}</td>

      <td>{request.course.title}</td>

      <td>
        <Row>
          <Button
            type="primary"
            loading={enrollRequestsUpdateLoading}
            onClick={() => handleUpdateRequest("Accepted")}
          >
            Accept
          </Button>
          <Button
            danger
            loading={enrollRequestsUpdateLoading}
            onClick={() => handleUpdateRequest("Rejected")}
          >
            Reject
          </Button>
        </Row>
      </td>
    </tr>
  );
};

export default memo(RequestItem);
