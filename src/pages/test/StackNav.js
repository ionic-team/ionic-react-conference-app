import React, { Component } from 'react';

export default class StackNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: [
        ['root', {}]
      ],
    };
  }

  push(page, params = {}) {
    this.setState((prevState, props) => ({
      ...prevState,
      stack: prevState.stack.concat([[page, params]])
    }));
  }

  pop(e) {
    this.setState((prevState, props) => ({
      ...prevState,
      stack: prevState.stack.slice(0, -1)
    }));
  }

  render() {
    const navViews = this.props.navViews;
    return this.state.stack.map(([pageName, params], index, array) => {
      const Page = navViews.find(view => view.name === pageName).getView();
      const style = {};
      if (index !== array.length - 1) {
        style.display = 'none'
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
