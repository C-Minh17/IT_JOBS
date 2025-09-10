import { Layout, Menu } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import HeaderManage from "../headerManage"
import { useState } from "react";
import { AppstoreOutlined, BankOutlined, FileTextOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router";

function LayoutManage(){
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const location = useLocation()

  const items = [
    {
      key: "/manage",
      label: <Link to="/manage">Tổng quan</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      key: '/manage/infoCompany',
      label: <Link to="/manage/infoCompany">Thông tin công ty</Link>,
      icon: <BankOutlined />,
    },
    {
      key: '/manage/job',
      label: <Link to="/manage/job">Quản lý việc làm</Link>,
      icon: <OrderedListOutlined />,
    },
    {
      key: '/manage/CV',
      label: <Link to="/manage/CV">Quản lý CV</Link>,
      icon: <FileTextOutlined />,
    }
  ]
  return (
    <>
      <Layout >
        <header className="headerManage"><HeaderManage setIsModal={setIsModalOpen}/></header>
        <Layout>
          <Sider collapsed={isModalOpen} theme="light" style={{minHeight:"900px" , backgroundColor:"#fff" }}>
            <Menu
              mode="inline"
              theme="light"
              inlineCollapsed={isModalOpen}
              items={items}
              selectedKeys={[location.pathname]}
            />
          </Sider>
          <Content style={{padding:"0 15px" }}>
            <Outlet/>
          </Content>
        </Layout>
        <Footer style={{textAlign:"center",backgroundColor:"#d1e5f7"}} >CongMinh@2025</Footer>
      </Layout>
    </>
  )
}

export default LayoutManage