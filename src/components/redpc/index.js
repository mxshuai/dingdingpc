import { Component } from 'refast';
import { Form, Input,  Icon, Select, Row, Col } from 'antd';


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
    return (
              <div className="item"> 
                         {
                          this.props.arr.map((item,index) => { //这个地方通过this.props.arr接收到父组件传过来的arr，然后在{}里面进行js的循环
                              return ( 
                                             <div key={index}> 
                                             <Row>
                                              <Col offset={4} span={20} style={{paddingBottom:10}}>红包{index+1}<span  onClick={()=>t.props.parentdelOneItem(index)}  style={{color:'#09c',cursor:"pointer"}}>删除</span></Col>
                                              </Row>
                                              
                                               <FormItem {...formItemLayout} label="红包金额" required>            
                                                  <Select allowClear value={item.interestLevel.value} labelInValue placeholder={item.interestLevel.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'interestLevel',index)}>
                                                      {item.interestLevel.source.map(d => <Option key={d.value}>{d.key}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                  <FormItem {...formItemLayout} label="变现金额" required>            
                                                  <Select allowClear value={item.minAmount.value} labelInValue placeholder={item.minAmount.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'minAmount',index)}>
                                                      {item.minAmount.source.map(d => <Option key={d.value}>{d.key}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                   <FormItem {...formItemLayout} label="适用产品和期限" required>            
                                                  <Select allowClear value={item.productDate.value} labelInValue placeholder={item.productDate.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'productDate',index)}>
                                                      {item.productDate.source.map(d => <Option key={d.value}>{d.key}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                   <FormItem {...formItemLayout} label="有效期" required>            
                                                  <Select allowClear value={item.validityPeriod.value} labelInValue placeholder={item.validityPeriod.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'validityPeriod',index)}>
                                                      {item.validityPeriod.source.map(d => <Option key={d.value}>{d.key}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                   <FormItem {...formItemLayout} label="申请张数" required>            
                                                  <Select allowClear value={item.applyNum.value} labelInValue placeholder={item.applyNum.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'applyNum',index)}>
                                                      {item.applyNum.source.map(d => <Option key={d.value}>{d.key}</Option>)}
                                                  </Select>   
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
