# Webchat Plugin Examples

## Text Message (using message text)
```jsx
const TextMessage = (props) => {
    const text = props.message.text

    return (
        <div>
            {text}
        </div>
    )
}

const textMessagePlugin = {
    match: 'text-message',
    component: TextMessage
}
```

## Image (using message data)
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

## Button (sending messages)
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

## Message Data (custom matching, passthrough)
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

## Dialog (fullscreen)
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