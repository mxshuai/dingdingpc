import { Component } from 'refast';
import { Form, Input,  Icon, Select, Row, Col,Upload,Button  } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

export default class reditem extends Component {
  constructor(props) {
    super(props);


   }
  


  render() {
    const t = this;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
       xs: { span: 14 },
        sm: { span: 17 },
      },
    };
    const uploadButton = (
      <div>
        <Button>
        <Icon type="upload" /> 上传
      </Button>
      </div>
    );
    return (
              <div className="item"> 
                         {
                          this.props.arr.map((item,index) => { //这个地方通过this.props.arr接收到父组件传过来的arr，然后在{}里面进行js的循环
                              return ( 
                                             <div key={index}> 
                                              <Row>
                                              <Col offset={4} span={20} style={{paddingBottom:10}}>加息券{index+1}{index!="0"? (<span  onClick={()=>t.props.parentdelOneItem(index)}  style={{color:'#09c',cursor:"pointer"}}>删除</span>):null}</Col>
                                              </Row>
                                              <FormItem {...formItemLayout} label="加息利率" required>            
                                                  <Select allowClear value={item.interestLevel.value} labelInValue placeholder={item.interestLevel.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'interestLevel',index)}>
                                                      {item.interestLevel.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                  <FormItem {...formItemLayout} label="起投金额" required>            
                                                  <Select allowClear value={item.minAmount.value} labelInValue placeholder={item.minAmount.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'minAmount',index)}>
                                                      {item.minAmount.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                   <FormItem {...formItemLayout} label="适用产品和期限" required>            
                                                  <Select allowClear value={item.productDate.value} labelInValue placeholder={item.productDate.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'productDate',index)}>
                                                      {item.productDate.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                   <FormItem {...formItemLayout} label="有效期" required>            
                                                  <Select allowClear value={item.validityPeriod.value} labelInValue placeholder={item.validityPeriod.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'validityPeriod',index)}>
                                                      {item.validityPeriod.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                   <FormItem {...formItemLayout} label="申请张数" required>            
                                                  <Select allowClear value={item.applyNum.value} labelInValue placeholder={item.applyNum.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'applyNum',index)}>
                                                      {item.applyNum.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                  <FormItem {...formItemLayout} label="客户名单" extra="最多可上传5个excel文件" required>            
                                                    <Upload
                                                        action="/act_web/actdingding/v1/06"
                                                        //action="http://172.30.37.111:3001/file_upload"
                                                        listType="text"
                                                        name="upload"
                                                        fileList={item.fileList}
                                                        onPreview={this.handlePreview}
                                                        onChange={(val)=>t.props.parenthandleUploadChange(val,index)}
                                                      >
                                                        {item.fileList.length >= 5 ? null : uploadButton}
                                                      </Upload>
                                                     
                                                    </FormItem>
                                                  
                                                 
                                                  
                                               </div> 

                                      )
                                                        }
                                            )
                      }                                    
                            
                  
               </div>
            )
            }
      }
