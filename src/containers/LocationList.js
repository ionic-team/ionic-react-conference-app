import { connect } from 'react-redux'
import Map from '../components/Map'

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}

const LocationList = connect(
  mapStateToProps
)(Map)

export default LocationList;
