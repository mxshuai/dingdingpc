import nattyFetch from 'natty-fetch';

import { urlPrefix, isDev } from './variables';

// See https://github.com/Jias/natty-fetch for more details.
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  // jsonp: true,
  withCredentials: false,
  traditional: true,
  //header: {'Content-Type': 'application/json'},
  //data: {
   // _tb_token_: '',
  //},
  //delay:1000,
  method:'POST',
  timeout: 0,
  didFetch: () => {//fn.setState({loaded: false});
},
  // 请按照需要开启
  fit(response) {

      return {
              success:response.message,
              content: response,
              error: {
                errorMsg: response.message,
                errorCode: response.code
              },
            };   
  },
  willFetch() {
    // fn.setState({loaded: false});
      //message.loading("数据加载中...", 0)
    },
  process:(res)=>{
    //console.log(res)
    if(res.code!="0000"){
      //alert(Dialog)
      //alert(JSON.stringify(res))
      //Dialog.alert({
             // title: '测试',
             // content:"11111",              
           // });
       //Dialog.alert({
         //     content: res.message              
           // });
        return res;
    }else{
      return res;
    }
  }
});

context.create('SomeModuleAPI', {

//获取部门列表
  getDepartment: {
    mockUrl: 'query/mockjson.json',
    url: '/act_web/actdingding/v1/04',
    data:{},
    
  },
 
  //活动和活动id获取
  getActivityId: {
    mockUrl: 'query/activejson.json',
    url: '/act_web/actdingding/v1/02',
    data:{},//默认为红包、默认选中  运营部门
    
  },
  //活动对应的模板信息
  getActivityInfo: {
    mockUrl: 'query/redjson.json',
    url: '/act_web/actdingding/v1/03',
    data:{},
   
  },
  submit: {
    mockUrl: 'query/redjson.json',
    url: '/act_web/actdingding/v1/01',
    data:{},
    
  },
    submitBatch: {
    mockUrl: 'query/redjson.json',
    url: '/act_web/actdingding/v1/07',
    header: {'Content-Type': 'application/json'},
    data:{},
    
  },
});

export default context.api;
