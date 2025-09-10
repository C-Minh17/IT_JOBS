import { Button, Form, Input, message } from "antd"
import "../signIn/signin.scss"
import { Link, useNavigate } from "react-router"
import { useForm } from "antd/es/form/Form"
import { changeOn } from "../../actions/login"
import { useDispatch, useSelector } from "react-redux"
import { createUser, getUsers } from "../../api/user"
import { useEffect, useState } from "react"

function SignUp(){
  const [dataUsers , setDataUsers] = useState()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [apiMessage , contextHolder] = message.useMessage()

  const notiLogin=useSelector(state => state.statusLogin)
  const dispacth=useDispatch()

  const notiError=()=>{
    apiMessage.open({
      type:"error",
      content:"Email hoặc số điện thoại đã tồn tại"
    })
  }

  useEffect(()=>{
    getUsers().then(data => setDataUsers(data))
  },[])
  const requestSignUp=async (e)=>{
    const array = new Uint8Array(16)
    window.crypto.getRandomValues(array)
    const newToken = Array.from(array, dec => dec.toString(16).padStart(2, "0")).join("")
    const data = {
      ...e,
      companyId:null,
      token:newToken,
      id:Date.now()
    }

    const check = dataUsers.find(item => item.email == data.email || item.phone == data.phone)

    if (check){
      notiError()
    }else{
      await createUser(data)
      form.resetFields()
      dispacth(changeOn())
      navigate("/signin")
    }
    
  }

  return (
    <>
      {contextHolder}
      <div className="containerLogin">
        <div className="container--signUp">
          <Form form={form} style={{width: 500 , backgroundColor:"#C5E2FC" , padding:"20px 40px" , borderRadius:10}} layout="vertical" name="signUp" onFinish={requestSignUp}>
            <Form.Item>
              <h2>Đăng Kí</h2>
            </Form.Item>
            <Form.Item name="fullName" label="Full name" rules={[{ required : true , message : "vui lòng nhập đầy đủ tên của bạn"}]}>
              <Input/>    
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required : true , message : "vui lòng nhập email"}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required : true , message : "vui lòng nhập số điện thoại"}]}>
              <Input/>
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required : true , message : "vui lòng nhập email"}]}>
              <Input/>
            </Form.Item>
            <Form.Item>
              <Button style={{ width : "100%"}} type="primary" htmlType="submit">Đăng kí</Button>
            </Form.Item>
            <Form.Item>
              <Link to={"/signin"}><Button style={{ width : "100%"}} >Đăng nhập</Button></Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignUp