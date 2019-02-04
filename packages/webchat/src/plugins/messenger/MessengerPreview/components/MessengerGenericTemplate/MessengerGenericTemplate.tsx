import * as React from 'react';
import { MessengerFrame } from '../MessengerFrame';
import { IFBMGenericTemplatePayload } from '../../interfaces/GenericTemplatePayload.interface';
import { MessengerButton } from '../MessengerButton/MessengerButton';
import { MessengerTitle } from '../MessengerTitle';
import { MessengerSubtitle } from '../MessengerSubtitle';
import { MessengerContent } from '../MessengerContent';
import { IWithFBMActionEventHandler } from '../../MessengerPreview.interface';
import { styled } from '../../../../../webchat-ui/style';
import { Divider } from '../Divider';

export interface IMessengerGenericTemplateProps extends IWithFBMActionEventHandler {
    payload: IFBMGenericTemplatePayload;
}

export interface IMessengerGenericTemplateState {
    index: number;
}

const Root = styled(MessengerFrame)({
    backgroundColor: 'white'
});

const Image = styled.div<{ url: string }>(({ url }) => ({
    paddingTop: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url('${url}')`
}));

const Pagination = styled.div({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: -8,
    marginBottom: -8,
});

const PaginationButton = styled.button({
    color: 'hsla(0, 0%, 0%, .54)'
});

export class MessengerGenericTemplate extends React.Component<IMessengerGenericTemplateProps & React.HTMLProps<HTMLDivElement>, IMessengerGenericTemplateState> {
    state: IMessengerGenericTemplateState = {
        index: 0
    }

    static getDerivedStateFromProps(props: IMessengerGenericTemplateProps, state: IMessengerGenericTemplateState) {

        const { index } = state;
        const { payload } = props;
        const { elements } = payload;

        if (elements.length > 0 && index >= elements.length) {
            const newState: IMessengerGenericTemplateState = {
                index: 0
            }

            return newState;
        }

        return null;
    }

    getCurrentElement() {
        const { index } = this.state;
        const { payload } = this.props;
        const { elements } = payload;

        return elements[index];
    }

    getCurrentImageStyles() {
        const styles: React.CSSProperties = {
            backgroundImage: `url('${this.getCurrentElement().image_url}')`
        }

        return styles;
    }

    next = () => {
        this.setState({
            index: this.state.index + 1
        })
    }

    prev = () => {
        this.setState({
            index: this.state.index - 1
        })
    }

    canNext() {
        const { index } = this.state;
        const { payload } = this.props;
        const { elements } = payload;

        return index < elements.length - 1;
    }

    canPrev() {
        const { index } = this.state;

        return index > 0;
    }

    render() {
        const { onAction, ...divProps } = this.props;

        const element = this.getCurrentElement();
        const { image_url, title, subtitle, buttons, default_action } = element;

        const canNext = this.canNext();
        const canPrev = this.canPrev();

        const canPaginate = canNext || canPrev;

        return (
            <Root
                {...divProps}
            >
                {image_url && (
                    <>
                        <Image
                            url={this.getCurrentElement().image_url}
                            onClick={e => default_action && onAction(e, default_action)}
                        />
                        <Divider />
                    </>
                )}
                {canPaginate && (
                    <>
                        <Pagination>
                            <PaginationButton
                                disabled={!canPrev}
                                onClick={this.prev}
                            >
                                prev
                            </PaginationButton>
                            <PaginationButton
                                disabled={!canNext}
                                onClick={this.next}
                            >
                                next
                            </PaginationButton>
                        </Pagination>
                        <Divider />
                    </>
                )}
                <MessengerContent
                    onClick={e => default_action && onAction(e, default_action)}
                >
                    <MessengerTitle>{title}</MessengerTitle>
                    <MessengerSubtitle>{subtitle}</MessengerSubtitle>
                </MessengerContent>
                {buttons && buttons.map((button, index) => (
                    <React.Fragment key={index}>
                        <Divider />
                        <MessengerButton
                            button={button}
                            onClick={e => onAction(e, button)}
                        />
                    </React.Fragment>
                ))}
            </Root>
        )
    }
}