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
                                              <div  className="t-FS12 t-PT10 t-PB10 t-PL20 t-PR20 t-MT20">加息券{index+1}<span  onClick={()=>t.props.parentdelOneItem(index)} className="t-FR" style={{color:'#09c'}}>删除</span></div>
                                              <FormItem {...formItemLayout} label="加息利率" required>            
                                                  <Select allowClear value={item.interestLevel.value} labelInValue placeholder={item.interestLevel.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'interestLevel',index)}>
                                                      {item.interestLevel.source.map(d => <Option key={d.value}>{d.key}</Option>)}
                                                  </Select>   
                                                  </FormItem>
                                                  <FormItem {...formItemLayout} label="起投金额" required>            
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
