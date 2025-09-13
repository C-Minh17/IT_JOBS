import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, message, Modal, Popconfirm, Row, Select, Switch, Table, Tag, Tooltip } from "antd"
import { useEffect, useState } from "react";
import { deleleJobs, getJobs, patchJobs, postJobs } from "../../api/jobs";
import { Link } from "react-router";
import { getCompanyId, patchCompanies } from "../../api/company";
import Cookies from "js-cookie"
import { getUsers } from "../../api/user"

function ManageJobs(){
  const token = Cookies.get("token")
  const [idCompany , setIdCompany] = useState()
  const [dataJobs ,setDataJobs] = useState([])
  const [dataCompany ,setDataCompany] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isTypeModel, setIsTypeModel] = useState("post");
  const [idJob, setIdJob] = useState();
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage();


  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Bạn đã thêm 1 job mới',
    });
  };
  const successPatch = () => {
    messageApi.open({
      type: 'success',
      content: 'Sửa job thành công',
    });
  };
  const erorrAddJob = () => {
    messageApi.open({
      type: 'error',
      content: 'Vui lòng tạo công ty để tạo Job',
    });
  };
  const successDelete = () => {
    messageApi.open({
      type: 'success',
      content: 'Xóa job thành công',
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };
  useEffect(()=>{
    getUsers().then(data => {
      setIdCompany(data.find(item => item.token == token)?.companyId)
    })
  },[token])

  useEffect(()=>{
    getJobs().then(data => {
      setDataJobs(data.reverse().filter(item => item.companyId == idCompany))
    })
    if(idCompany){
      getCompanyId(idCompany).then(data => setDataCompany(data[0]))
    }
  },[isReload,idCompany])

  const dataSource = 
    dataJobs.map(item => {
        return {
          key: item.id,
          name: item.title,
          tag:<div>{item.tags.map((ele,index) => (<Tag key={index} color="blue">{ele}</Tag>))}</div>,
          salary: item.salary,
          time:item.postTime,
          status:item.status ? <Tag color="green">Đang bật</Tag> : <Tag>Đang tắt</Tag>,
          act:<>
            <Link to={"/details/job/" + item.id}>
              <Tooltip placement="top" title="xem chi tiết">
                <Button size="small" icon={<EyeOutlined />}></Button>
              </Tooltip>
            </Link>
            <Tooltip placement="top" title="chỉnh sửa">
              <Button onClick={()=> {setIdJob(item.id) ; setIsTypeModel("patch") ; form.setFieldsValue(item) ; showModal()}} style={{margin:"0 5px"}} size="small" color="primary" variant="outlined" icon={<EditOutlined/>}></Button>
            </Tooltip>
            <Popconfirm
              title="Bạn có chắc muốn xóa công việc này không ?"
              onConfirm={async ()=>{ 
                const dataJob = dataCompany.jobs.filter(i => i != item.id)
                await  patchCompanies(idCompany,{
                  jobs:dataJob
                })
                await deleleJobs(item.id)
                setIsReload(!isReload)
                successDelete()
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </>
      }
    })
  ;

  const columns = [
    {
      title: 'Tên job',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Mước lương($)',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Thời gian',
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

  const createJob = async (e)=>{
    if(isTypeModel === "post"){
      const today = new Date();
      const dataJob = {
        ...e,
        id:Date.now(),
        postTime:today.toLocaleDateString(),
        companyId:idCompany
      }
      await postJobs(dataJob)
      await patchCompanies(idCompany,{
        jobs:[...dataCompany.jobs , dataJob.id]
      })
      success()
      setIsModalOpen(false)
      setIsReload(!isReload)
      form.resetFields()
    }else{
      await patchJobs(idJob,e)
      successPatch()
      setIsModalOpen(false)
      setIsReload(!isReload)
      form.resetFields()
    }
  }

  const addJob = ()=>{
    if(idCompany != "null"){
      showModal() 
      setIsTypeModel("post")
    }else{
      erorrAddJob()
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="Thông tin job"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="createCompany" layout="vertical" onFinish={createJob}>
          <Row gutter={20}>
            <Col sm={24}>
              <Form.Item label="Tiêu đề" name={"title"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item label="Yêu cầu kĩ năng" name={"tags"} rules={[{required:true}]}>
                <Select
                  mode="multiple"
                  options = {[
                    { value: 'HTML', label: 'HTML' },
                    { value: 'CSS', label: 'CSS' },
                    { value: 'JavaScript', label: 'JavaScript' },
                    { value: 'Database', label: 'Database' },
                    { value: 'JSON', label: 'JSON' },
                    { value: 'PHP', label: 'PHP' },
                    { value: 'Python', label: 'Python' },
                    { value: 'Java', label: 'Java' },
                    { value: 'Angular', label: 'Angular' },
                    { value: 'NodeJs', label: 'NodeJs' },
                    { value: 'ReactJs', label: 'ReactJs' },
                    { value: 'VueJs', label: 'VueJs' },
                    { value: 'Django', label: 'Django' },
                    { value: 'TypeScript', label: 'TypeScript' },
                    { value: 'C#', label: 'C#' },
                    { value: 'C++', label: 'C++' }
                  ]}
                 />
              </Form.Item>
            </Col>
            <Col sm={12}>
              <Form.Item label="Mức lương" name={"salary"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col> 
            <Col sm={24}>
              <Form.Item label="Thành phố" name={"city"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Địa chỉ" name={"address"} rules={[{required:true}]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Mô tả" name={"description"} rules={[{required:true}]}>
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }}/>
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Trạng thái" name={"status"} initialValue={true}>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item>
                {isTypeModel === "post" ?
                <Button type="primary" htmlType="submit">Tạo mới</Button> :
                <Button type="primary" htmlType="submit">Lưu</Button>}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <h2>Danh sách việc làm</h2>
      <Button style={{margin:"20px 0"}} icon={<PlusOutlined />} onClick={addJob}>Thêm job mới</Button>
      <div className="listJob">
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </>
  )
}

export default ManageJobs