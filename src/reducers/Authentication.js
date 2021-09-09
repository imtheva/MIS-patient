//creating a reducer to the SignIn action
const AuthReducer = (state = "wait", action) => {
    switch (action.type) {
        case 'SIGN_IN': {
            return action.payload;
        }
        default: {
            return state
        }
    }
};

export default AuthReducer