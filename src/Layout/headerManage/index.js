import { HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { Link, useNavigate } from "react-router"
import "./headerManage.scss"
import { useState } from "react";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { changeToken } from "../../actions/setToken";

function HeaderManage(prop){
  const {setIsModal} = prop
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isMenu, setIsMenu] = useState(false); 
  const statusToken=useSelector(state => state.setToken)
  const dispacth=useDispatch()
  const navigare = useNavigate()

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
  const handleLogout = ()=>{
    Cookies.remove("token")
    dispacth(changeToken())
    navigare("/")
  }
  return (
    <>
      <Modal
        title="Đăng xuất"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn đăng xuất</p>
      </Modal>
      <div className={!isMenu ? "headerManage--logo" : "headerManage--logo headerManage--logoClose"}>{!isMenu ? <h2>IT ADMIN</h2> : <h2>AD</h2>}</div>
      <div className="headerManage--nav">
        <div className="headerManage--nav__close"><Button onClick={()=>{setIsMenu(!isMenu) ; setIsModal(!isMenu)}} icon={!isMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined/>}></Button></div>
        <div className="headerManage--nav__logout">
          <Link to="/"><Button icon={<HomeOutlined />}><span className="text-btHeader">Home</span></Button></Link>
          <Button onClick={showModal} icon={<LogoutOutlined />} type="primary"><Link><span className="text-btHeader">Log out</span></Link></Button>
        </div>
      </div>
    </>
  )
}

export default HeaderManage