import React, { Component } from 'react';
import { IonTabs, IonTab, IonTabBar } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = RouteComponentProps & {
  children: React.ReactNode;
}

type State = {
  activeTab: string
}

class AppStack extends Component<Props, State> {

  onTabBarChange = (e: CustomEvent<{ tab: string}>) => {
    const selectedTab = this.props.location.pathname.substr(this.props.match.url.length);

    if (e.detail.tab !== selectedTab) {
      this.props.history.push(`${this.props.match.url}${e.detail.tab}`)
    }
  }

  renderChildren = () => {
    const selectedTab = this.props.location.pathname.substr(this.props.match.url.length);

    return React.Children.map(this.props.children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child;
      }
      if (child.type === IonTab) {
        return React.cloneElement(child, {
          active: child.props.tab === selectedTab
        });
      }
      if (child.type === IonTabBar) {
        return React.cloneElement(child, {
          selectedTab,
          onIonTabBarChanged: this.onTabBarChange
        });
      }
    })
  }

  render() {

    return (
      <IonTabs>
        { this.renderChildren() }
      </IonTabs>
    );
  }
}

export default withRouter(AppStack);
