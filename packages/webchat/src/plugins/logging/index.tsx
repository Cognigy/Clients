import * as React from 'react'
import { MessagePlugin, MessageComponentProps } from "../../common/interfaces/message-plugin";

class Component extends React.PureComponent<MessageComponentProps> {
    render() {
        console.log(this.props.message)
        return null;
    }
}

export const loggingPlugin: MessagePlugin = {
    match: () => true,
    component: Component,
    options: {
        passthrough: true
    }
}

export default loggingPlugin;