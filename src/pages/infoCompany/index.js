import { Button, Col, Form, Input, Modal, Row, Select, TimePicker } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { getCompanies, getCompanyId, patchCompanies, postCompanies } from "../../api/company"
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { changeUser, getUsers } from "../../api/user"
import Cookies from "js-cookie"

function InfoCompanyManage(){
  const [dataCompany ,setDataCompany] = useState()
  const [idCompany , setIdCompany] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [token,setToken] = useState(Cookies.get("token"))
  const [idUser ,setIdUser] = useState()
  const [form] = Form.useForm()


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    getUsers().then(data => {
      setIdUser(data.find(item => item.token == token)?.id)
      setIdCompany(data.find(item => item.token == token)?.companyId)
    })
    if (idCompany){
      getCompanyId(idCompany).then(data => {
        setDataCompany(data[0])
        form.setFieldsValue({
          ...data[0],
          workingTime:data[0].workingTime ? [dayjs(data[0].workingTime[0], "HH:mm"), dayjs(data[0].workingTime[1], "HH:mm")] : []
        })
      })
    }
  },[idCompany,form])


  const createCompany=async (e)=>{
    const data = {
      ...e,
      workingTime: [e.workingTime?.[0].format("HH:mm"), e.workingTime?.[1].format("HH:mm")],
      id:Date.now(),
      jobs:[],
      idUser:idUser
    }
    
    await postCompanies(data)
    await changeUser(idUser,{companyId:data.id})
    setIdCompany(data.id)
    localStorage.setItem("idCompany",data.id)
    setIsModalOpen(false)
  }

  const onChangeForm = (e)=>{
    const data = {
      ...e,
      workingTime:[e.workingTime?.[0].format("HH:mm"), e.workingTime?.[1].format("HH:mm")],
    }
    patchCompanies(idCompany,data)
    setIsDisabled(true)
  }

  return (
    <>
      <h2>Thông tin công ty</h2>
      <div>{idCompany != "null" ? <div>{isDisabled ? <Button onClick={()=> {setIsDisabled(false)}} icon={<EditOutlined />}>Chỉnh sửa</Button> : <Button onClick={()=> {setIsDisabled(true)}} icon={<CloseOutlined />}>Hủy</Button>}</div> : <Button icon={<PlusOutlined />} onClick={showModal}>Thêm công ty</Button> }</div>
      <Modal
        title="Thông tin công ty"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="createCompany" layout="vertical" onFinish={createCompany}>
          <Row gutter={20}>
            <Col sm={24}>
              <Form.Item label="Tên công ty" name={"name"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Email" name={"email"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Số điện thoại" name={"phone"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Địa chỉ" name={"address"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Số lượng nhân sự" name={"employees"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Thời gian làm việc" name={"workingTime"} rules={[{required:true }]}>
                <TimePicker.RangePicker format={"HH:mm"} allowEmpty={[true, true]}/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Link website" name={"website"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Mô tả ngắn" name={"shortDescription"} rules={[{required:true}]}>
                <TextArea autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Mô tả công ty chi tiết" name={"description"} rules={[{required:true}]}>
                <TextArea autoSize={{ minRows: 4, maxRows: 8 }}></TextArea>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button style={{ width : "100%"}} type="primary" htmlType="submit">Tạo mới</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <div className="formCompany">
        {idCompany != "null" ? 
        <Form onFinish={onChangeForm} name="formCompany" layout="vertical" form={form} disabled={isDisabled}>
          <Row gutter={20}>
            <Col sm={24}>
              <Form.Item label="Tên công ty" name={"name"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Email" name={"email"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Số điện thoại" name={"phone"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Địa chỉ" name={"address"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Số lượng nhân sự" name={"employees"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Thời gian làm việc" name={"workingTime"} rules={[{required:true }]}>
                <TimePicker.RangePicker format={"HH:mm"} allowEmpty={[true, true]}/>
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item label="Link website" name={"website"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Mô tả ngắn" name={"shortDescription"} rules={[{required:true}]}>
                <TextArea autoSize={{ minRows: 2, maxRows: 6 }}></TextArea>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Mô tả công ty chi tiết" name={"description"} rules={[{required:true}]}>
                <TextArea autoSize={{ minRows: 4, maxRows: 8 }}></TextArea>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                {!isDisabled ? <Button style={{ width : "100%"}} type="primary" htmlType="submit">Lưu</Button> : ""}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        : <p>Bạn chưa có công ty</p>}
      </div>
    </>
  )
}

export default InfoCompanyManage