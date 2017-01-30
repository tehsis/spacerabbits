class User {
  get() {
    return window.localStorage.getItem('user');
  }
}

export default new User()