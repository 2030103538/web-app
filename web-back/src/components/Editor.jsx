import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { Upload } from 'antd'
import config from '../config/config'
import PropTypes from 'prop-types'
import 'braft-editor/dist/index.css'

export default class EditorDemo extends React.Component {

    static propTypes = {
      upload_url:PropTypes.string.isRequired,
        upload_name:PropTypes.string.isRequired,
        upload_html:PropTypes.string
    };
    state = {
        editorState: BraftEditor.createEditorState(null)
    };


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.upload_html){
            this.setState({
                editorState:BraftEditor.createEditorState(nextProps.upload_html)
            })
        }
    }

    getcontent = ()=>{
        return this.state.editorState.toHTML();
    };

    controls =[
        'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'separator',
    'clear'
];


    submitContent = async () => {

    };

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    };

    uploadHandler = (info) => {

        console.log(info);
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            const name = info.file.response.data.g_img;
            this.setState({
                editorState: ContentUtils.insertMedias(this.state.editorState, [{
                    type: 'IMAGE',
                    url: config.H_URL+name
                }])
            })
        }

    };

    render () {

        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <Upload
                        name={this.props.upload_name}
                        accept="image/*"
                        showUploadList={false}
                        onChange={this.uploadHandler}
                        action={this.props.upload_url}

                    >
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                            插入图片
                        </button>
                    </Upload>
                )
            }
        ];

        const { editorState } = this.state;

        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    style={{border:'1px solid lightgray'}}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                    controls={this.controls}
                    extendControls={extendControls}
                />
            </div>
        )

    }

}