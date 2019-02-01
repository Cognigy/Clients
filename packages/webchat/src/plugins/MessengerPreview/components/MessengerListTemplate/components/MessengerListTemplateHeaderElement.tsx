import * as React from 'react';
import { IFBMListTemplateElement } from '../../../interfaces/ListTemplatePayload.interface';
import { MessengerTitle } from '../../MessengerTitle';
import { MessengerSubtitle } from '../../MessengerSubtitle';
import { IWithFBMActionEventHandler } from '../../../MessengerPreview.interface';
import { styled } from '../../../../../webchat-ui/style';

interface IMessengerListTemplateHeaderElementProps extends IWithFBMActionEventHandler {
    element: IFBMListTemplateElement;
}

const Root = styled.div<{ url: string }>(({ url }) => ({
    position: 'relative',
    paddingTop: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url('${url}')`
}));

const DarkLayer = styled.div({
    display: 'block',
    content: ' ',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'hsla(0, 0%, 0%, .6)'
});

const Content = styled.div({
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    padding: 10,
});

const Title = styled(MessengerTitle)({
    color: 'hsla(0, 0%, 100%, .9)'
});

const Subtitle = styled(MessengerSubtitle)({
    color: 'hsla(0, 0%, 100%, .9)'
});

export const MessengerListTemplateHeaderElement = ({ element, onAction }: IMessengerListTemplateHeaderElementProps) => {
    const { title, subtitle, image_url, default_action } = element;
    // TODO buttons, default_action

    return (
        <Root
            url={image_url}
            onClick={default_action && (e => onAction(e, default_action))}
        >
            <DarkLayer />
            <Content>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </Content>
        </Root>
    )
};