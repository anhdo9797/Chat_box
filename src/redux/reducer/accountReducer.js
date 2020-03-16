const accountState = {
  user: {
    uid: undefined,
    email: undefined,
    password: undefined,
  },
  profile: {
    avatar: undefined,
    displayName: undefined,
    phoneNumber: undefined,
  },
};

const accountReducer = (state = accountState, action) => {
  const { payload, type } = action;
  switch (type) {
    case 'TAKE_USER':
      return {
        ...state,
        user: payload.user,
      };
    case 'TAKE_PROFILE':
      return {
        ...state,
        profile: payload.profile,
      };

    default:
      return state;
  }
};

export default accountReducer;
