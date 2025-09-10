import { Card, Col, Row } from "antd"
import { useEffect, useState } from "react"
import { getUsers } from "../../api/user"
import Cookies from "js-cookie"
import { getJobs } from "../../api/jobs"
import { getApplications } from "../../api/applications"
import { getCompanies } from "../../api/company"

function OverviewManage(){
  const [token,setToken] = useState(Cookies.get("token"))
  const [quantityJob , setQuantityJob] = useState([0,0])
  const [quantityCV , setQuantityCV] = useState([0,0])
  const [infoCompany , setInfoCompany] = useState({})
  const idCompany = localStorage.getItem("idCompany")


  useEffect(()=>{
    getJobs().then(data => {
      const quantity = data.filter(item => item.companyId == idCompany).length
      const quantityOn = data.filter(item => item.companyId == idCompany && item.status == true).length
      setQuantityJob([quantity,quantityOn])
    })

    getApplications().then(data => {
      const quantity = data.filter(item => item.companyId == idCompany).length
      const quantityOn = data.filter(item => item.companyId == idCompany && item.statusRead == false).length
      setQuantityCV([quantity,quantityOn])
    })

    getCompanies().then(data => setInfoCompany(data.find(item => item.id == idCompany)))
  },[])

  return (
    <>
      <h2>Tổng quan</h2>
      <Row>
        <Col sm={8}>
          <Card title="Thông tin Job" variant="borderless" style={{ width: 300 , height:"100%" }}>
            <p>Số lượng job : <b>{quantityJob[0]}</b></p>
            <p>Job đang bật : <b>{quantityJob[1]}</b></p>
            <p>Job đang tắt : <b>{quantityJob[0] - quantityJob[1]}</b></p>
          </Card>
        </Col>
        <Col sm={8}>
          <Card title="Thông tin CV" variant="borderless" style={{ width: 300 , height:"100%" }}>
            <p>Số lượng CV : <b>{quantityCV[0]}</b></p>
            <p>CV chưa đọc : <b>{quantityCV[1]}</b></p>
            <p>CV đã đọc : <b>{quantityCV[0] - quantityCV[1]}</b></p>
          </Card>
        </Col>
        <Col sm={8}>
          <Card title="Thông tin công ty" variant="borderless" style={{ width: 300 , height:"100%" }}>
            <p>Tên công ty: <b>{infoCompany?.name}</b></p>
            <p>Email: <b>{infoCompany?.email}</b></p>
            <p>Số điện thoại: <b>{infoCompany?.phone}</b></p>
            <p>Số nhân viên: <b>{infoCompany?.employees}</b></p>    
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OverviewManage