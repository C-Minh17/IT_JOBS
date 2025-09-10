import { Content, Footer, Header } from "antd/es/layout/layout";
import Home from "../../pages/home"
import { Layout } from 'antd';
import HeaderHome from "../headerHome";
import { Outlet } from "react-router";

function LayoutHome(){
  return (
    <>
      <Layout >
        <header><HeaderHome/></header>
        <Layout>
          <Content><Outlet/></Content>
          <Footer style={{textAlign:"center",backgroundColor:"#d1e5f7"}} >CongMinh@2025</Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutHome