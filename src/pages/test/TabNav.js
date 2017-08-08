import React from 'react';

const TabNav = ({ navViews, navViewProps, urlMatchHandler, onClickHandler }) => {
  return [
    <div>
      { navViews.map(navView => {
        const View = navView.getView();
        return (
          <div key={navView.name} style={urlMatchHandler(navView) ? {} : { display: 'none' }}>
            <View {...navViewProps} key={navView.name} />
          </div>
        );
      })}
    </div>,
    <div className="tabbar show-tabbar" style={{ position: 'fixed', bottom: '0', backgroundColor: '#FFF', width: '100%'}}>
      { navViews.map(navView => (
        <a key={navView.name} className="tab-button has-title has-icon disable-hover" onClick={onClickHandler(navView)}>
          <span className="tab-button-text">{navView.title}</span>
          <div className="button-effect"></div>
        </a>
      )) }
      <div className="tab-highlight"></div>
    </div>
  ]

};

export default TabNav;
