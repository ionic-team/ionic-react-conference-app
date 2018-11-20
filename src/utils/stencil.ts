/***

This function is meant to make it easier to use Props and Custom Events with Custom
Elements in React.

<ion-segment
  value={props.filterFavorites}
  ionChange={(e) => props.updateFavoriteFilter(e.target.value)}
>
</ion-segment>

     <<< SHOULD BE WRITTEN AS >>>

<ion-segment
  value={props.filterFavorites}
  ref={wc({
    ionChange: (e) => props.updateFavoriteFilter(e.target.value)
  })}
>
</ion-segment>

***/

export function wc(customEvents = {}, props = {}) {
  let storedEl;

  return function (el) {
    Object.entries(customEvents).forEach(([name, value]) => {
      // If we have an element then add event listeners
      // otherwise remove the event listener
      const action = (el) ? el.addEventListener : storedEl.removeEventListener;
      if (typeof value === 'function') {
        action(name, value);
        return;
      }
    });
    // If we have an element then set props
    if (el) {
      Object.entries(props).forEach(([name, value]) => {
        el[name] = value;
      });
    }
    storedEl = el;
  };
}

function syncEvent(node, eventName, newEventHandler) {
  const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
  const eventStore = node.__events || (node.__events = {});
  const oldEventHandler = eventStore[eventNameLc];

  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventNameLc, oldEventHandler);
  }

  // Bind new listener.
  if (newEventHandler) {
    node.addEventListener(eventNameLc, eventStore[eventNameLc] = function handler(e) {
      newEventHandler.call(this, e);
    });
  }
}

export function toRC(tagName, React, ReactDOM) {

  const displayName =

  class ReactComponent extends React.Component {
    static get displayName() {
      return displayName;
    }
    componentDidMount() {
      this.componentWillReceiveProps(this.props);
    }
    componentWillReceiveProps(props) {
      const node = ReactDOM.findDOMNode(this);
      Object.keys(props).forEach(name => {
        if (name === 'children' || name === 'style') {
          return;
        }

        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          syncEvent(node, name.substring(2), props[name]);
        } else {
          node[name] = props[name];
        }
      });
    }
    render() {
      return React.createElement(tagName, { style: this.props.style }, this.props.children);
    }
  }
}
