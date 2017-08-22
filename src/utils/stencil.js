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

