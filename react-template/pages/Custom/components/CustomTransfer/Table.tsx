import React,{Component} from 'react'
import {Table,Button,Modal} from 'antd'
import CustomTransfer from './index.tsx'
import fields from './fields'

const columns = [
      
    {
        title: '曝光量',
        dataIndex: 'viewCount',
        sorter: (a, b) => a.viewCount - b.viewCount,
      },
      {
        title: '点击量',
        dataIndex: 'validClickCount',
        sorter: (a, b) => a.validClickCount - b.validClickCount,
      
      },
     {
        title: '点击率',
        dataIndex: 'ctr',
        sorter: (a, b) => a.ctr - b.ctr,
      },
      {
        title: '点击均价',
        dataIndex: 'cpc',
        sorter: (a, b) => a.cpc - b.cpc,
      },
    {
      title: '花费',
      dataIndex: 'cost',
      sorter: (a, b) => a.cost - b.cost,
    }
  ];

class TableCom extends Component {
    CustomTransferRef: any;
   
    constructor(props) {
        super(props);
        
        this.state = {
            customOk:'',
            visible:false,
            columns
        }
        this.CustomTransferRef = null
       
      }

       handleColumnChange = (value) => {

        console.log(value,'ddddvalue')
    }
      
         onChange = (pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
          }

          handleColumnModalOk =  () => {
             
             this.setState({
                visible: false,
                customOk:'ok'
              },()=>{
                this.setState({
                  customOk:''
                })
              });
              const newTargetKey = this.CustomTransferRef.state.targetValue

              this.setState({
                  columns:newTargetKey.map((item) => {
                      if(item.isSort === 1){
                        return {title:item.title,dataIndex:item.key,sorter: (a, b) => a[item.key] - b[item.key]}
                      }
                        return {title:item.title,dataIndex:item.key}
                   
                  })
              })
    
         }

          handleCancel = () => {
            //  setVisible(false)
            //  setCustomOk('cancel')
            this.setState({
                visible:false,
                customOk:'cancel'
            })
         }

          handleShowCustomTransfer = () => {
            // setVisible(true)
            this.setState({
                visible:true
            })
         }
   

    render(){
        const {visible,columns,customOk} = this.state
        const targetKeys = [ "viewCount", "validClickCount", "ctr", "cpc", "cost"]
        const data = [
            {
              key: '1',
              "viewCount":40,
               "validClickCount":1120,
               "ctr":0,
               "cpc":102,
                "cost":400
            },
            {
              key: '2',
              "viewCount":90,
              "validClickCount":1020,
              "ctr":4,
              "cpc":112,
               "cost":90
            },
            {
              key: '3',
              "viewCount":130,
               "validClickCount":200,
               "ctr":9,
               "cpc":2,
               "cost":120
            },
            {
              key: '4',
              "viewCount":80,
              "validClickCount":4220,
              "ctr":20,
              "cpc":121,
               "cost":140
            },
          ];
        return <div style={{margin:'20px'}}>
          <Button onClick={this.handleShowCustomTransfer} style={{marginBottom:'20px '}}>自定义列</Button>
          <Table columns={columns} dataSource={data} onChange={this.onChange} />
          {visible && (
          <Modal
            visible={visible}
            title="自定义展示列"
            onOk={this.handleColumnModalOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            wrapClassName="custom-modal-wrap"
            width="1100px"
          >
            <CustomTransfer
              dataSource={fields}
              ref={(node)=> (this.CustomTransferRef = node)}
              onChange={this.handleColumnChange}
              targetKeys={targetKeys}
              customOk={customOk}
            />
          </Modal>
          )}
        </div>
    }

}

export default TableCom