import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router"
import { getJobParam } from "../../api/jobs"
import { Card, Col, Row, Space, Tag } from "antd"
import { CalendarOutlined, DollarOutlined, EnvironmentOutlined } from "@ant-design/icons"

function JobSearch(){
  const [param] = useSearchParams()
  const [dataSearch ,setDataSearch] = useState([])

  let query = [];

  if (param.get("title") != "undefined") {
    query.push(`title=ilike.%25${param.get("title")}%25`);
  }

  if (param.get("tags") != "undefined") {
    query.push(`tags=cs.["${param.get("tags")}"]`);
  }

  if (param.get("city") != "undefined") {
    query.push(`city=ilike.%25${param.get("city")}%25`);
  }

  useEffect(()=>{
    getJobParam(query.join("&")).then(data => setDataSearch(data))
  },[])

  return (
    <>
      <div style={{margin: window.innerWidth < 576 ? "80px 30px" : "80px 100px" }}>
        <h2>Kết quả tìm kiếm {param.get("title") != "undefined" ? '"'+ param.get("title") +'"' : ''} {param.get("title") != "undefined" && param.get("city") != "undefined" ? "&": ''} {param.get("city") != "undefined" ? '"'+param.get("city")+'"' : ''} {param.get("tags") != "undefined" ? '"'+ param.get("tags") +'"' : ''}</h2>
        <div className="listJobSearch">
          <Row gutter={15}>
            {dataSearch.map(job => {
              return (
                <Col style={{marginBottom:"10px"}} key={job.id} xs={24} sm={6}>
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
            })}
          </Row>
        </div>
      </div>
    </>
  )
}

export default JobSearch