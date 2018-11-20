import React, { Component } from 'react';

export default class StackNav extends Component {
  constructor(props) {
    let stack = [];
    super(props);

    props.navViews.forEach((navView) => {
      const match = props.urlMatchHandler(`${props.basePath}/${navView.path}`);
      if (match) {
        stack = stack.concat([
          [navView.name, match.params ]
        ])
      }
    });

    if (stack.length === 0) {
      const navView = props.navViews[0];
      stack = stack.concat([
        [navView.name, {}]
      ])
    }

    this.state = {
      stack
    };
  }

  pageChanged() {
    // Find the last View on the stack which is the new active View
    let [curPageName, curParams] = this.state.stack[this.state.stack.length - 1];
    let curView = this.props.navViews.find(view => view.name === curPageName);

    this.props.onPageChange(this.props.basePath, curView.path, curParams);
  }

  push(pageName, params = {}) {
    this.setState((prevState, props) => ({
      ...prevState,
      stack: prevState.stack.concat([[pageName, params]])
    }), this.pageChanged);
  }

  pop(e) {
    this.setState((prevState, props) => ({
      ...prevState,
      stack: prevState.stack.slice(0, -1)
    }), this.pageChanged);
  }

  render() {
    return this.state.stack.map(([pageName, params], index, array) => {
      const Page = this.props.navViews.find(view => view.name === pageName).getView();
      const style = {};
      if (index !== array.length - 1) {
        style.display = 'none';
      }
      return (
        <ion-page key={index} style={style}>
          <Page
            nav={{
              pop: this.pop.bind(this),
              push: this.push.bind(this)
            }}
            params={params}
          ></Page>
        </ion-page>
      )
    });
  }
}
