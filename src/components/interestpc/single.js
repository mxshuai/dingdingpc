import { Component } from 'refast';
import { Form, Input,  Icon, Select, Row, Col } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

 export default class reditem extends Component {
  constructor(props) {
    super(props);

   }
   componentWillReceiveProps(nextProps) {//componentWillReceiveProps方法中第一个参数代表即将传入的新的Props
    //console.log(preProps)
    
    /*console.log(this.props.arr)
    console.log(nextProps.arr)
    if (this.props.arr !== nextProps.arr){
      console.log(1)
      var data={...nextProps}
      console.log(data.arr[0].interestLevel.typetext)

        //在这里我们仍可以通过this.props来获取旧的外部状态
        //通过新旧状态的对比，来决定是否进行其他方法
         this.setState({childarr: data.arr,message:2},()=>{
          console.log("子组件更新state")
          console.log(this.state.childarr)
        });
    }*/
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
                          t.props.arr.map((item,index) => { //这个地方通过this.props.arr接收到父组件传过来的arr，然后在{}里面进行js的循环
                              return (
                                              <div key={index}> 
                                              
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
                                                  
                                <FormItem {...formItemLayout} label="申请张数"  required>  
                                <Select value={item.applyNum.value} labelInValue placeholder={item.applyNum.typetext}  onChange={(value)=>t.props.parenthandleSelectCommon(value,'applyNum',index)}>
                                {item.applyNum.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                                </Select>   
                                                    </FormItem>
                                                    <FormItem {...formItemLayout} label="客户注册手机号" required>  

                                                  <Input    placeholder="请输入" value={t.props.parentuserInfo.userPhone.default} onChange={(value) => { t.props.parenthandleTextChange('userPhone', value)}}/>    
                                                  </FormItem>  
                                                  <FormItem {...formItemLayout} label="客户姓名" required>  
                                                  <Input    placeholder="请输入" value={t.props.parentuserInfo.userName.default} onChange={(value) => { t.props.parenthandleTextChange('userName', value)}}/>    
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
