export const authSignIn = (authUser) => {
  return {
    type: "SIGN_IN",
    payload: authUser,
  };
};

export const userDetails = (user) => {
  return {
    type: "USER",
    payload: user,
  };
};
 