"use client";

import React, { useState } from "react";
import {
  DashboardOutlined,
  ExclamationCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WarningOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Dropdown, Avatar } from "antd";

const { Header, Sider, Content } = Layout;
import logoutAction from "@/app/(auth)/(logout)/logoutAction";
import Form from "next/form";
import Link from "next/link";

export default function layoutBase({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <WarningOutlined />,
      label: <Link href="/report">Denúncias</Link>,
    },
    {
      key: "3",
      icon: <ExclamationCircleOutlined />,
      label: <Link href="/occurrence">Ocorrências</Link>,
    },
  ];

  const userMenu = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: (
          <Form action={logoutAction}>
            <button className="w-full text-left">Logout</button>
          </Form>
        ),
      },
    ],
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <h1 className="text-2xl text-white ml-6 mt-4 mb-4">
            {!collapsed ? "SIG-SEG" : ""}
          </h1>
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: "#f9fafb" }}
          className="flex items-center justify-between px-4 bg-gray-50 shadow-md"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <Dropdown menu={userMenu} placement="bottomRight" trigger={["click"]} className="mr-3">
            <div className="flex items-center cursor-pointer gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <Avatar size="large" icon={<UserOutlined />} />
              <span className="hidden md:inline font-medium">Usuário</span>
            </div>
          </Dropdown>
        </Header>
        <Content className="m-0">{children}</Content>
      </Layout>
    </Layout>
  );
}