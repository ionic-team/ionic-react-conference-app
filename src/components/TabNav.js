import React from 'react';

const TabNav = ({ navViews, navViewProps, urlMatchHandler, onClickHandler }) => {
  return [
    <div>
      { navViews.map(navView => {
        const View = navView.getView();
        return (
          <div key={navView.name} style={urlMatchHandler(navView) ? {} : { display: 'none' }}>
            <View {...navViewProps} key={navView.path} basePath={navView.path} />
          </div>
        );
      })}
    </div>,
    <div className="tabs-ios">
      <ion-tab-bar>
        { navViews.map((navView, index) => (
        <a key={navView.path} className="tab-button has-title has-icon" href="#" aria-selected={urlMatchHandler(navView) ? 'true' : 'false'} onClick={onClickHandler(navView)}>
          <ion-icon class="tab-button-icon" name={navView.icon}></ion-icon>
          <span className="tab-button-text">{navView.title}</span>
          <div className="button-effect"></div>
        </a>
        )) }
      </ion-tab-bar>
    </div>
  ]

};

export default TabNav;
