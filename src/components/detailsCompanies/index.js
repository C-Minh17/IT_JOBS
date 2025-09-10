import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCompanyId } from "../../api/company"
import { Card, Tag, Button } from "antd";
import { PhoneOutlined, MailOutlined, GlobalOutlined, TeamOutlined, ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";

function DetailsCompanies(){
  const param=useParams()?.id
  const [dataCompany , setDataCompany] = useState()

  useEffect(()=>{
    getCompanyId(param).then(data => setDataCompany(data[0]))
  },[])

  return (
    <>
      <Card
        title={dataCompany?.name}
        variant="borderless"
        style={{ maxWidth: 800, margin: "90px auto", borderRadius: 12 }}
        extra={<a href={dataCompany?.website} target="_blank" rel="noreferrer">Website</a>}
      >
        <div style={{ margin: "10px 0" }}>
          <EnvironmentOutlined style={{ marginRight: 8, color: "red" }} />
          <span>{dataCompany?.address}</span>
        </div>

        <div style={{ margin: "10px 0" }}>
          <PhoneOutlined style={{ marginRight: 8, color: "green" }} />
          <span>{dataCompany?.phone}</span>
        </div>

        <div style={{ margin: "10px 0" }}>
          <MailOutlined style={{ marginRight: 8, color: "blue" }} />
          <span>{dataCompany?.email}</span>
        </div>

        <div style={{ margin: "10px 0" }}>
          <TeamOutlined style={{ marginRight: 8, color: "purple" }} />
          <span>Quy mô: {dataCompany?.employees} nhân viên</span>
        </div>

        <div style={{ margin: "10px 0" }}>
          <ClockCircleOutlined style={{ marginRight: 8, color: "orange" }} />
          <span>Thời gian làm việc: {dataCompany?.workingTime[0]} - {dataCompany?.workingTime[1]}</span>
        </div>

        <p><strong>Mô tả ngắn:</strong> <br/> {dataCompany?.shortDescription}</p>
        <p><strong>Giới thiệu:</strong> <br/> {dataCompany?.description}</p>

        <div style={{ marginTop: 20 }}>
          <Tag color="blue">Việc làm đang tuyển: {dataCompany?.jobs.length}</Tag>
        </div>
      </Card>
    </>
  )
}

export default DetailsCompanies