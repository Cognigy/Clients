import * as React from 'react'


const CLIENT_HEIGHT_OFFSET = 10;

interface OuterProps extends React.HTMLProps<HTMLDivElement> {
    lastRelevantMessageId?: string;
}

interface State {
    scrollAtBottom: boolean;
    container: HTMLDivElement | null;
}

type InnerProps = OuterProps;

export class ChatScroller extends React.Component<InnerProps, State> {

    constructor(props: InnerProps) {
        super(props);

        this.state = {
            scrollAtBottom: true,
            container: null
        }
    }

    static getDerivedStateFromProps(nextProps: InnerProps, prevState: State) {
        const { container, scrollAtBottom } = prevState;

        if (!container)
            return null;

        const { scrollHeight, scrollTop, clientHeight } = container;

        const targetScrollAtBottom = (scrollHeight - scrollTop <= clientHeight + CLIENT_HEIGHT_OFFSET)

        if (scrollAtBottom !== targetScrollAtBottom) {
            const newState: State = {
                ...prevState,
                scrollAtBottom: targetScrollAtBottom
            }

            return newState;
        }

        return null;
    }

    componentDidUpdate(prevProps: InnerProps) {
        const { container, scrollAtBottom } = this.state;

        // we need the container reference to perform a scroll on it
        if (!container)
            return;

        // do not perform a scroll if 
        if (!scrollAtBottom)
            return;


        const { lastRelevantMessageId: newMessageId } = this.props;
        const { lastRelevantMessageId: oldMessageId } = prevProps;

        // we only scroll if the relevant message id changed
        if (oldMessageId === newMessageId)
            return;


        this.scrollToBottom();
    }

    setContainerRef: React.Ref<HTMLDivElement> = (element) => {
        this.setState({
            container: element
        });
    }

    scrollToBottom = () => {
        const { container } = this.state;

        if (!container)
            return;

        const { scrollHeight, clientHeight } = container;

        const maxScrollTop = scrollHeight - clientHeight;

        container.scrollTop = maxScrollTop;
    }

    render() {
        const { lastRelevantMessageId, ...divProps } = this.props;

        return (
            <div
                {...divProps}
                ref={this.setContainerRef}
            />
        )
    }
}