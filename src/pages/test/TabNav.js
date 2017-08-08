import React from 'react';
import { matchPath } from 'react-router-dom';

const TabNav = ({ navViews, location, history, match }) => {
  const results = matchPath(location, {path: match});
  return [
    <div>
      { navViews.map(navView => {
        const View = navView.getView();
        return (
          <div style={results.params.name === navView.name ? {} : { display: 'none' }}>
            <View key={navView.name} location={location} />
          </div>
        );
      })}
    </div>,
    <div className="tabbar show-tabbar" style={{ position: 'fixed', bottom: '0', backgroundColor: '#FFF', width: '100%'}}>
      { navViews.map(navView => (
        <a key={navView.name} className="tab-button has-title has-icon disable-hover" onClick={() => history.push(`/${navView.name}`)}>
          <span className="tab-button-text">{navView.title}</span>
          <div className="button-effect"></div>
        </a>
      )) }
      <div className="tab-highlight"></div>
    </div>
  ]

};

export default TabNav;
