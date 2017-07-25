import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}

const LocationList = connect(
  mapStateToProps
)(
  ({children, ...props}) => children(props)
);

export default LocationList;
