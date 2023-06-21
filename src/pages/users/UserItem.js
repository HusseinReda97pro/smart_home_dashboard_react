import { Button, Col, Input, Popover, Row, Switch } from "antd";
import Modal from "antd/lib/modal/Modal";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  resetUserDevice,
  updateBalance,
  resetStudentPassword,
  deleteUser,
} from "../../state/actions/history";

const HistoryItem = ({ user, userSelected, selectedUsers }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [balance, setBalance] = useState(user.balance);
  const [enabled, setEnabled] = useState(user.enabled);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleModalVisible = () => setIsModalVisible(!isModalVisible);

  // * state
  const {
    updateBalanceLoading,
    resetUserDeviceLoading,
    userEditLoading,
    updatePasswordLoading,
    deleteUserLoading,
  } = useSelector((state) => state.user);

  const handleUserEnable = (checked) => {
    setEnabled(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateBalance(user._id, balance));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(resetStudentPassword(user._id, password));
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    dispatch(deleteUser(user._id));
  };

  const handleEditUser = (id) => {
    dispatch(
      editUser(id, {
        firstName,
        lastName,
        email,
        balance,
        phoneNumber,
        enabled,
      })
    );
  };

  const userUpdateForm = () => (
    <Modal
      title="Edit User"
      centered
      visible={isModalVisible}
      onOk={() => handleEditUser(user?._id)}
      confirmLoading={userEditLoading}
      okText="Update"
      onCancel={handleModalVisible}
    >
      <form onSubmit={handleSubmit}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <label>
              First Name
              <Input
                value={firstName}
                placeholder="Type first name"
                onChange={(e) => setFirstName(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Last Name
              <Input
                value={lastName}
                placeholder="Type last name"
                onChange={(e) => setLastName(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Email
              <Input
                value={email}
                placeholder="Type email"
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Edit Balance
              <Input
                value={balance}
                placeholder="Type new balance"
                onChange={(e) => setBalance(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Phone Number
              <Input
                value={phoneNumber}
                placeholder="Type phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Enable
              <Switch
                style={{ display: "block" }}
                checked={enabled}
                onChange={(checked) => handleUserEnable(checked)}
              />
            </label>
          </Col>
        </Row>
      </form>
    </Modal>
  );

  const updateBalanceForm = (
    <form>
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <label>
            Balance
            <Input
              value={balance}
              placeholder="Add new balance"
              onChange={(e) => setBalance(e.target.value)}
              size="large"
              type="number"
            />
          </label>
        </Col>
        <Button
          loading={updateBalanceLoading}
          onClick={handleSubmit}
          type="primary"
        >
          Add
        </Button>
      </Row>
    </form>
  );

  const updatePasswordForm = (
    <form>
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <label>
            Password
            <Input
              value={password}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
          </label>
        </Col>
        <Button
          loading={updatePasswordLoading}
          onClick={handleUpdatePassword}
          type="primary"
        >
          Update
        </Button>
      </Row>
    </form>
  );

  const deleteUserForm = (
    <form>
      <Row gutter={[10, 10]}>
        <Col xs={24}>
          <label>Are you sure you want to delete this user?</label>
        </Col>
        <Button
          loading={deleteUserLoading}
          onClick={handleDeleteUser}
          type="primary"
        >
          Delete
        </Button>
      </Row>
    </form>
  );

  return (
    <tr
      onClick={() => userSelected(user)}
      className={selectedUsers.includes(user) ? "selected" : ""}
    >
      <td>{user.firstName} </td>
      <td>{user.lastName}</td>
      <td>
        <Link to={`/users/${user._id}`}>{user.email}</Link>
      </td>
      <td>{user.points}</td>
      <td>
        <Popover
          content={updateBalanceForm}
          title="Update Balance"
          trigger="click"
        >
          <Button>{user.balance}</Button>
        </Popover>
      </td>

      <td>
        <Popover
          content={updatePasswordForm}
          title="Update Password"
          trigger="click"
        >
          <Button>Update Password</Button>
        </Popover>
      </td>

      <td>
        <Popover content={deleteUserForm} title="Delete User" trigger="click">
          <Button>Delete</Button>
        </Popover>
      </td>
      <td>
        <Button
          loading={resetUserDeviceLoading}
          onClick={() => dispatch(resetUserDevice(user._id))}
        >
          Reset Device
        </Button>
      </td>
      <td>
        <Button
          type="primary"
          loading={userEditLoading}
          onClick={() => handleModalVisible()}
        >
          Edit
        </Button>
        {userUpdateForm()}
      </td>
    </tr>
  );
};

export default memo(HistoryItem);
