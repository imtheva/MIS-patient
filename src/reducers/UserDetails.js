//creating a reducer to the User action
const UserReducer = (state = "", action) => {
    switch (action.type) {
      case "USER": {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  };
  
  export default UserReducer;