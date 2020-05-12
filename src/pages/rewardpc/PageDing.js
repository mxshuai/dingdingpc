import { Component } from 'refast';
import { Form,Input, Icon, Select, Row, Col,  Button ,message,Spin} from 'antd';
import * as dd from 'dingtalk-jsapi';
import { basicJSON } from '../../app/variables';

import RedBatch from 'components/redpc';
import RedSingle from 'components/redpc/single';
import InterestBatch from 'components/interestpc';
import InterestSingle from 'components/interestpc/single';
import Cash from 'components/cashpc';
import logic from './logic';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;


const statebasicJSON=JSON.parse(JSON.stringify(basicJSON));
const localbasicJSON=JSON.parse(JSON.stringify(basicJSON));

export default class Page extends Component {
  constructor(props) {
    super(props, logic);
    this.state = {
      loaded:false,
      isrender: false,
      error:true,
      photoList: [],

        ajaxdata:{
                  "department":{
                        "default":"请选择部门",
                        "typetext":"请选择部门",
                        "value":undefined,
                        "icon":true,
                        "errtxt":"",
                        "source":[]
                    },    
                    "activityName":{
                        "default":"请选择活动",
                        "typetext":"请选择活动",
                        "value":undefined,
                        "icon":true,
                        "errtxt":"",
                        "source":[]
                    }, 
                     "rewardType":{
                        "default":"请选择奖励类型",
                        "typetext":"红包",//1-红包 3--加息券 5--现金奖励
                        "value":{
                                "key":"1",
                                "label": "红包"
                            },//1-红包 3--加息券 5--现金奖励
                        "icon":true,
                        "errtxt":"",
                        "source":[{
                                "key":"1",
                                "label": "红包"
                            }, 
                            {
                                "key":"3",
                                "label": "加息券"
                            },{
                                "key":"5",
                                "label": "现金奖励"
                            }]
                    },                                                                 
                    "list":[statebasicJSON],
                     
                     "reqType":1,//1--红包/加息券 2--现金奖励
                      "applyName":"申请人",//申请人
                      "singledata":{
                      "userPhone":{
                          default:"",
                          errtxt:""
                          },
                          "userName":{
                            default:"",
                            errtxt:""
                          },
                          "applyReason":{
                            default:"",
                            errtxt:""
                          }
                     },

                     "SingleOrBatch":{
                    "source": [{
                                "key":"1",
                                "label": "单张发放"
                            }, 
                            {
                                "key":"2",
                                "label": "批量发放"
                            }],
                      "value":{
                                "key":"1",
                                "label": "单张发放"
                            },
                      "typetext":"单张发放",

                     },
                      "dingcode":"",
                }
                   
                          
    };

    
  }
 
  componentDidMount() {

  
      this.dispatch('getDepartment',this.state.ajaxdata);
     var that=this;
     
            dd.runtime.permission.requestAuthCode({
                    corpId: 'ding3e33fd34c55530c7', // 企业id
                    onSuccess: function(info) {

                        //alert("code" + info.code)
                        that.state.ajaxdata.dingcode=info.code  //通过该免登授权码可以获取用户身份
                         //alert(JSON.stringify(that.state))
                        that.setState({});   

                    },
                    onFail: function(err) {

                        alert("error"+JSON.stringify(err))
                    }

              });
           
       
       
    }

   

