import React from 'react'
const context = React.CreateContext
export default context;

export function withContext(Component) {
return (props) => (
    <Context.Consumer> 
        {(client) => <Compont {...props} client={client} />}
    </Context.Consumer>
)
}
