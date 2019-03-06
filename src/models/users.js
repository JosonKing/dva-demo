export default {
  namespace: 'users',
  state: {
    userList: [],
  },
  reducers: {
    saveUserList(state, { payload }) {
      console.log('model users => reducers/saveUserList(), payload:', payload);
      return { ...state, userList: Object.assign([], payload || []) };
    }
  },
  effects: {
    *init(_, { call, put, select }) {
      //获取后台数据
      const userList = [{
        id: 1,
        name: '张三',
        age: 13,
        sex: 'F'
      }, {
        id: 2,
        name: '张四',
        age: 14,
        sex: 'M'
      }, {
        id: 3,
        name: '张五',
        age: 15,
        sex: 'F'
      }, {
        id: 4,
        name: '张六',
        age: 16,
        sex: 'M'
      }, {
        id: 5,
        name: '张七',
        age: 16,
        sex: 'F'
      }];
      yield put({
        type: 'saveUserList',
        payload: userList
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
      });
    }
  },
};
