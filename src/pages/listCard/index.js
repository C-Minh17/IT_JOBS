import { useSelector } from "react-redux"
import "./listCard.scss"
import { Button, Card, Col, Row, Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { getCompanies } from "../../api/company"
import { getJobs } from "../../api/jobs"
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined, EnvironmentOutlined, GlobalOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router"

function ListCard(){
  const categoryCard = sessionStorage.getItem("categoryCard")

  const [apiList,setApiList]= useState([])

  useEffect(()=>{
    if(categoryCard == "company"){
      getCompanies().then(data => setApiList(data))
    }else {
      getJobs().then(data => setApiList(data))
    } 
  },[])

  return (
    <>  
      <div className="listCard">
        <div className="listCard--item">
          {categoryCard == "company" ? <h2>Tất cả các công ty hàng đầu</h2> : <h2>Tất cả các Jobs </h2>}
          <Row gutter={15}>
            {categoryCard == "company" ?
              apiList.map(company => (
                  <Col style={{marginBottom:"10px"}} key={company.id} sm={6}>
                    <Card hoverable title={<h3 style={{whiteSpace: "normal",wordBreak: "break-word",margin: 0}} level={4} >{company.name}</h3>}  style={{height:"100%"}}>
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
              ))
            : apiList.map(job => (
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
            ))
            }
          </Row>
        </div>
      </div>
    </>
  )
}

export default ListCard