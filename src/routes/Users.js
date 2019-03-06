import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Users.less';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import { Table, Popconfirm, Button } from 'antd';
import * as lodash from 'lodash';
import EditModal from '../components/EditModal';


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModalVisible: false, // 修改弹框显示状态
      selectedRecord: null, // 当前选中的记录
    };
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      }, {
        title: '名称',
        dataIndex: 'name',
      }, {
        title: '性别',
        dataIndex: 'sex',
        render: (text) => {
          return (
            text === 'F' ? '女' : '男'
          );
        },
      }, {
        title: '年龄',
        dataIndex: 'age'
      }, {
        title: '操作',
        render: (text, record) => {
          return (
            <div>
              <Button onClick={()=> this.onShowEidtModal(record)}>Edit</Button>
              <Popconfirm title="Delete?" onConfirm={() => this.onDelete(record.id)}>
                <Button>Delete</Button>
              </Popconfirm>
            </div>
          );
        },
      }
    ];
  }


  componentWillMount() {
    this.props.dispatch({ type: 'users/init'});
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  handleAdd = () => {
    this.setState({
      editModalVisible: true,
    })
  }

  onDelete = (id) => {
    let { dispatch, userList } = this.props;
    let newUserList =  userList.filter(user => user.id != id);
    dispatch({
      type: 'users/saveUserList',
      payload: newUserList
    })
  }

  onShowEidtModal = (record) => {
    console.log('onShowEditModal(), record:', record);
    this.setState({
      editModalVisible: true,
      selectedRecord: record,
    });
  }

  handleOk = (newUser, type) => {
    console.log('handleOk(), newUser:', newUser);
    const { dispatch, userList } = this.props;
    let newUserList = userList || [];
    if (type == 0) {
      newUserList.push(newUser);
    } else if (type == 1 && !!newUserList) {
      for(let i = 0; i < newUserList.length; i ++) {
        if (newUserList[i].id == newUser.id) {
          newUserList[i] = newUser;
        }
      }
    }

    dispatch({
      type: 'users/saveUserList',
      payload: newUserList,
    })
    this.setState({
      editModalVisible: false,
      selectedRecord: null,
    })
  }

  handleCancel = (e) => {
    console.log('handleCancel:', e);
    this.setState({
      editModalVisible: false,
      selectedRecord: null,
    })
  }

  render() {
    const { userList } = this.props;
    console.log('users => render(), userList:', userList);
    const {
      editModalVisible, selectedRecord } = this.state;

    console.log('render(), editModalVisible:', editModalVisible, 'selectedRecord:', selectedRecord);
    return (
      <LocaleProvider locale={zhCN}>
        <div className={styles.container}>
          <Button onClick={() => this.handleAdd()}>添加</Button>
          <Table
            dataSource={userList}
            columns={this.columns}
          />
          {
            editModalVisible &&
            <EditModal
              type={lodash.isEmpty(selectedRecord) ? 0 : 1}
              data={selectedRecord}
              handleOk={this.handleOk}
              handleCancel={this.handleCancel}
            />
          }
        </div>
      </LocaleProvider>
    );
  }
}

function mapStateToProps(state) {
  const { userList } = state.users;
  return {
    userList,
  };
}

export default connect(mapStateToProps)(Users);
