import React from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import config from './../config/config'



function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class UploadList extends React.Component {
    static propTypes = {
      upload_img:PropTypes.string,
      upload_name:PropTypes.string.isRequired,
      upload_title:PropTypes.string.isRequired,
      upload_url:PropTypes.string.isRequired,
      upload_fun:PropTypes.func.isRequired,
    };

    state = {
        loading: false,
        imageUrl:''
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            imageUrl:nextProps.upload_img
        });
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
             this.props.upload_fun(info);
            this.setState({
                imageUrl:info.file.response.data.g_img
            });
        }
    };

    render() {
        const { imageUrl } = this.state;
        const { upload_url, upload_title, upload_name } = this.props;
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">{upload_title}</div>
            </div>
        );

        return (
            <Upload
                name={upload_name}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={upload_url}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={config.H_URL+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}
export default UploadList
