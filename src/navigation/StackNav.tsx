import React, { Component, CSSProperties } from 'react';

interface NavView {
  name: string;
  title: string;
  path: string;
  getView: () => any;
}

interface Props {
  navViews: NavView[];
  basePath: string;
}

interface State {
  stack: any[];
}

export default class StackNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.state.stack.map(([pageName, params], index, array) => {
      const Page = (this.props.navViews.find(view => view.name === pageName) || this.props.navViews[0]).getView();
      const style: CSSProperties = {};
      if (index !== array.length - 1) {
        style.display = 'none';
      }
      return (
        <div className="ion-page" key={index}>
          <Page
            params={params}
          ></Page>
        </div>
      )
    });
  }
}
