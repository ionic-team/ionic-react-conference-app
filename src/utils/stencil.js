
export function wc(obj = {}) {
  let storedEl;

  return function (el) {
    Object.entries(obj).forEach(([name, value]) => {
      const action = (el) ? el.addEventListener : storedEl.removeEventListener;
      if (typeof value === 'function') {
        action(name, value);
        return;
      }
      el[name] = value;
    });
    storedEl = el;
  };
}

/***
The following transform is meant to make the follow change to web components.

<ion-segment
  value={props.filterFavorites}
  ionChange={(e) => props.updateFavoriteFilter(e.target.value)}
>
</ion-segment>

  becomes

<ion-segment
  value={props.filterFavorites}
  ref={wc({
    ionChange: (e) => props.updateFavoriteFilter(e.target.value)
  })}
>
</ion-segment>

 */

/*
https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-display-name
*/
