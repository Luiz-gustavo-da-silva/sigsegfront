"use client";

import React, { useState } from "react";
import {
  DashboardOutlined,
  ExclamationCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Popover, theme } from "antd";

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
            <h1 className="text-2xl text-white ml-6 mt-4 mb-4">{!collapsed ? 'SIG-SEG': ''}</h1>
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: '#f9fafb' }}
          className="flex align-center justify-between bg-gray-50"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div>
            <Form action={logoutAction}>
              <button className="rounded-md bg-[#378c77] text-white  transition h-auto">
                Logout
              </button>
            </Form>
          </div>
        </Header>
        <Content className="m-0">{children}</Content>
      </Layout>
    </Layout>
  );
}
