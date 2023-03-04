import React from 'react'
const Context = React.createContext()
export default Context;

export function withContext(Component) {
  return (props) => (
    <Context.Consumer>
        {(client) => <Component {...props} client={client} />}
    </Context.Consumer>
    )
}

