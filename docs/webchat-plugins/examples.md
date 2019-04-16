# Webchat Plugin Examples

## Text Message
Renders the message text in red.
```jsx
const RedText = (props) => {
    const text = props.message.text

    return (
        <span style={{ color: 'red' }}>
            {text}
        </span>
    )
}

const redTextPlugin = {
    match: 'text-message',
    component: RedText
}
```

## Image
Renders an inline image with a url from the message. 
```jsx
const Image = (props) => {
    const url = props.message.data._plugin.url

    return (
        <img src={url} />
    )
}

const imagePlugin = {
    match: 'image',
    component: Image
}
```

## Button
Renders a button that sends a predefined message from the user when clicked.
```jsx
const Button = (props) => {
    const onSendMessage = props.onSendMessage

    return (
        <button
            type='button'
            onClick={() => onSendMessage('hi')}
        >
        send 'hi'
        </button>
    )
}

const buttonPlugin = {
    match: 'button',
    component: Button
}
```

## Message Data
Displays an additional message output with stringified data if the message has any.
```jsx
const MessageData = (props) => {
    const data = props.message.data
    const dataJsonString = JSON.stringify(data)

    return (
        <pre>
            <code>
                {dataJsonString}
            </code>
        </pre>
    )
}

const messageDataPlugin = {
    match: (message) => !!message.data,
    component: MessageData,
    options: {
        passthrough: true
    }
}
```

## Dialog
Displays a Button that opens a Dialog when clicked.
The user can then dismiss or submit the dialog with buttons.
```jsx
const Dialog = (props) => {
    const { isFullscreen, onSetFullscreen } = props

    // show button
    if (!isFullscreen) {
        return (
            <button
                type='button'
                onClick={onSetFullscreen}
            >
                open dialog
            </button>
        )
    }

    const { attributes, onDismissFullscreen, onSendMessage } = props

    // show dialog
    return (
        <div {...attributes}>
            <button
                type='button'
                onClick={onDismissFullscreen}
            >
                cancel
            </button>
            <button
                type='button'
                onClick={() => onSendMessage('hi')}
            >
                send 'hi'
            </button>
        </div>
    )

}

const dialogPlugin = {
    match: 'dialog',
    component: Dialog
}
```