// 这里放置全局的变量
//const isDev = __LOCAL__;
const isDev = false;
const basicJSON = {
                                   "interestLevel":{
                                      "default":"请选择",
                                      "typetext":"请选择",
                                      "icon":true,
                                      "value":undefined,
                                      "errtxt":"",
                                      "source":[]                            
                                  },
                                   "minAmount":{
                                      "default":"请选择",
                                      "typetext":"请选择",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":undefined,
                                      "source":[]
                                  },
                                   "productDate":{
                                      "default":"适用产品和有效期",
                                      "typetext":"请选择适用产品和有效期",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":undefined,
                                      "source":[]
                                  },
                                   "validityPeriod":{
                                      "default":"有效期",
                                      "typetext":"请选择有效期",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":undefined,
                                      "source":[]
                                  },
                                   "applyNum":{
                                      "default":"申请张数",
                                      "typetext":"请选择申请张数",
                                      "icon":true,
                                      "errtxt":"",
                                      "value":{
                                                "key":"1",
                                                "label": "1张"
                                            },
                                      "source":[{
                                                    "key":"1",
                                                    "label": "1张"
                                                }, 
                                                {
                                                    "key":"2",
                                                    "label": "2张"
                                                },
                                                {
                                                    "key":"3",
                                                    "label": "3张"
                                                },
                                                {
                                                    "key":"4",
                                                    "label": "4张"
                                                },
                                                {
                                                    "key":"5",
                                                    "label": "5张"
                                                }]
                                  },
                                  "id":'',
                                  fileList:[],
                                  photoList:[]

                    };
const urlPrefix = isDev ? '/mock/' : '/';

export default {
  urlPrefix,
  isDev,
  basicJSON,
  // 这里放置全局的调用的URL
  URLS: {},
};
