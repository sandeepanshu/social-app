import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Menu,
  Layout,
  Button,
  Avatar,
  Switch,
  Tooltip,
  Grid,
  Drawer,
  Divider,
} from "antd";

import {
  TeamOutlined,
  CodeOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ReadOutlined,
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import type { RootState } from "../../redux/store";
import * as userActions from "../../redux/users/user.actions";
import { toggleTheme } from "../../redux/theme/theme.slice";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    dispatch(userActions.logOutUser());
    closeDrawer();
    navigate("/");
  };

  const selectedKey =
    location.pathname === "/" ? "/" : `/${location.pathname.split("/")[1]}`;

  const NAV_ITEMS = [
    {
      key: "/",
      label: "Home",
      icon: <HomeOutlined />,
      to: "/",
    },
    {
      key: "/developers",
      label: "Developers",
      icon: <TeamOutlined />,
      to: "/developers",
    },
    ...(isAuthenticated
      ? [
          {
            key: "/posts/list",
            label: "Posts",
            icon: <ReadOutlined />,
            to: "/posts/list",
          },
          {
            key: "/profiles/dashboard",
            label: "Dashboard",
            icon: <ProfileOutlined />,
            to: "/profiles/dashboard",
          },
        ]
      : []),
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          background: themeMode === "dark" ? "#000c17" : "#001529",
          height: 64,
          position: "fixed",
          top: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        {/* LOGO */}
        <NavLink
          to="/"
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            marginRight: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CodeOutlined />
          {!screens.xs && "React Social"}
        </NavLink>

        {/* Desktop Menu */}
        {screens.md ? (
          <>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={NAV_ITEMS.map((i) => ({
                key: i.key,
                icon: i.icon,
                label: <NavLink to={i.to}>{i.label}</NavLink>,
              }))}
              style={{
                flex: 1,
                background: "transparent",
                borderBottom: "none",
              }}
            />

            {/* Theme Switch */}
            <Tooltip
              title={
                themeMode === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
            >
              <Switch
                checkedChildren={<SunOutlined />}
                unCheckedChildren={<MoonOutlined />}
                checked={themeMode === "light"}
                onChange={() => dispatch(toggleTheme())}
                style={{ marginRight: 20 }}
              />
            </Tooltip>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div style={{ display: "flex", gap: 12 }}>
                <NavLink to="/users/register">
                  <Button type="default">Register</Button>
                </NavLink>
                <NavLink to="/users/login">
                  <Button type="primary">Login</Button>
                </NavLink>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  size={36}
                />
                <span style={{ color: "#fff", fontWeight: 600 }}>
                  {user?.name}
                </span>
                <Button danger type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </>
        ) : (
          <Button
            type="text"
            onClick={openDrawer}
            icon={<MenuOutlined style={{ color: "#fff", fontSize: 26 }} />}
            style={{ marginLeft: "auto" }}
          />
        )}
      </Header>

      <div style={{ marginTop: 64 }} />

      {/* ============================
            MOBILE PREMIUM DRAWER
        ============================ */}
      <Drawer
        placement="left"
        open={open}
        onClose={closeDrawer}
        width={290}
        bodyStyle={{
          padding: 0,
          background: themeMode === "dark" ? "#0d1117" : "#ffffff",
        }}
      >
        {/* Beautiful Profile Header */}
        <div
          style={{
            padding: "30px 20px",
            background:
              themeMode === "dark"
                ? "linear-gradient(135deg,#001529,#000c17)"
                : "linear-gradient(135deg,#1890ff,#40a9ff)",
            color: "#fff",
            textAlign: "left",
          }}
        >
          <Avatar
            src={user?.avatar}
            icon={<UserOutlined />}
            size={64}
            style={{
              border: "3px solid #fff",
              marginBottom: 10,
            }}
          />

          {isAuthenticated ? (
            <>
              <h3 style={{ margin: 0 }}>{user?.name}</h3>
              <p style={{ opacity: 0.8, marginTop: 4 }}>
                {user?.email || "Logged In User"}
              </p>
            </>
          ) : (
            <h3>Welcome 👋</h3>
          )}
        </div>

        <div style={{ padding: "16px 0" }}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                navigate(item.to);
                closeDrawer();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 20px",
                fontSize: 16,
                cursor: "pointer",
                color:
                  selectedKey === item.key
                    ? "#1890ff"
                    : themeMode === "dark"
                    ? "#cbd5e1"
                    : "#111",
                background:
                  selectedKey === item.key
                    ? themeMode === "dark"
                      ? "rgba(24,144,255,0.15)"
                      : "rgba(24,144,255,0.08)"
                    : "transparent",
                transition: "0.25s",
              }}
            >
              <span style={{ marginRight: 16, fontSize: 20 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        <Divider />

        {/* Theme Switch */}
        <div
          style={{
            padding: "0 20px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Switch
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            checked={themeMode === "light"}
            onChange={() => dispatch(toggleTheme())}
          />
          <span style={{ fontSize: 15 }}>
            {themeMode === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </div>

        <Divider />

        {/* Auth Section */}
        <div style={{ padding: "0 20px 30px" }}>
          {!isAuthenticated ? (
            <>
              <Button block onClick={() => navigate("/users/register")}>
                Register
              </Button>
              <Button
                block
                type="primary"
                style={{ marginTop: 10 }}
                onClick={() => navigate("/users/login")}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              danger
              block
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </Drawer>
    </Layout>
  );
};

export default NavBar;
