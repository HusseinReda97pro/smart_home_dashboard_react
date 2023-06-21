import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  TeamOutlined,
  CopyOutlined,
  MenuFoldOutlined,
  FormOutlined,
  ShoppingTwoTone
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      style={{
        background: "#fff",
        borderRight: "1px solid #eee",
        position: "fixed",
        height: "100vh",
        left: "0",
        top: "64px",
        zIndex: "98",
      }}
    >
      <Menu theme="light" mode="inline">
        <Menu.Item key="1" icon={<ShoppingTwoTone />}>
          <Link to={{ pathname: "/products", state: { archived: false } }} >Products</Link>
        </Menu.Item>
        {/* <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to={{ pathname: "/archivedcourses", state: { archived: true } }} >Archived Courses</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<CopyOutlined />}>
          <Link to="/requests">Enroll Requests</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<VideoCameraOutlined />}>
          <Link to="/universities">Universities</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UploadOutlined />}>
          <Link to="/faculties">Faculties</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<FormOutlined />}>
          <Link to="/teachers">Teachers</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<TeamOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<BarChartOutlined />}>
          <Link to="/history">History</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<MenuFoldOutlined />}>
          <Link to="/types">Types</Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
