import { IFBMRegularMessage } from '../../interfaces/Message.interface';
import { IFBMTextQuickReply, IFBMQuickReply } from '../../interfaces/QuickReply.interface';
import { getMessengerQuickReply } from '../MessengerQuickReply';
import { IWithFBMActionEventHandler } from '../../MessengerPreview.interface';
import { MessagePluginFactoryProps } from '../../../../../../common/interfaces/message-plugin';
import { getMessengerBubble } from '../MessengerBubble';

interface Props extends IWithFBMActionEventHandler {
    message: IFBMRegularMessage;
}

export const getMessengerTextWithQuickReplies = ({ React, styled }: MessagePluginFactoryProps) => {

    const MessengerQuickReply = getMessengerQuickReply({ React, styled });
    const MessengerBubble = getMessengerBubble({ React, styled });

    const BorderBubble = styled(MessengerBubble)(({ theme }) => ({
        border: `1px solid ${theme.greyColor}`
    }));

    const QuickReplies = styled.div({
        display: 'flex',

        margin: -5,
        marginTop: 3,
        flexWrap: 'wrap',

        justifyContent: 'center',

        '&>*': {
            margin: 5
        }
    });

    const MessengerTextWithQuickReplies = ({ message, onAction, ...divProps }: Props & React.HTMLProps<HTMLDivElement>) => {
        const { text, quick_replies } = message;

        const hasQuickReplies = quick_replies && quick_replies.length > 0;

        // TODO add click behaviour

        return (
            <div {...divProps}>
                <BorderBubble>
                    {text}
                </BorderBubble>

                {hasQuickReplies && (
                    <QuickReplies>
                        {(quick_replies as IFBMQuickReply[]).map((quickReply, index) => {
                            const { content_type } = quickReply;

                            let label: string = ''

                            switch (content_type) {
                                case 'location': {
                                    label = 'Send Location';
                                    break;
                                }

                                case 'text': {
                                    const { title } = quickReply as IFBMTextQuickReply;
                                    label = title;
                                    break;
                                }

                                case 'user_email': {
                                    label = 'Send Email-Address';
                                    break;
                                }

                                case 'user_phone_number': {
                                    label = 'Send Phone Number';
                                    break;
                                }
                            }

                            return (
                                <MessengerQuickReply
                                    key={index}
                                    onClick={e => onAction(e, quickReply)}
                                >
                                    {label}
                                </MessengerQuickReply>
                            );
                        })}
                    </QuickReplies>
                )}
            </div>
        )
    }

    return MessengerTextWithQuickReplies;
}