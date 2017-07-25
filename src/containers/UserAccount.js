import React from 'react';
import { connect } from 'react-redux'
import {
  signUpUser,
  logInUser,
  logOutUser,
  updatePicture
} from '../actions';

const AccountInfo = ({children, ...props}) => {
  return (
    <div>{children(props)}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (userName, password) => dispatch(signUpUser(userName, password)),
    logInUser: (userName, password) => dispatch(logInUser(userName, password)),
    logOutUser: (userName) => dispatch(logOutUser(userName)),
    updatePicture: (userName, pictureLocation) => dispatch(updatePicture(userName, pictureLocation)),
  }
}

const UserAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountInfo);

export default UserAccount;
