import { IFBMGenericTemplatePayload, IFBMGenericTemplateElement } from '../../interfaces/GenericTemplatePayload.interface';
import { IWithFBMActionEventHandler } from '../../MessengerPreview.interface';
import { getDivider } from '../Divider';
import { MessagePluginFactoryProps } from '../../../../../../common/interfaces/message-plugin';
import { getMessengerButton } from '../MessengerButton/MessengerButton';
import { getMessengerContent } from '../MessengerContent';
import { getMessengerFrame } from '../MessengerFrame';
import { getMessengerTitle } from '../MessengerTitle';
import { getMessengerSubtitle } from '../MessengerSubtitle';
import { Carousel } from 'react-responsive-carousel';

import './carousel.css';
import { element } from 'prop-types';

export interface IMessengerGenericTemplateProps extends IWithFBMActionEventHandler {
    payload: IFBMGenericTemplatePayload;
}

export interface IMessengerGenericTemplateState {
    index: number;
}

export const getMessengerGenericTemplate = ({ React, styled }: MessagePluginFactoryProps) => {
    const MessengerSubtitle = getMessengerSubtitle({ React, styled });
    const MessengerTitle = getMessengerTitle({ React, styled });
    const MessengerFrame = getMessengerFrame({ React, styled });
    const MessengerContent = getMessengerContent({ React, styled });
    const MessengerButton = getMessengerButton({ React, styled });
    const Divider = getDivider({ React, styled });

    const CarouselRoot = styled(Carousel)(({ theme }) => ({
        marginBottom: -32,

        '.slide': {
            paddingLeft: theme.unitSize * 2,
            paddingRight: theme.unitSize * 2,
            paddingBottom: 32
        },


        // '.slide:first-child': {
        //     paddingLeft: theme.unitSize * 6
        // },

        // '.slide:last-child': {
        //     paddingRight: theme.unitSize * 7
        // }
    }))

    const ElementRoot = styled.div(({ theme }) => ({
        display: 'flex',
    }));

    const Frame = styled(MessengerFrame)({
        backgroundColor: 'white'
    });

    const Image = styled.div<{ url: string }>(({ url }) => ({
        paddingTop: '50%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: `url('${url}')`
    }));

    const SingleRoot = styled.div(({ theme }) => ({
        paddingLeft: theme.unitSize * 2
    }));

    const MessengerGenericTemplate = class MessengerGenericTemplate extends React.Component<IMessengerGenericTemplateProps & React.HTMLProps<HTMLDivElement>, IMessengerGenericTemplateState> {
        getImageStyles(element: IFBMGenericTemplateElement) {
            const styles: React.CSSProperties = {
                backgroundImage: `url('${element.image_url}')`
            }

            return styles;
        }

        renderElement = (element: IFBMGenericTemplateElement, index?: number) => {

            const { onAction, ...divProps } = this.props;
            const { image_url, title, subtitle, buttons, default_action } = element;

            return (
                <ElementRoot key={index}>
                    <Frame>
                        {image_url && (
                            <>
                                <Image
                                    url={image_url}
                                    onClick={e => default_action && onAction(e, default_action)}
                                />
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
                    </Frame>
                </ElementRoot>
            );
        }

        render() {
            const elements = this.props.payload.elements;

            if (elements.length === 0)
                return null;

            if (elements.length === 1)
                return (
                    <SingleRoot>
                        {this.renderElement(elements[0])}
                    </SingleRoot>
                );

            return (
                <CarouselRoot
                    showThumbs={false}
                    showIndicators={false}
                    showStatus={false}
                    centerMode={true}
                >
                    {elements.map(this.renderElement)}
                </CarouselRoot>
            )
        }
    }

    return MessengerGenericTemplate;
}