  //通用清除已选值
  handleClearCommon=(prams,index)=>{
    //alert(index)
     if(typeof(index)==="undefined"){
          var index=0
         }

    let ajaxdata={...this.state.ajaxdata};//只能更新整个ajaxdata数据，不能写成this.state.ajaxdata.list[0]
     //alert(JSON.stringify(obj))

    ajaxdata["list"][index][prams]['value']=undefined;
    ajaxdata["list"][index][prams]['icon']=true;
    //清除之后联动初始化
    if(prams=='interestLevel'){
     ajaxdata["list"][index]["minAmount"]=localbasicJSON.minAmount;
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='minAmount'){
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='productDate'){
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='validityPeriod'){
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }    

   
    //alert(prams)
    this.setState({ajaxdata});//只能更新整个ajaxdata数据，不能写成this.state.ajaxdata.list[0]
    //alert(this.state.ajaxdata.list[0])
  }
  //通用选择框
  handleSelectCommon=(result,prams,index)=>{
    
       var that = this;
       //alert(index)
       if(typeof(index)==="undefined"){
        index=0;
       }
       let ajaxdata= {...this.state.ajaxdata};
      // alert(JSON.stringify(ajaxdata)) 
      if(result){            
               
                    ajaxdata["list"][index][prams]['value']=result                      
                    ajaxdata["list"][index][prams]['icon']=false
                    if(prams!="applyNum"){
                    that.setState({ loaded:false,ajaxdata});   
                    //alert(JSON.stringify(ajaxdata))                  
                    that.dispatch('getActivityInfo',prams,index,that.state.ajaxdata);
                  }else{
                    that.setState({ajaxdata});  
                  }
                    
                    
          }else{
            that.handleClearCommon(prams,index);
          }
        

  }
  //活动专用清除已选值
  handleClearAct=(prams)=>{

    let ajaxdata={...this.state.ajaxdata}

    ajaxdata[prams]['value']=undefined;
    ajaxdata[prams]['icon']=true;
    if(prams=="department"){

        ajaxdata["activityName"]['value']=undefined;
        ajaxdata["activityName"]['icon']=true;
        ajaxdata["activityName"]['source']=[];
     }
    ajaxdata["list"]=[];
    //ajaxdata["list"][0]=localbasicJSON;//第一次清除之后会导致localbasicJSON已经改变，第二次再掉就变化了//貌似只有数组才会有问题，对象没有
    ajaxdata["list"][0]=JSON.parse(JSON.stringify(basicJSON));
    //alert(JSON.stringify(localbasicJSON))
    //alert(JSON.stringify(ajaxdata))
    //this.props.form.setFieldsValue({name:"1111"})
     //ajaxdata.singledata.applyReason.default="1111111111111111"
    this.setState({ajaxdata});

  }
  //活动专用选择框
  handleSelectAct=(result,prams)=>{
//console.log(result)
       var that = this;
       let ajaxdata={...that.state.ajaxdata}
       //console.log(result)
              if(result){       
                  
                    ajaxdata[prams]['value']=result                    
                    ajaxdata[prams]['icon']=false
                  
                    if(prams=="department"){
                      that.setState({ loaded:false,ajaxdata});
                      that.dispatch('getActivityId',that.state.ajaxdata);
                    }else if(prams=="rewardType"){

                  
                          if(result.key==5){
                             ajaxdata.reqType=2;
                           }else{
                             ajaxdata.reqType=1;
                           }    
                          

                      if(ajaxdata["department"]['value']){
                          that.setState({ loaded:false,ajaxdata}, () => {
                            that.dispatch('getActivityId',that.state.ajaxdata);
                          });
                        
                         
                         
                      }else{
                        that.setState({ajaxdata});
                        // console.log(that.state.ajaxdata)
                        //message.warning('请选择活动');       
                        //return false;
                      }
                     
                    }else{
                        that.setState({ loaded:false,ajaxdata}, () => {
                          that.dispatch('getActivityInfo',prams,0,that.state.ajaxdata);
                        });
                       
                    }
                  }else{
                    that.handleClearAct(prams);

                  }
                   
                   
                    
         
  }
  //单张与批量选择
   handleChangeNum=(result)=> {
    
//this.dispatch('getActivityId',this.state.ajaxdata);
     var that = this;
    let ajaxdata={...this.state.ajaxdata}
    

                
               
        ajaxdata['SingleOrBatch']['value']=result

      
      
        ajaxdata["activityName"]['value']=undefined;
        ajaxdata["activityName"]['icon']=true;

        ajaxdata["list"]=[];

        
        //obj["ajaxdata"]["list"]=[];
        //alert(JSON.stringify(basicJSON));
        //alert(JSON.stringify(obj));
        //obj["ajaxdata"]["list"][0]=localbasicJSON;//不能用localbasicJSON，问题待查
        ajaxdata["list"][0]=JSON.parse(JSON.stringify(basicJSON));
   
          //alert(JSON.stringify(localbasicJSON));
          //alert(JSON.stringify(obj));

            that.setState({ajaxdata});
              
         

    }
    //通用文本框修改
    handleTextChange=(name, event)=> {
     // console.log(name)
     
      if(event && event.target){
          let ajaxdata={...this.state.ajaxdata}
            ajaxdata['singledata'][name]['default']=event.target.value;
            this.setState({ajaxdata});
        }
      
    }

  //增加加息券list
  addOneItem=(index)=>{
   
     let ajaxdata={...this.state.ajaxdata}

     if(!ajaxdata.department.value){
        message.warning('请选择部门');
        return false;
      }
      if(!ajaxdata.activityName.value){
        message.warning('请选择活动');      
        return false;
      }
     let localbasicJSON=JSON.parse(JSON.stringify(basicJSON));
      //alert(JSON.stringify(ajaxdata["list"][0]["interestLevel"]))

     localbasicJSON["interestLevel"]=JSON.parse(JSON.stringify(ajaxdata.list[0].interestLevel))
     localbasicJSON["interestLevel"]['typetext']=JSON.parse(JSON.stringify(ajaxdata.list[0].interestLevel)).default;
     localbasicJSON["interestLevel"]['value']=undefined;
     localbasicJSON["interestLevel"]['icon']=true;

    
     //alert(JSON.stringify(ajaxdata["list"][0]["interestLevel"]))
    // alert(JSON.stringify(newlocalbasicJSON))
     ajaxdata.list.push(localbasicJSON)
  //alert(JSON.stringify(ajaxdata))
     this.setState({ajaxdata});
     
  }
   //删除加息券list
  delOneItem=(num)=>{
     let ajaxdata={...this.state.ajaxdata}
     ajaxdata.list.splice(ajaxdata.list.findIndex(item => item.index === num), 1)
     this.setState({ajaxdata});
    // console.log(ajaxdata.list)
  }
    handleUploadChange = ({file,fileList},index) => {
       let ajaxdata={...this.state.ajaxdata}

  
    if(file.status=="done"||file.status=="error"){


            if(file.response){

              if(file.response.code=="200"){
               let photo={fileName:file.name,uploadUrl:file.response.data,uid:file.uid};

                ajaxdata.list[index].photoList.push(photo)
             
             
              }else{

                 dd.device.notification.alert({
                      message: file.response.message,
                      title: "提示",//可传空
                      buttonName: "确定",
                      onSuccess : function() {
                     
                      },
                      onFail : function(err) {}
                  });      

            
                
              }
              }else{
                 dd.device.notification.alert({
                      message:"上传失败",
                      title: "提示",//可传空
                      buttonName: "确定",
                      onSuccess : function() {
                     
                      },
                      onFail : function(err) {}
                  });      
                   
               
              }
            
             
          }else if(file.status=="removed"){

            const temparr=ajaxdata.list[index].photoList.filter((item)=>{

                return item.uid!==file.uid;
             })  
           ajaxdata.list[index].photoList=temparr;
          
          }else{
             
          }
   
 ajaxdata.list[index].fileList=fileList
      this.setState({ ajaxdata }) 
   
   
 }   
    submit=()=>{
      //逻辑判断提交条件
      let obj=this.state.ajaxdata;


     

      //console.log(obj);
    //return false
     if(obj.reqType==1){
      if(obj.SingleOrBatch.value.key==1){

        if(!obj.department.value){
            message.warning('请选择部门');
            
            return false;
          }
          else if(!obj.activityName.value){
            message.warning('请选择活动');
            
            return false;
          }
          else if(!obj.list[0].interestLevel.value){
            message.warning('请选择金额');
           
            return false;
          }
          else if(!obj.list[0].minAmount.value){
            message.warning('请选择变现金额');
           
            return false;
          }
          else if(!obj.list[0].productDate.value){
            message.warning('请选择适用产品');
            
            return false;
          }
          else if(!obj.list[0].validityPeriod.value){
            message.warning('请选择有效期');
            
            return false;
          }
          else if(obj.singledata.userPhone.default==""){
            message.warning('请填写客户手机号');
            
            return false;
          }
          else if(obj.singledata.userName.default==""){
            message.warning('请填写客户名');
            
            return false;
          }
          else if(obj.singledata.applyReason.default==""){
            message.warning('请填写申请原因');
            
            return false;
          }

      }else{

       //批量发放
       if(!obj.department.value){
            message.warning('请选择部门');
            
            return false;
          }
          else if(!obj.activityName.value){
            message.warning('请选择活动');
            
            return false;
          }


          for(let i=0;i<obj.list.length;i++){

                if(!obj.list[i].interestLevel.value){
                  message.warning('请选择金额');
                 
                  return false;
                }
                else if(!obj.list[i].minAmount.value){
                  message.warning('请选择变现金额');
                 
                  return false;
                }
                else if(!obj.list[i].productDate.value){
                  message.warning('请选择适用产品');
                  
                  return false;
                }
                else if(!obj.list[i].validityPeriod.value){
                  message.warning('请选择有效期');                  
                  return false;
                }
                else if(!obj.list[i].photoList.length){
                  console.log(obj.list[i].photoList)
                  message.warning('有附件未上传');                  
                  return false;
                }

                }

          if(obj.singledata.applyReason.default==""){
            message.warning('请填写申请原因');            
            return false;
          }
          

             this.setState({loaded:false});
             this.dispatch('submitBatch',this.state.ajaxdata);//批量上传
              return false;
            
        
      }

          
      }else{

         obj.photoList=this.refs.CashChild.state.photoList;
         //console.log(obj.photoList)

        if(!obj.department.value){
            message.warning('请选择部门');
            
            return false;
          }
          else if(!obj.activityName.value){
            message.warning('请选择活动');
            
            return false;
          }
           else if(obj.photoList.length==0){
            message.warning('请上传或重新上传图片');
            
            return false;
          }
          
          else if(obj.singledata.applyReason.default==""){
            message.warning('请填写申请原因');
            
            return false;
          }

      }
       this.setState({loaded:false});
       this.dispatch('submit',this.state.ajaxdata);
    }


