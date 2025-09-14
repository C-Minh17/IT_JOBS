import { Layout, Menu } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import HeaderManage from "../headerManage"
import { useEffect, useState } from "react";
import { AppstoreOutlined, BankOutlined, FileTextOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie"


function LayoutManage(){
  const token = Cookies.get("token")
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation()
  const navigate = useNavigate()

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

  useEffect(()=>{
    if(!token){
      navigate('/')
    }
    if (windowWidth <= 576){
      setIsModalOpen(true)
    }
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[])
  return (
    <>
      <Layout >
        <header className="headerManage"><HeaderManage setIsModal={setIsModalOpen}/></header>
        <Layout>
          <Sider collapsed={isModalOpen} collapsedWidth={windowWidth <= 576 ? 50 : 80} theme="light" style={{minHeight:"900px" , backgroundColor:"#fff"}}>
            <Menu
              mode="inline"
              theme="light"
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