interface R {
  [key: string]: (...args: any) => any;
}

export function combineReducers(reducers: R): (state: any, action: any) => { [K in keyof R]: ReturnType<R[K]> } {
  type keys = keyof typeof reducers;
  type returnType = { [K in keys]: ReturnType<(typeof reducers)[K]> };
  const combinedReducer = (state: any, action: any) => {
    const newState: returnType = {} as any;
    const keys = Object.keys(reducers);
    keys.forEach((key) => {
      const result = reducers[key](state[key], action);
      newState[key as keys] = result || state[key];
    });
    return newState;
  };
  return combinedReducer;
}
