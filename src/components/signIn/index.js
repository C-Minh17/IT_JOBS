import { Button, Form, Input, message, notification } from "antd"
import "./signin.scss"
import { Link, useNavigate } from "react-router"
import { useForm } from "antd/es/form/Form"
import { useDispatch, useSelector } from "react-redux"
import { changeOff, changeOn } from "../../actions/login"
import { useEffect, useState } from "react"
import { getUsers } from "../../api/user"
import Cookies from "js-cookie"
import { changeToken } from "../../actions/setToken"

function SignIn(){

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage(); 
  const [dataUsers , setDataUsers] = useState([])

  const notiLogin=useSelector(state => state.statusLogin)
  const statusToken=useSelector(state => state.setToken)
  const dispacth=useDispatch()

  const requestSignIn=(e)=>{
    const check = dataUsers.find(item  => item.email==e.email && item.password==e.password)
    if(check){
      dispacth(changeOn())
      dispacth(changeToken())
      form.resetFields()
      Cookies.set("token", check.token , { expires: 1, path: "/" })
      navigate("/")
    }else{
      signInError()
    }
  }

  const signUpSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng kí thành công',
    });
  };
  const signInError = () => {
    messageApi.open({
      type: 'error',
      content: 'tài khoản hoặc mật khẩu không chính xác',
    });
  };

  useEffect(()=>{
    getUsers().then(data => setDataUsers(data))
  },[notiLogin])

  useEffect(()=>{
    if(notiLogin){
      signUpSuccess()
    }
    dispacth(changeOff())
  },[])


  return (
    <>
      {contextHolder}
      <div className="containerLogin">
        <div className="container--signIn">
          <Form form={form} layout="vertical" name="signIn" onFinish={requestSignIn}>
            <Form.Item>
              <h2>Đăng nhập</h2>
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required : true , message : "vui lòng nhập email"}]}>
              <Input/>    
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required : true , message : "vui lòng nhập password"}]}>
              <Input/>
            </Form.Item>
            <Form.Item>
              <Button style={{ width : "100%"}} type="primary" htmlType="submit">Đăng nhập</Button>
            </Form.Item>
            <Form.Item>
              <Link to={"/signup"}><Button style={{ width : "100%"}} >Đăng Kí</Button></Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignIn