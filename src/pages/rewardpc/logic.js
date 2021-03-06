import { basicJSON} from '../../app/variables';
import 'dingtalk-jsapi/entry/mobile';
import alert from 'dingtalk-jsapi/api/device/notification/alert';
import close from 'dingtalk-jsapi/api/biz/navigation/close';

export default {
  defaults(props) {
    return {
      //asd:'1111',
      loaded:true
     
    };
  },
  update({ fn, setState ,getProps ,getState }) {
   // console.log(getProps().asd)
  //setState({asd:1,loaded:true});
},
  async getDepartment({ fn, setState },ajaxdata) {
    const realajaxdata = await fn.DB.SomeModuleAPI.getDepartment();

    for(var item in realajaxdata.data){//遍历json对象的每个key/value对,p为key
          let temp={};
          temp.label=realajaxdata.data[item]
          temp.key=item
          ajaxdata.department.source.push(temp) 
               
        }
     
    setState({loaded: true,  isrender: true, ajaxdata});

  },
  async getActivityId({ fn, setState },ajaxdata) {
    //console.log(ajaxdata.department)
    //console.log(ajaxdata.reqType)
    const postdata={"deptment":ajaxdata.department.value.key,"reqType":ajaxdata.reqType};
    
    const realajaxdata  = await fn.DB.SomeModuleAPI.getActivityId(postdata);
    //console.log(realajaxdata)
    ajaxdata.activityName.value=undefined;
     ajaxdata.activityName.source=[]; 
     ajaxdata["list"]=[];   
    ajaxdata["list"][0]=JSON.parse(JSON.stringify(basicJSON));
    //alert(JSON.stringify(realajaxdata))
    //const realajaxdata={"data":[{"id":5,"deptment":"101","activityId":206,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"钉钉审批测试","activityBeginTime":1570001163,"activityEndTime":1571210765,"activityStatus":4},{"id":7,"deptment":"101","activityId":101,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"翼龙汇会员招募","activityBeginTime":1495590743,"activityEndTime":1577843567,"activityStatus":4},{"id":3,"deptment":"101","activityId":94,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"加息券活动","activityBeginTime":1491036149,"activityEndTime":1577384152,"activityStatus":4},{"id":1,"deptment":"101","activityId":28,"createtime":null,"updatetime":null,"flag":null,"operateuser":null,"deptName":"运营部门","activityTitle":"生日红包活动","activityBeginTime":1469013363,"activityEndTime":1609430399,"activityStatus":4}]};
     realajaxdata.data.forEach((item) => {
            let temp={};
            temp.label=item.activityTitle
            temp.key=item.activityId
            ajaxdata.activityName.source.push(temp) 
            //console.log(temp.value)
            // let {interestLevel}=basicJSON
              //asd.interestLevel=ajaxdata["list"]["0"]["interestLevel"];  
            //ajaxdata["list"]["0"]["interestLevel"]["source"].push(temp)  
            //if(temp.value==28){
              //ajaxdata["list"]["0"]["interestLevel"]=basicJSON.interestLevel
            //}
            //console.log(basicJSON.interestLevel)
            //console.log(ajaxdata["list"]["0"]["interestLevel"])
           // console.log(ajaxdata.activityName.source)
                
                   
    });  

   
    setState({loaded: true, isrender: true, ajaxdata});
    
  },
  async getActivityInfo({ fn, setState },prams,index,ajaxdata) {
   
      const localbasicJSON=JSON.parse(JSON.stringify(basicJSON));
    
    var postdata={};
    if(prams=='activityName'||prams=='rewardType'){
     postdata={
      activityId:ajaxdata.activityName.value.key,
      rewardType:ajaxdata.rewardType.value.key
    };
              
     //数据初始化
     ajaxdata["list"][index]["interestLevel"]=localbasicJSON.interestLevel;
     ajaxdata["list"][index]["minAmount"]=localbasicJSON.minAmount;
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
     //console.log('1111'+JSON.stringify(localbasicJSON.interestLevel))

    }else if(prams=='interestLevel'){
     postdata={
      activityId:ajaxdata.activityName.value.key,
      rewardType:ajaxdata.rewardType.value.key,
      reqValue:ajaxdata.list[index].interestLevel.value.key
    };
     //数据初始化
     ajaxdata["list"][index]["minAmount"]=localbasicJSON.minAmount;
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='minAmount'){
      postdata={
      activityId:ajaxdata.activityName.value.key,
      rewardType:ajaxdata.rewardType.value.key,
      reqValue:ajaxdata.list[index].interestLevel.value.key,
      reqActivateBalance:ajaxdata.list[index].minAmount.value.key
    };
     //数据初始化
    
     ajaxdata["list"][index]["productDate"]=localbasicJSON.productDate;
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='productDate'){
      postdata={
      activityId:ajaxdata.activityName.value.key,
      rewardType:ajaxdata.rewardType.value.key,
      reqValue:ajaxdata.list[index].interestLevel.value.key,
      reqActivateBalance:ajaxdata.list[index].minAmount.value.key,
      reqRealizationPro:ajaxdata.list[index].productDate.value.key
    };
     //数据初始化
    
     ajaxdata["list"][index]["validityPeriod"]=localbasicJSON.validityPeriod;
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }else if(prams=='validityPeriod'){
      postdata={
      activityId:ajaxdata.activityName.value.key,
      rewardType:ajaxdata.rewardType.value.key,
      reqValue:ajaxdata.list[index].interestLevel.value.key,
      reqActivateBalance:ajaxdata.list[index].minAmount.value.key,
      reqRealizationPro:ajaxdata.list[index].productDate.value.key,
      reqValidateDays:ajaxdata.list[index].validityPeriod.value.key
    };
     //数据初始化
     
     ajaxdata["list"][index]["applyNum"]=localbasicJSON.applyNum;
    }

    //alert(JSON.stringify(postdata))
    const realajaxdata  = await fn.DB.SomeModuleAPI.getActivityInfo(postdata);
     //alert(JSON.stringify(realajaxdata))
    //const realajaxdata  = [{"id":750,"type":1,"title":"钉钉测试红包1","value":1.0000,"validityDays":5,"experienceDays":null,"activateBalance":100.00,"realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,","realizationChannel":",1,2,3,4,","description":"单笔满100元可变现1个红包；每出借1笔只能变现1个红包；红包与加息券不可叠加使用；","realizationProStr":"仅限出借翼农计划30天、90天、180天、365天产品，翼农惠享1月、3月、6月、12月产品，私人定制封闭期30天及以上产品。","realizationChannelStr":"在app、翼龙钱包、wap、pc可使用。"},{"id":751,"type":1,"title":"钉钉测试红包2","value":2.0000,"validityDays":5,"experienceDays":null,"activateBalance":200.00,"realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,","realizationChannel":",1,2,3,4,","description":"单笔满100元可变现1个红包；每出借1笔只能变现1个红包；红包与加息券不可叠加使用；","realizationProStr":"仅限出借翼农计划30天、90天、180天、365天产品，翼农惠享1月、3月、6月、12月产品，私人定制封闭期30天及以上产品。","realizationChannelStr":"在app、翼龙钱包、wap、pc可使用。"}];
    
     realajaxdata.data.forEach((item) => {
            let temp={};
            let tempprams='';
            if(prams=='activityName'||prams=='rewardType'){

               temp.label=item.value//activityName   选择活动之后确定金额 
               temp.key=item.value
               tempprams='interestLevel'
               ajaxdata["list"][index][tempprams]["source"].push(temp)       
                                                 
              }else if(prams=='interestLevel'){

                temp.label=item.activateBalance//interestLevel  选择金额之后确定起投金额
                temp.key=item.activateBalance
                tempprams='minAmount'
                ajaxdata["list"][index][tempprams]["source"].push(temp)      
  
              }else if(prams=='minAmount'){

                temp.label=item.realizationProStr//minAmount    选择起投金额之后确定适用产品
                temp.key=item.realizationPro
                tempprams='productDate'
                ajaxdata["list"][index][tempprams]["source"].push(temp)      
                         
              }else if(prams=='productDate'){

                 temp.label=item.validityDays//productDate       选择适用产品之后确定有效期
                 temp.key=item.validityDays
                 tempprams='validityPeriod'
                 ajaxdata["list"][index][tempprams]["source"].push(temp)      
               
              }else if(prams=='validityPeriod'){

                ajaxdata["list"][index]["id"]=item.id;
                //alert(JSON.stringify(ajaxdata["list"][index]))
              }


              
    });
    //console.log(ajaxdata);  
     
     //alert('最终的'+JSON.stringify(ajaxdata))
    //setState({ loaded: true,isrender: true, "ajaxdata":{"list":[{"id":1}]}});
    setState({ loaded: true,isrender: true, ajaxdata});
  },
  async submit({ fn, setState },ajaxdata) {

    const totaldata={};
    if(ajaxdata.rewardType.value.key!=5){
          totaldata.applyDeptName=ajaxdata.department.value.label;//申请部门名称（中文）
          totaldata.activityName=ajaxdata.activityName.value.label;//所选活动名称（中文）
          totaldata.activityId=ajaxdata.activityName.value.key;
          totaldata.rewardId=ajaxdata.list[0].id;
          totaldata.rewardTypeName=ajaxdata.rewardType.value.label;//申请类型名称（中文）
          totaldata.type=ajaxdata.rewardType.value.key;
          totaldata.sendType=ajaxdata.SingleOrBatch.value.key;
          totaldata.mobile=ajaxdata.singledata.userPhone.default;
          totaldata.applyUser=ajaxdata.applyName;//申请人
          totaldata.username=ajaxdata.singledata.userName.default;//客户姓名
          totaldata.description=ajaxdata.singledata.applyReason.default;//申请原因
          
          totaldata.balance=ajaxdata.list[0].interestLevel.value.key;
          totaldata.activateBalanceName=ajaxdata.list[0].minAmount.value.label;//变现/激活金额名称(含中文) 例： 20万
          totaldata.activateBalance=ajaxdata.list[0].minAmount.value.key;
          totaldata.realizationProName=ajaxdata.list[0].productDate.value.label;//适用产品和期限名称中文
          totaldata.realizationPro=ajaxdata.list[0].productDate.value.key;
          totaldata.validityDays=ajaxdata.list[0].validityPeriod.value.key;
          //totaldata.upperserialnumber="075e2d3034e83facb03b30843e74f952";//钉钉流水号
          totaldata.upperserialnumber=ajaxdata.dingcode;//钉钉流水号
          totaldata.count=ajaxdata.list[0].applyNum.value.key;//申请张数
      }else{
          totaldata.applyDeptName=ajaxdata.department.value.label;//申请部门名称（中文）
          totaldata.activityName=ajaxdata.activityName.value.label;//所选活动名称（中文）
          totaldata.activityId=ajaxdata.activityName.value.key;
          totaldata.rewardId=ajaxdata.list[0].id;
          totaldata.rewardTypeName=ajaxdata.rewardType.value.label;//申请类型名称（中文）
          totaldata.type=ajaxdata.rewardType.value.key;
          totaldata.applyUser=ajaxdata.applyName;//申请人
          totaldata.auditImgUrl=ajaxdata.photoList[0].url;//申请原因
          totaldata.description=ajaxdata.singledata.applyReason.default;//申请原因                   
          totaldata.upperserialnumber=ajaxdata.dingcode;//钉钉流水号
          totaldata.count=ajaxdata.list[0].applyNum.value.key;//申请张数
      }
    //const totaldata={"activityId":"206","rewardId":750,"type":"1","mobile":"111111","applyUser":"aaaaaa",
    //"balance":"1","activateBalance":"100","realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,",
    //"validityDays":"5","upperserialnumber":"111"}
    //console.log(totaldata)
   // console.log(totaldata)
    const result  = await fn.DB.SomeModuleAPI.submit(totaldata);
   
    setState({ loaded: true,isrender: true});
    if(result.code!="200"){
      alert({
          message: result.message,
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
              //onSuccess将在点击button之后回调
              /*回调*/
          },
          onFail : function(err) {}
      });      
    }else{  
      alert({
          message: "提交成功",
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
               close({})
          },
          onFail : function(err) {}
      }); 

      
    }
    //alert(JSON.stringify(result))
    
  },
   async submitBatch({ fn, setState },ajaxdata) {
    console.log(ajaxdata)
    const totaldata={};

          totaldata.applyDeptName=ajaxdata.department.value.label;//申请部门名称（中文）
          totaldata.activityName=ajaxdata.activityName.value.label;//所选活动名称（中文）
          totaldata.activityId=ajaxdata.activityName.value.key;
          
          //totaldata.rewardTypeName=ajaxdata.rewardType.value.label;//申请类型名称（中文）
          totaldata.type=ajaxdata.rewardType.value.key;
          totaldata.sendType=ajaxdata.SingleOrBatch.value.key;

          totaldata.applyUser=ajaxdata.applyName;//申请人

          totaldata.description=ajaxdata.singledata.applyReason.default;//申请原因

          totaldata.batchPrizeVOList =[];

          ajaxdata.list.forEach((item) => {

          let tempobj={};

          tempobj.rewardId=item.id;

          tempobj.prizeRate=item.interestLevel.value.key;
          //totaldata.activateBalanceName=ajaxdata.list[0].minAmount.value.label;//变现/激活金额名称(含中文) 例： 20万

          tempobj.prizeMinAmont=item.minAmount.value.key;
          //totaldata.realizationProName=ajaxdata.list[0].productDate.value.label;//适用产品和期限名称中文

          tempobj.realizationProName=item.productDate.value.label;

          tempobj.validityDays=item.validityPeriod.value.key;
          
          tempobj.count=item.applyNum.value.key;//申请张数
          tempobj.customerExcelVOList=item.photoList;

          totaldata.batchPrizeVOList.push(tempobj);

          })


          



          totaldata.upperserialnumber=ajaxdata.dingcode;//钉钉流水号
          
      
    //const totaldata={"activityId":"206","rewardId":750,"type":"1","mobile":"111111","applyUser":"aaaaaa",
    //"balance":"1","activateBalance":"100","realizationPro":",y30,y90,y180,y365,tc30,tc90,yp1,yp3,yp6,yp12,",
    //"validityDays":"5","upperserialnumber":"111"}
    //console.log(totaldata)
    console.log(totaldata)

    const result  = await fn.DB.SomeModuleAPI.submitBatch(totaldata);
   
    setState({ loaded: true,isrender: true});
    if(result.code!="200"){
      alert({
          message: result.message,
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
              //onSuccess将在点击button之后回调
              /*回调*/
          },
          onFail : function(err) {}
      });      
    }else{  
      alert({
          message: "提交成功",
          title: "提示",//可传空
          buttonName: "确定",
          onSuccess : function() {
               close({})
          },
          onFail : function(err) {}
      }); 

      
    }
    //alert(JSON.stringify(result))
    
  },
};
