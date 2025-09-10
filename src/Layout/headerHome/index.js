import { Button, message, Modal } from "antd"
import { useEffect, useState } from "react"
import "./headerHome.scss"
import { Link } from "react-router"
import Cookies from "js-cookie"
import allReducer from "../../reduces"
import { useDispatch, useSelector } from "react-redux"
import { changeToken } from "../../actions/setToken"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"

function HeaderHome(){
  const [token,setToken] = useState(Cookies.get("token"))
  const statusToken=useSelector(state => state.setToken)
  const dispacth=useDispatch()
  const [messageApi , contextHolder] = message.useMessage()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNoti = ()=>{
    messageApi.open({
      type:"info",
      content:"Bạn đã đăng xuất thành công"
    })
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleLogout();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    setToken(Cookies.get("token"))
  },[statusToken])

  const handleLogout = ()=>{
    dispacth(changeToken())
    Cookies.remove("token")
    localStorage.removeItem("idCompany")
    setToken(null)  
    openNoti()
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="Đăng xuất"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn đăng xuất</p>
      </Modal>
      <div className="headerHome">
        <div className="headerHome--container">
          <div className="headerHome--container__logo">IT Jobs</div>
          <div className="headerHome--container--nav">
            {token ? (
              <>
                <Link  to="/manage"><Button className="headerHome--container--nav__one" icon={<UserOutlined />}>manege</Button></Link>
                <Button icon={<LogoutOutlined />} onClick={showModal} type="primary" className="headerHome--container--nav__two">log out</Button>
              </>
            ) : (
              <>
                <Link to="/signin"><Button className="headerHome--container--nav__one">Sign in</Button></Link>
                <Link to={"/signup"}><Button type="primary" className="headerHome--container--nav__two">Sign up</Button></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderHome