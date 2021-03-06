import React from 'react'
import { Button, message, Upload, Icon } from 'antd'
import { updateAvatar, updateAdminInfo } from '@/redux/admin.redux'
import { connect } from 'react-redux'
import E from 'wangeditor'
import './index.less'
@connect(
  state => state.admin,
  { updateAvatar, updateAdminInfo }
)
class EditUser extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    this.initEdit()
    this.loadData()
  }
  handleSubmit = () => {
    this.props.updateAdminInfo({ introduction: this.state.introduction })
  }
  initEdit = () => {
    const elem = this.refs.editorElem
    this.editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = html => {
      this.setState({
        introduction: html
      })
    }
    this.editor.create()
  }
  loadData = () => {
    setTimeout(() => {
      this.editor.txt.html(this.props.introduction)
    }, 100)
  }

  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPG) {
      message.error('你只能选择图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2M')
    }
    return isJPG && isLt2M
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    } else if (info.file.status === 'done') {
      this.setState(
        {
          loading: false
        },
        () => {
          if (info.file.response.code === 0) {
            console.log(info.file.response)
            this.props.updateAvatar(info.file.response)
          }
        }
      )
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="page-user">
        <Upload
          name="avatar"
          listType="picture-card"
          className="page-user-upload"
          showUploadList={false}
          action="/api/editAvatar"
          headers={{
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {this.props.avatar ? (
            <img
              src={this.props.avatar}
              alt="avatar"
              className="page-user-upload-img"
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <div className="page-user-content">
          <div ref="editorElem" style={{ textAlign: 'left' }} />
        </div>
        <div className="page-user-update-button">
          <Button type="primary" onClick={this.handleSubmit}>
            更新
          </Button>
        </div>
      </div>
    )
  }
}

export default EditUser
