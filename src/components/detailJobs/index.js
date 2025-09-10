import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { getIdJobs } from "../../api/jobs"
import { Button, Col, Form, Input, Row, Select, Space, Tag , message } from "antd"
import "./detailJob.scss"
import { postApplication } from "../../api/applications"

function DetailsJobs(){
  const [job , setJob] = useState({})
  const param=useParams()
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const applySuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Yêu cầu của bạn đã gửi thành công',
    });
  };


  const skills = ["HTML","CSS","JavaScript","Database","JSON","PHP","Python","Java","Angular","NodeJs","ReactJs","VueJs","Django","TypeScript","C#","C++"];


  useEffect(()=>{
    getIdJobs(param.id).then(data => setJob(data[0]))
  },[])

  const onApply = async (e)=>{
    const today = new Date();
    const data = {
      ...e,
      id:Date.now(),
      jobId:job.id,
      companyId:job.companyId,
      submitTime:today.toLocaleDateString(),
      statusRead:false
    }
    await postApplication(data)
    applySuccess()
    form.resetFields() 
  }


  return (
    <>
      {contextHolder}
      <div className="infoJob">
        <Button size="small" className="bt1" onClick={()=>{ navigate(-1) }}>Trở lại</Button>
        <h2>{job.title}</h2>
        <Button 
          className="bt2" 
          type="primary" 
          onClick={() => {
            document.getElementById("applyNow")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Ứng tuyển ngay
        </Button>
        <div>
          <span>Yêu cầu kĩ năng : </span>
          <span>{job.tags ? job.tags.map((item,index)=>{
            return <Tag color="blue" key={index}>{item}</Tag>
          }): <></>}</span>
        </div>
        <div>Thành Phố : <b>{job.city}</b></div>
        <div>Địa chỉ : <b>{job.address}</b></div>
        <div>Mức lương: <b>{job.salary}</b></div>
        <div>Thời gian đăng bài: <b>{job.postTime}</b></div>
        <div>
          <p><b>Thông tin công việc :</b> </p>
          <div>{job.description ? job.description.split("\n").map((item,index)=>(
            <p key={index}>{item}</p>
          )): <></>}</div>
        </div>
      </div>

      <div id="applyNow" className="FormApply">
        <h3>Ứng tuyển ngay</h3>
        <hr></hr>
        <Form form={form} onFinish={onApply} name="apply" layout="vertical">
          <Row gutter={20}>
            <Col sm={6}>
              <Form.Item 
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item 
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin'  }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item 
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin'  }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item 
                label="Thành phố "
                name="city"
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={6}>
              <Form.Item 
                label="Skills"
                name="skill"
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  options={skills.map(s => ({ label: s, value: s }))
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item 
                label="Giới thiệu bản thân"
                name="introduction"
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
              >
                <Input.TextArea rows={5}/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item 
                label="Các projects đã làm"
                name="projects"
                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin'}]}
              >
                <Input.TextArea rows={4}/>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
        </Form>
      </div>
    </>
  )
}

export default DetailsJobs