import * as React from 'react';

import { IFBMMessage, IFBMAttachmentMessage, IFBMRegularMessage } from './interfaces/Message.interface';
import { IFBMButtonTemplatePayload } from './interfaces/ButtonTemplatePayload.interface';
import { IFBMGenericTemplatePayload } from './interfaces/GenericTemplatePayload.interface';
import { IFBMListTemplatePayload } from './interfaces/ListTemplatePayload.interface';
import { IFBMMediaTemplatePayload } from './interfaces/MediaTemplatePayload.interface';
import { MessengerButtonTemplate } from './components/MessengerButtonTemplate/MessengerButtonTemplate';
import { MessengerGenericTemplate } from './components/MessengerGenericTemplate/MessengerGenericTemplate';
import { MessengerListTemplate } from './components/MessengerListTemplate/MessengerListTemplate';
import { MessengerMediaTemplate } from './components/MessengerMediaTemplate/MessengerMediaTemplate';
import { MessengerTextWithQuickReplies } from './components/MessengerTextWithQuickReplies/MessengerTextWithQuickReplies';
import { transformAttachmentUploadApiMessage } from './lib/transform';
import { FBMActionEventHandler } from './MessengerPreview.interface';

export interface IMessengerPreviewProps extends React.HTMLProps<HTMLDivElement> {
    /** input.data._cognigy._facebook */
    message: IFBMMessage;
    onAction?: FBMActionEventHandler;
}

export const MessengerPreview = (props: IMessengerPreviewProps) => {
    const { message, onAction: handleAction, ...divProps } = props;

    const { attachment } = message as IFBMAttachmentMessage;

    // if no action handler is present, use a dummy function
    const onAction = props.onAction
        || (e => {
            e.stopPropagation();
        });

    if (attachment) {
        // return text and quick replies

        const { type, payload } = attachment;

        switch (type) {
            case 'template': {
                const { template_type } = payload;

                switch (template_type) {
                    case 'button': {
                        return (
                            <MessengerButtonTemplate
                                {...divProps}
                                payload={payload as IFBMButtonTemplatePayload}
                                onAction={onAction}
                            />
                        )
                    }

                    case 'generic': {
                        return (
                            <MessengerGenericTemplate
                                {...divProps}
                                payload={payload as IFBMGenericTemplatePayload}
                                onAction={onAction}
                            />
                        )
                    }

                    case 'list': {
                        return (
                            <MessengerListTemplate
                                {...divProps}
                                payload={payload as IFBMListTemplatePayload}
                                onAction={onAction}
                            />
                        );
                    }

                    case 'media': {
                        return (
                            <MessengerMediaTemplate
                                {...divProps}
                                payload={payload as IFBMMediaTemplatePayload}
                                onAction={onAction}
                            />
                        );
                    }
                }

                break;
            }

            // this part checks whether we use the 'messenger upload API'
            // The API will first upload the image/audio/video/file and then render a 
            // 'media' template.
            // we are checking for that syntax here and converting it to a 'media' template

            // TODO: move this somewhere else, SoC

            // @ts-ignore
            case 'image':
            // @ts-ignore
            case 'video':
            // @ts-ignore
            case 'audio': {
                const newMessage = transformAttachmentUploadApiMessage(message as any)
                // @ts-ignore
                const payload = newMessage.attachment.payload as IFBMMediaTemplatePayload;

                return (
                    <MessengerMediaTemplate
                        {...divProps}
                        payload={payload as IFBMMediaTemplatePayload}
                        onAction={onAction}
                    />
                )
            }


        }
    }

    return (
        <MessengerTextWithQuickReplies
            {...divProps}
            message={message as IFBMRegularMessage}
            onAction={onAction}
        />
    )
}