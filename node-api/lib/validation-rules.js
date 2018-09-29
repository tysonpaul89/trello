const signup = {
  email: {
    presence: {
      allowEmpty: false,
      message: '^Email can\'t be empty'
    },
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: '^Password must be at least 8 characters'
    }
  },
  name: {
    presence: {
      allowEmpty: false,
      message: '^Display name can\'t be empty'
    }
  }
}

module.exports = {
  signup
}
