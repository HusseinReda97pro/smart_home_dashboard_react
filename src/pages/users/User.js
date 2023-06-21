import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row, message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/AdminLayout";
import { UserPage } from "../../styles/pages";
import { Description, Heading } from "../../styles/titles";
import UserList from "./UserList";
import {
  getAllUsersHistory,
  updateMultiBalance,
} from "../../state/actions/history";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTemp, setSearchTemp] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chargeAmount, setChargeAmount] = useState(0);
  const dispatch = useDispatch();

  const {
    updateMultiBalanceError,
    updateMultiBalanceSuccess,
    updateMultiBalanceLoading,
  } = useSelector((state) => state.history);

  const userSelected = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const localSearch = (term) => (user) => {
    return (
      user?.email?.toLowerCase().includes(term) ||
      user?.firstName?.toLowerCase().includes(term) ||
      user?.lastName?.toLowerCase().includes(term) ||
      user?.phoneNumber?.includes(term)
    );
  };

  useEffect(() => {
    if (updateMultiBalanceSuccess) {
      dispatch(getAllUsersHistory());
      setSelectedUsers([]);
      setChargeAmount(0);
      message.success("Balance Added Successfuly", 3);
    }
    if (updateMultiBalanceError) {
      message.error("Error Adding Balance", 3);
    }
  }, [updateMultiBalanceError, updateMultiBalanceSuccess, dispatch]);

  const handleAddMultiBalance = () => {
    dispatch(updateMultiBalance(selectedUsers, chargeAmount));
  };

  return (
    <AdminLayout>
      <UserPage>
        <Row gutter={[10, 10]} justify="space-between">
          <div>
            <Heading level={4}>Users</Heading>
            <Description type="secondary">
              Users histories, transactions
            </Description>
            <Row gutter={[10, 10]} justify="space-between">
              <div>
                <Input
                  value={searchTemp}
                  placeholder="Type a search keyword"
                  onChange={(e) => {
                    setSearchTemp(e.target.value)
                    if (e.target.value === "") {
                      setSearchTerm("")
                    }

                  }}
                  prefix={<SearchOutlined />}
                />
              </div>
            </Row>
            <Button onClick={() => setSearchTerm(searchTemp)}>
              Search
            </Button>
          </div>
          {selectedUsers.length > 0 && (
            <div>
              <Row gutter={[10, 10]} justify="space-between">
                <Heading level={5}>Charge Amount</Heading>
                <Description>
                  Selected Users: {selectedUsers.length}
                </Description>
              </Row>
              <Input
                value={chargeAmount}
                placeholder="Charge Amout"
                onChange={(e) => setChargeAmount(e.target.value)}
              />
              <Button
                loading={updateMultiBalanceLoading}
                onClick={() => handleAddMultiBalance()}
                type="primary"
              >
                Charge
              </Button>
            </div>
          )}
        </Row>
        <UserList
          localSearch={localSearch}
          searchTerm={searchTerm}
          userSelected={userSelected}
          selectedUsers={selectedUsers}
        />
      </UserPage>
    </AdminLayout>
  );
};

export default User;
