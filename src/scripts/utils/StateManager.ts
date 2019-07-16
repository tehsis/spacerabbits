export default class StateManager {
  constructor(states: Object, game) {
    Object.keys(states).forEach((state_name) => game.state.add(state_name, states[state_name]));
  }

  set(state: string) {

  }
}

