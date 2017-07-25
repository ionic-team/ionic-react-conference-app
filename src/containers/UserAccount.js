import { connect } from 'react-redux'
import {
  signUpUser,
  logInUser,
  logOutUser,
  updatePicture
} from '../actions';

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
)(
  ({children, ...props}) => children(props)
);

export default UserAccount;
