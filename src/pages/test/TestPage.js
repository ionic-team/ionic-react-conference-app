import React, { Component } from 'react';

export default class Test extends Component {
  render() {
    debugger;
    return [
      <IonNav
        location={this.props.location.pathname}
        rootPage={TestPageOne}>
      </IonNav>
    ];
  }
}

class IonNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [props.rootPage]
    };
  }
  push(page) {
    this.setState((prevState, props) => ({
      ...prevState,
      pages: prevState.pages.concat(page),
    }));
  }
  pop() {
    this.setState((prevState, props) => ({
      ...prevState,
      pages: prevState.pages.slice(0, -1)
    }));
  }
  render() {
    const nav = {
      pop: this.pop.bind(this),
      push: this.push.bind(this)
    }
    return this.state.pages.map((Page, index, array) => {
      const style = {};
      if (index !== array.length - 1) {
        style.display = 'none'
      }
      return <Page key={index} nav={nav} style={style}></Page>
    });
  }
}

class TestPageOne extends Component {
  stuffer() {
    console.log('stuffed me');
  }
  render() {
    return (
      <ion-page style={this.props.style}>
        <ion-header>
          <ion-navbar>
            <ion-title>Page One</ion-title>
          </ion-navbar>
        </ion-header>
        <ion-content>
          Page One Content
          <div>
            <ion-button onClick={() => this.props.nav.push(TestPageTwo)}>Go to Page Two</ion-button>
          </div>
        </ion-content>
      </ion-page>
    );
  }
}
const TestPageTwo = ({ nav, style }) => {
  return (
    <ion-page style={style}>
      <ion-header>
        <ion-navbar>
          <ion-title>Page Two</ion-title>
        </ion-navbar>
      </ion-header>
      <ion-content>
        Page Two Content
        <div>
          <ion-button onClick={() => nav.pop()}>Go to Page One</ion-button>
          <ion-button onClick={() => nav.push(TestPageThree)}>Go to Page Three</ion-button>
        </div>
      </ion-content>
    </ion-page>
  );
}
const TestPageThree = ({ nav, style }) => {
  return (
    <ion-page style={style}>
      <ion-header>
        <ion-navbar>
          <ion-title>Page Three</ion-title>
        </ion-navbar>
      </ion-header>
      <ion-content>
        Page Three Content
        <div>
          <ion-button onClick={() => nav.pop()}>Go to Page Two</ion-button>
        </div>
      </ion-content>
    </ion-page>
  );
}
