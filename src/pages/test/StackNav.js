import React, { Component } from 'react';
import { wc } from '../../utils/stencil'

export default class StackNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: null,
    };
  }

  setChildren(push, pop, viewNames) {
    var children = viewNames.map(([pageName, params], index, array) => {
      const Page = this.props.navViews.find(view => view.name === pageName).getView();
      const style = {};
      if (index !== array.length - 1) {
        style.display = 'none'
      }
      return (
        <ion-page key={index} style={style}>
          <Page nav={{ pop, push}} params={params}></Page>
        </ion-page>
      )
    });

    this.setState((prevState, props) => ({
      ...prevState,
      children
    }));
  }

  render() {
    return (
      <ion-nav
        location={this.props.location}
        root-page='root'
        ref={wc({}, {
          renderChildren: (el, push, pop, viewNames) => this.setChildren(push, pop, viewNames)
        })}
      >
        {this.state.children ? this.state.children : null }
      </ion-nav>
    );
  }
}
