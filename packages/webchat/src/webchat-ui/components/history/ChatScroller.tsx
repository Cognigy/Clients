import * as React from 'react'
import { Thumbs } from 'react-responsive-carousel';


const CLIENT_HEIGHT_OFFSET = 10;

export interface OuterProps extends React.HTMLProps<HTMLDivElement> {}

type InnerProps = OuterProps;

export class ChatScroller extends React.Component<InnerProps> {
    rootRef: React.RefObject<HTMLDivElement>;

    constructor(props: InnerProps) {
        super(props);

        this.state = {
            scrollAtBottom: true,
            container: null
        }

        this.rootRef = React.createRef();
    }

    scrollToBottom = () => {
        const root = this.rootRef.current;

        // we need the container reference to perform a scroll on it
        if (!root)
            return;

        root.scrollTop = root.scrollHeight - root.clientHeight;
    }

    getSnapshotBeforeUpdate() {
        const root = this.rootRef.current;
        if (!root)
            return false;

        const isScrolledToBottom = root.scrollHeight - root.scrollTop <= root.clientHeight + CLIENT_HEIGHT_OFFSET;

        return isScrolledToBottom
    }

    componentDidUpdate(prevProps: InnerProps, prevState, wasScrolledToBottom: boolean) {
        if (wasScrolledToBottom) {
            this.scrollToBottom();
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    render() {

        return (
            <div
                {...this.props}
                ref={this.rootRef}
            />
        )
    }
}