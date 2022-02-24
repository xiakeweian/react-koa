import React,{useState, useEffect } from 'react'
import{Table,Select,Button,Modal,Form,Input,message} from 'antd'
import { connect } from "dva";
import { list, create, update, del } from "@/service/article";
import User from '@/Authority/User';
const {Option} = Select


interface cateProps{

    id:Number;
    title:String;
    desc:String;
    articlecate:String;
    author:String;
    author_id:Number;
    content:String;
    create_time:String;
}


const Article = (props:any) => {
    const {article:{tableData},dispatch} = props
    const articleType = localStorage.getItem('type')
    const [form] = Form.useForm();
const [type,setType] = useState<string>(articleType || 'cate')
const [visible,setVisible] = useState<boolean>(false)
const [cateVisible,setCateVisible] = useState<boolean>(false)
const [cateData,setCateData] = useState<cateProps[]>([])
const [selectCateName,setSelectCateName] = useState<string>('')


 const cateColumns = [
    {
        title:'类别id',
        dataIndex:'id'
    },
    {
    title:'文章类别',
    dataIndex:'articlecate'
    },
    {
    title:'描述',
    dataIndex:'desc'
    },
    {
    title:'创建时间',
    dataIndex:'create_time'
    }
]
 const articleColumns = [
{
  
    title:'id',
    dataIndex:'id'
},
{
  
    title:'标题',
    dataIndex:'title'
},
{
    title:'文章类别',
    dataIndex:'articlecate',
    render:(text,record) => {

        const data = cateData.find((item) => item.id === text)
        console.log(data,'fff')
        return data?.articlecate
    }
    },
{
  
    title:'描述',
    dataIndex:'desc'
},
{
  
    title:'作者',
    dataIndex:'author'
},

{
  
    title:'内容',
    dataIndex:'content'
},
{
    title:'创建时间',
    dataIndex:'create_time'
},
{
    title:'操作',
    dataIndex:'Operation',
    render:(text,record) => {
        return <>
        <Button onClick={handleModify}>编辑</Button>

        <Button onClick={handleDelete}>删除</Button>
        </>
    }
}
]

    useEffect(() => {
      //获取文章类别列表
      fetchData(type)
    },[])

    const fetchData = (type:String) => {
        dispatch({
            type:'article/fetchList',
            payload:{
              size: 10,
              current: 1 ,
              type
            }
        })
    }

 
    const handleSelectChange = async (value:any) => {
        setType(value)
        await fetchData(value)

        list({      
             size: 100000,
            current: 1 ,
            type:'cate'}).then((res:any) => {
                console.log(res,'ddg')
                if(res.code === 1){
                    setCateData(res.result.records)
                }
    

            })
       

    }
    const handleModify = () => {
        setVisible(true)
    }
    const handleDelete = () => {}


const handleAddOrEdit = (key) => {

    if(key === 'cate'){
        setCateVisible(true)
        setVisible(false)
    }else {
        setVisible(true)
        setCateVisible(false)
    }

}
const handleCancel = () => {
    setCateVisible(false)
    setVisible(false)
}
const currentUser = JSON.parse(localStorage.getItem('user'))
console.log(currentUser,'currentUser')

const handleOk = (e:any) => {

    e.preventDefault();
    form.validateFields()
      .then((values:any) => {
    

        create({...values,type,author:currentUser.username,author_id:currentUser.userId }).then((res:any) => {
        
            if(res.code === 1) {
                setCateVisible(false)
                setVisible(false)
                 fetchData(type)

            }else {
                message.error(res.msg)
            }
        })

    
      })
      .catch((errInfo:any) => {
        console.log(errInfo, 'ppperrInfo');
      });

}

const handleCateChange = (value,data) => {

    setSelectCateName(data.children)

}


return <div>
    <h3>aggegate聚合管道多表关联</h3>
    <Select style={{width:200}} defaultValue={type} onChange={handleSelectChange}>
        <Option value='cate'>文章类别</Option>
        <Option value='article'>文章</Option>
    </Select>

    <Button type='primary' onClick={() => handleAddOrEdit(type)}>{type === 'cate' ? '新建文章类别':'新建文章'}</Button>
   
    <Table columns={type=== 'cate' ? cateColumns:articleColumns }  dataSource={tableData.list}  pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            ...tableData.pagination,
          }}  />
    <Modal title='新建文章类别' visible={cateVisible} onCancel={handleCancel} onOk={handleOk}>
        <Form onFinish={handleOk} name='article' form={form}>
            <Form.Item label='文章类别名称' name='articlecate'  rules={[{required:true}]}>
            <Input/>
            </Form.Item>
            <Form.Item label='描述' name='desc'>
            <Input.TextArea/>
            </Form.Item>
        </Form>
    </Modal>
    <Modal title='新建文章' visible={visible} onCancel={handleCancel} onOk={handleOk} >
        <Form onFinish={handleOk} form={form}>
            <Form.Item label='标题' rules={[{required: true}]} name='title'>
            <Input/>
            </Form.Item>
            <Form.Item label='描述' name='desc'>
            <Input.TextArea/>
            </Form.Item>
            <Form.Item label='文章类别名称' name='articlecate' rules={[{ required: true }]}>
            <Select onChange={handleCateChange}>
                {cateData?.map((item) => <Option value={item.id} >{item.articlecate}</Option>)}
            </Select>
            </Form.Item>
            <Form.Item label='内容' name='content'>
            <Input.TextArea/>
            </Form.Item>

        </Form>
        
    </Modal>
       
</div>
}


export default connect(({ article }) => ({
    article,
  }))(Article)

