import React from 'react'

const AuthContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  loginAdmin: () => {},
  logout: () => {}
})

AuthContext.displayName = 'AuthContext'

export default AuthContext
