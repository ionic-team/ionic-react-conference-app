import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { wc } from '../../utils/stencil'

export default class Test extends Component {
  render() {
    const navViews = [{
      name: 'test-page-one',
      title: 'Test Page One',
      getView: () => (TestPageOne)
    }, {
      name: 'test-page-two',
      title: 'Test Page Two',
      getView: () => (TestPageTwo)
    }, {
      name: 'test-page-three',
      title: 'Test Page Three',
      getView: () => (TestPageThree)
    }]
    return (
      <ion-nav
        location={this.props.location.pathname}
        root-page='test-page-one'
        ref={wc({
        },{
          rootPage: 'test-page-one',
          renderChildren: renderChildren(navViews)
        })}>
      </ion-nav>
    );
  }
}

function renderChildren(navViews) {
  return (el, push, pop, viewNames) => {
    const nav = {
      pop: pop,
      push: push
    };
    ReactDOM.render(
      viewNames.map(([pageName, params], index, array) => {
        const Page = navViews.find(view => view.name === pageName).getView();
        const style = {};
        if (index !== array.length - 1) {
          style.display = 'none'
        }
        return (
          <ion-page style={style}>
            <Page key={index} nav={nav} params={params}></Page>
          </ion-page>
        )
      }),
      el
    );
  };
}

class TestPageOne extends Component {
  render() {
    return [
      <ion-header>
        <ion-navbar>
          <ion-title>Page One</ion-title>
        </ion-navbar>
      </ion-header>,
      <ion-content>
        Page One Content
        <div>
          <ion-button
            onClick={() => this.props.nav.push('test-page-two', { id: 1, name: 'Michael Scott'})}
          >Go to Page Two</ion-button>
        </div>
      </ion-content>
    ];
  }
}
const TestPageTwo = ({ nav, style, params }) => {
  return [
    <ion-header>
      <ion-navbar>
        <ion-title>Page Two</ion-title>
      </ion-navbar>
    </ion-header>,
    <ion-content>
      Page Two Content
      <span>{params.id} {params.name}</span>
      <div>
        <ion-button onClick={() => nav.pop()}>Go to Page One</ion-button>
        <ion-button onClick={() => nav.push('test-page-three')}>Go to Page Three</ion-button>
      </div>
    </ion-content>
  ];
}
const TestPageThree = ({ nav, style }) => {
  return [
    <ion-header>
      <ion-navbar>
        <ion-title>Page Three</ion-title>
      </ion-navbar>
    </ion-header>,
    <ion-content>
      Page Three Content
      <div>
        <ion-button onClick={() => nav.pop()}>Go to Page Two</ion-button>
      </div>
    </ion-content>
  ];
}