  render() {
  const formItemLayout = {
      labelCol: {  
            
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 17 },
        sm: { span: 17 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 17,
          offset: 4,
        },
        sm: {
          span: 17,
          offset: 4,
        },
      },
    };

    const t = this;
    //const { ajaxdata = {} } = t.state;
    //alert(JSON.stringify(t.state))
    if(t.state.ajaxdata.rewardType.value.key==3){
      var Tag = t.state.ajaxdata.SingleOrBatch.value.key==1 ? InterestSingle : InterestBatch;//模板名称也可以根据数据变更,模板名称是只读属性，在渲染时定义
    }else if(t.state.ajaxdata.rewardType.value.key==1){
      var Tag = t.state.ajaxdata.SingleOrBatch.value.key==1 ? RedSingle : RedBatch;//模板名称也可以根据数据变更,模板名称是只读属性，在渲染时定义
    }else{
      var Tag =Cash
    }
    
    //console.log(t.state.Tag)
    //const Tag = t.state.Tag;//模板名称也可以根据数据变更
    return (
       <Spin tip="Loading..."  spinning={!t.state.loaded}>
                    <Form style={{padding:30}}>                         
                       <FormItem {...formItemLayout} label="奖励类型" required> 
                          <Select  value={t.state.ajaxdata.rewardType.value}  labelInValue  onChange={(value)=>t.handleSelectAct(value,'rewardType')}>
                          {t.state.ajaxdata.rewardType.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                           </Select>      
                      </FormItem>
                        <FormItem {...formItemLayout} label="所选部门" required> 
                      
                         <Select allowClear  value={t.state.ajaxdata.department.value} labelInValue placeholder={t.state.ajaxdata.department.typetext}  onChange={(value)=>t.handleSelectAct(value,'department')}>
                        {t.state.ajaxdata.department.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                           </Select> 
                      
                    </FormItem>
                    {t.state.ajaxdata.rewardType.value.key!=5 ? (
                       <FormItem {...formItemLayout} label="发放类型" required>                     
                          <Select  value={t.state.ajaxdata.SingleOrBatch.value} labelInValue placeholder={t.state.ajaxdata.SingleOrBatch.typetext}  onChange={(value)=>t.handleChangeNum(value)}>
                          {t.state.ajaxdata.SingleOrBatch.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                         </Select>        
                       </FormItem>
                        ):null}
                     <FormItem {...formItemLayout} label="所选活动" required> 
                          <Select  value={t.state.ajaxdata.activityName.value} allowClear labelInValue placeholder={t.state.ajaxdata.activityName.typetext}  onChange={(value)=>t.handleSelectAct(value,'activityName')}>
                          {t.state.ajaxdata.activityName.source.map(d => <Option key={d.key}>{d.label}</Option>)}
                           </Select>      
                      </FormItem>

                       

              
                   <Tag ref="CashChild" parentuserInfo={t.state.ajaxdata.singledata}  arr={t.state.ajaxdata.list} parenthandleTextChange={t.handleTextChange} parentdelOneItem={t.delOneItem} parenthandleSelectCommon={t.handleSelectCommon} parenthandleUploadChange={t.handleUploadChange} />
                      {t.state.ajaxdata.SingleOrBatch.value.key!=1&&t.state.ajaxdata.list.length<7 ? (
                        <Row>
                        <Col offset={4} span={20} style={{paddingBottom:20}}> <div onClick={()=>t.addOneItem()}  style={{color:'#09c',corsor:"pointer"}}>{t.state.ajaxdata.rewardType.value.key==3 ?"增加加息券":"增加红包"}+</div></Col>
                        </Row>
                      
                      ):null}
                        <FormItem {...formItemLayout} label="发放时间"> 
                      
                           <Input  disabled value="审批后即时发放"/>         
                       </FormItem>
                     <FormItem {...formItemLayout} label="申请原因" required> 
                      
                         <TextArea  rows={2}  placeholder="请输入" value={t.state.ajaxdata.singledata.applyReason.default} onChange={(value) => { t.handleTextChange('applyReason', value) }}/>               
                      </FormItem>
                     <FormItem {...tailFormItemLayout}> 
                     
                          <Button type="primary" size="large" style={{ width:150 }} htmlType="submit" onClick={() => {t.submit()}}>提交</Button>
                       </FormItem>
                     
               </Form> 
         </Spin>

    );
  }
}
