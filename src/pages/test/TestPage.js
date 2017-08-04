import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { wc } from '../../utils/stencil'

export default class Test extends Component {
  render() {
    return (
      <ion-nav
        location={this.props.location.pathname}
        ref={wc({},{
          rootPage: TestPageOne,
          renderChildren: renderChildren
        })}>
      </ion-nav>
    );
  }
}

function renderChildren(el, push, pop, pages) {
  const nav = {
    pop: pop,
    push: push
  }
  ReactDOM.render(
    pages.map(([Page, params], index, array) => {
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
}

class TestPageOne extends Component {
  stuffer() {
    console.log('stuffed me');
  }
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
          <ion-button onClick={() => this.props.nav.push(TestPageTwo, { id: 1, name: 'Michael Scott'})}>Go to Page Two</ion-button>
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
        <ion-button onClick={() => nav.push(TestPageThree)}>Go to Page Three</ion-button>
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
