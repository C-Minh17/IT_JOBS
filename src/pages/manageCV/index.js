import { useEffect, useState } from "react"
import { deleleApplication, getApplications, patchApplication } from "../../api/applications"
import { getJobs } from "../../api/jobs"
import { Button, Modal, Popconfirm, Table, Tag, Tooltip } from "antd"
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import Cookies from "js-cookie"
import { getUsers } from "../../api/user"
import "./manageCV.scss"

function ManageCV(){
  const token = Cookies.get("token")
  const [idCompany , setIdCompany] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataCV , setDataCV] = useState([])
  const [dataJob , setDataJob] = useState([])
  const [infoCV , setInfoCV] = useState({})

  useEffect(()=>{
    getApplications().then(data => setDataCV(data.reverse().filter(item => item.companyId == idCompany)))
    getJobs().then(data => setDataJob(data))
    getUsers().then(data => {
      setIdCompany(data.find(item => item.token == token)?.companyId)
    })
  },[isReload,idCompany])


  const dataSource = dataCV.map(item => {
    return {
      key:item.id,
      nameJob:dataJob.find(ele => ele.id == item.jobId)?.title,
      name:item.fullName,
      phone:item.phone,
      email:item.email,
      time:item.submitTime,
      status: item.statusRead ? <Tag color="green">Đã xem</Tag> : <Tag>Chưa xem</Tag> ,
      act:<>
        <Tooltip placement="top" title="xem chi tiết">
          <Button onClick={async ()=> {setIsModalOpen(true) ; setInfoCV(item) ; await patchApplication(item.id,{statusRead:true}) ; setIsReload(!isReload)}} style={{marginRight:"5px"}} size="small" icon={<EyeOutlined />}></Button>
        </Tooltip>
        <Popconfirm
          title="Bạn có chắc muốn xóa CV này không ?"
          onConfirm={ async ()=>{ await deleleApplication(item.id) ; setIsReload(!isReload)}}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" danger icon={<DeleteOutlined />}></Button>
        </Popconfirm>
      </>
    }
  })

  const columns = [
    {
      title: 'Tên job',
      dataIndex: 'nameJob',
      key: 'nameJob',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      dataIndex: 'act',
      key: 'act',
    },
  ];

  return (
    <>
      <Modal
        title="Thông tin CV"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={()=> setIsModalOpen(false)}
        footer={null}
      >
        <div>Họ tên : <b>{infoCV.fullName}</b></div>
        <div>Số điện thoại : <b>{infoCV.phone}</b></div>
        <div>Email : <b>{infoCV.email}</b></div>
        <div>Thời gian gửi : <b>{infoCV.submitTime}</b></div>
        <div>Skills : <b>{infoCV.skill ? infoCV.skill.join(" , ") : ""}</b></div>
        <div>Thành phố : <b>{infoCV.city}</b></div>
        <div>
          <div><b>Mô tả : </b></div>
          <ul>{infoCV.introduction ? infoCV.introduction.split("\n").map((item,index)=>(
            <div key={index}>{item}</div>
          )): <></>}</ul>
        </div>
        <div>
          <div><b>Project : </b></div>
          <ul>{infoCV.projects ? infoCV.projects.split("\n").map((item,index)=>(
            <div key={index}>{item}</div>
          )): <></>}</ul>
        </div>
      </Modal>
      <h2>Danh sách các CV ứng tuyển</h2>
      <div className="listCVmanage">
        <Table dataSource={dataSource} columns={columns} scroll={{ x: "max-content" }}/>;
      </div>
    </>
  )
}

export default ManageCV