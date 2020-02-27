const accountState = {
  user: {
    uid: undefined,
    email: undefined,
    password: undefined,
  },
};

const accountReducer = (state = accountState, action) => {
  const {payload, type} = action;
  switch (type) {
    case 'TAKE_USER':
      return {
        ...state,
        user: payload.user,
      };

    default:
      return state;
  }
};

export default accountReducer;
