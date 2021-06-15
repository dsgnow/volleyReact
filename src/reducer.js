export const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.user }
    case 'loginAdmin':
      return { ...state, userAdmin: action.user }
    case 'logout':
      return { ...state, user: null, userAdmin: null }
    default:
      throw new Error('Nie ma takiej akcji: ' + action.type)
  }
}

export const intialState = {
  user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
  userAdmin: JSON.parse(window.localStorage.getItem('tokenAdmin-data')) ?? null
}
