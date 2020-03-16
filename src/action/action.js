export const takeUser = payload => ({ type: 'TAKE_USER', payload });
export const takeProfile = payload => ({ type: 'TAKE_PROFILE', payload });

const Actionaccount = {
  takeUser,
  takeProfile,
};

export default Actionaccount;
