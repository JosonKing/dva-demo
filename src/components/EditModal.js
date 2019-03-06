import React, { Component } from 'react';
import styles from './EditModal.less';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
}
from 'antd';
const uuidv1 = require('uuid/v1');

const { Option } = Select;

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: !!props.data && props.data.id || null,
      name: !!props.data && props.data.name || null, // 当前选中的记录
      sex: !!props.data && props.data.sex || null, // 当前选中的记录
      age: !!props.data && props.data.age || null, // 当前选中的记录
    };
  }

  handleOk = (e) => {
    console.log(e);
    const { id, name, age, sex } = this.state;
    let user = {
      id,
      name,
      age,
      sex,
    };
    if (!id || id === 'undefined' || id === '') {
      user.id = uuidv1();
      this.props.handleOk(user, 0);
    } else {
      this.props.handleOk(user, 1);
    }
  }

  handleCancel = (e) => {
    console.log(e);
    this.props.handleCancel(e);
  }

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  handleChangeSex = (sex) => {
    console.log('handleChangeSex(), sex:', sex);
    this.setState({
      sex,
    })
  }

  handleChangeAge = (e) => {
    this.setState({
      age: e.target.value,
    })
  }

  getFormDom() {
    const { name, age, sex } = this.state;
    return (
      <div className={styles.form}>
        <div>
          <lable>姓名</lable><Input value={name} onChange={this.handleChangeName} />
        </div>
        <div>
          <lable>性别</lable>
          <Select defaultValue={sex || "F"} style={{width: '100%'}} onChange={this.handleChangeSex} >
            <Option value="M">男</Option>
            <Option value="F">女</Option>
          </Select>
        </div>
        <div>
          <lable>年龄</lable><Input value={age} onChange={this.handleChangeAge} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Modal
          title={this.props.type === 0 ? '添加' : '修改'}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={true}
        >
          {this.getFormDom()}
        </Modal>
      </div>
    );
  }
}

export default EditModal;
