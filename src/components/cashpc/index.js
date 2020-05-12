import { Component } from 'refast';
import { Form, Icon, Upload, Modal } from 'antd';
import alert from 'dingtalk-jsapi/api/device/notification/alert';
const FormItem = Form.Item;


export default class reditem extends Component {
  constructor(props) {
    super(props);
	this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
      photoList: [],
		  };
   }
   
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({file,fileList}) => {
  /*let fileList = info.fileList;
     fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.code == '200';
      }
      return true;
    });
      this.setState({ fileList });*/
     // console.log(fileList)

    //this.setState({ fileList })

console.log(file)
  
    if(file.status=="done"||file.status=="error"){
  

            if(file.response){

              if(file.response.code=="200"){
                this.setState({ fileList }) 
               let photo={name:file.name,url:file.response.data};

                this.state.photoList.push(photo)
               // return false;
             
              }else{

 console.log(file.response.message)
                 alert({
                      message: file.response.message,
                      title: "提示",//可传空
                      buttonName: "确定",
                      onSuccess : function() {
                          //onSuccess将在点击button之后回调
                          /*回调*/
                      },
                      onFail : function(err) {}
                  });      

                //return true;
                
              }
              }else{
                console.log("上传失败")
                 alert({
                      message:"上传失败",
                      title: "提示",//可传空
                      buttonName: "确定",
                      onSuccess : function() {
                          //onSuccess将在点击button之后回调
                          /*回调*/
                      },
                      onFail : function(err) {}
                  });      
                   
                    //return true;
              }
            
             
          }else if(file.status=="removed"){
  this.setState({ fileList }) 
              this.state.photoList=[]
          }else{
             this.setState({ fileList }) 
          }
   

    // this.setState({ fileList }) 
   
   
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
	 const { previewVisible, previewImage, fileList } = t.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
              <div className="item"> 
                                          
			   <FormItem {...formItemLayout} label="立项审批文件" extra="仅能上传jpg\png\pdf格式文件，不超过2M" required>            
				  <Upload
						  action="/act_web/actdingding/v1/05"
              //action="http://172.30.37.111:3001/file_upload"
						  listType="picture-card"
              name="upload"
						  fileList={fileList}
						  onPreview={this.handlePreview}
						  onChange={this.handleChange}
						>
						  {fileList.length >= 1 ? null : uploadButton}
						</Upload>
						<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
						  <img alt="example" style={{ width: '100%' }} src={previewImage} />
						</Modal>
				  </FormItem>
             </div>
            )
            }
      }
