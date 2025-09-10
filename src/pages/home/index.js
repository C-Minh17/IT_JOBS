import { Button, Card, Col, Form, Input, message, Row, Select, Space, Tag } from "antd"
import BannerHome from "../../assets/img/bannerHome.png"
import "./home.scss"
import {CalendarOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined, GlobalOutlined, PhoneOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react"
import { getCompanies } from "../../api/company"
import { Link, useNavigate } from "react-router"
import { getJobs } from "../../api/jobs"
import { useDispatch, useSelector } from "react-redux"
import { changeOff } from "../../actions/login"

function Home(){
  const idCompany = localStorage.getItem("idCompany")
  const [company , setCompany] = useState([])
  const [jobs , setJobs] = useState([])
  let slMaxJobs = 8
  let slMaxCompany = 8
  const [messageApi, contextHolder] = message.useMessage(); 
  const navigate = useNavigate()
  const statusToken=useSelector(state => state.setToken)
  const notiLogin=useSelector(state => state.statusLogin)
  const dispacth=useDispatch()
  const skillList = [
    "HTML","CSS","JavaScript","Database","JSON","PHP","Python","Java",
    "Agular","NodeJs","ReactJs","VueJs","Diango","TypeScript","C#","C++"
  ];

  const signInSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Đăng nhập thành công',
    });
  };

  useEffect(()=>{
    if(notiLogin){
      signInSuccess()
    }
    dispacth(changeOff())
  },[])

  useEffect(()=>{
    getCompanies().then(data => setCompany(data))
    getJobs().then(data => setJobs(data))
  },[statusToken])

  const onSearch=(e)=>{
    navigate(`/search?title=${e.contentSearch}&city=${e.city}&tags=${e.tags}`)
  }
  return (
    <>
      {contextHolder}
      <div className="bannerHome">
        <img src={BannerHome}/>
      </div>
      <div className="containerHome">
        <h1>1000+ IT Jobs For Developers</h1>

        <div className="searchJob">
          <Form name="formSearch" onFinish={onSearch}>
            <Row gutter={10}>
              <Col sm={4}>
                <Form.Item name="city">
                  <Select 
                    showSearch
                    placeholder="city"
                    options={[
                      {
                        value: 'Hà Nội',
                        label: 'Hà Nội',
                      },
                      {
                        value: 'Đà nẵng',
                        label: 'Đà Nẵng',
                      },
                      {
                        value: 'Hồ Chí Minh',
                        label: 'TP Hồ Chí Minh',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col sm={16}>
                <Form.Item name="contentSearch">
                  <Input placeholder="Nhập từ khóa ...."/>
                </Form.Item>
              </Col>
              <Col sm={4}>
                <Form.Item>
                  <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="cardSkill">
          {skillList.map((item,index) => (
            <Link key={index} to={`/search?title=undefined&city=undefined&tags=${item}`}><Tag color="blue">{item}</Tag></Link>
          ))}
        </div>

        <div className="listCompany">
          <h2>Danh sách một số công ty phổ biến</h2>
          <Row gutter={15}>
            {company.map(company => {
              if(slMaxCompany!=0 && company.id != idCompany){
                slMaxCompany -=1  
                return (
                  <Col style={{marginBottom:"10px"}} key={company.id} sm={6}>
                    <Card hoverable title={<h3 level={4}>{company.name}</h3>}  style={{height:"100%"}}>
                      <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <div>
                          <PhoneOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                          {company.phone}
                        </div>
                        <div>
                          <UserOutlined style={{ color: "green", marginRight: 8 }} />
                          {company.employees} nhân viên
                        </div>
                        <div>
                          <GlobalOutlined style={{ color: "purple", marginRight: 8 }} />
                          <Link href={company.website} target="_blank">
                            {company.website}
                          </Link>
                        </div>
                        <div>
                          <EnvironmentOutlined style={{ color: "red", marginRight: 8 }} />
                          {company.address}
                        </div>
                        <div>
                          <ClockCircleOutlined style={{ color: "orange", marginRight: 8 }} />
                          {company.workingTime}
                        </div>
                        <Button type="primary" size="small"><Link to={"/details/company/" + company.id}>xem chi tiết</Link></Button>
                      </Space>
                    </Card>
                  </Col>
                )
              }
            })}
          </Row>
          <Link onClick={()=>{sessionStorage.setItem("categoryCard","company")}} to="/listCard"><Button className="button">Xem thêm</Button></Link>
        </div>

        <div className="listJobs">
          <h2>Danh sách một số Jobs phổ biến</h2>
          <Row gutter={15}>
            {jobs.map(job => {
              if(slMaxJobs!=0 && job.companyId != idCompany && job.status == true){
                slMaxJobs -= 1
                return (
                  <Col style={{marginBottom:"10px"}} key={job.id} sm={6}>
                    <Link to={"/details/job/" + job.id}>
                      <Card hoverable style={{height:"100%"}}>
                        <h3 level={4} style={{ marginBottom: 8 }}>
                          {job.title}
                        </h3>

                        <Space wrap style={{ marginBottom: 12 }}>
                          {job.tags.map((tag, index) => (
                            <Tag color="blue" key={index}>
                              {tag}
                            </Tag>
                          ))}
                        </Space>

                        <Space direction="vertical" size="small" style={{ width: "100%" }}>
                          <div>
                            <EnvironmentOutlined style={{ marginRight: 8, color: "red" }} />
                            {job.city}
                          </div>
                          <div>
                            <DollarOutlined style={{ marginRight: 8, color: "green" }} />
                            {job.salary}
                          </div>
                          <div>
                            <CalendarOutlined style={{ marginRight: 8, color: "orange" }} />
                            Đăng ngày: {job.postTime}
                          </div>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                )
              }
            })}
          </Row>
          <Link onClick={()=>{sessionStorage.setItem("categoryCard","job")}} to="/listCard"><Button className="button">Xem thêm</Button></Link>
        </div>
      </div>
    </>
  )
}

export default Home