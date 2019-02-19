import * as React from 'react'
import { MessagePlugin, MessageComponentProps } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from '../../helper';

class Component extends React.PureComponent<MessageComponentProps> {
    render() {
        console.log(this.props.message)
        return null;
    }
}

const loggingPlugin = createMessagePlugin(
    () => true,
    Component,
    { passthrough: true }
)

registerMessagePlugin(loggingPlugin);

export default loggingPlugin;