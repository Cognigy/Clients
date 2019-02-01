import { IFBMMessage } from "../interfaces/Message.interface";
import { IFBMMediaTemplateElementMediaType } from "../interfaces/MediaTemplatePayload.interface";


export interface IFBMUploadAPIMessage {
    attachment: {
        type: IFBMMediaTemplateElementMediaType,
        payload: {
            url: string,
            is_reusable: boolean,
        }
    }
}

export const isUploadAPIMessage = (message: IFBMMessage | IFBMUploadAPIMessage) => {
    if (!message)
        return false;

    const { attachment } = message as IFBMUploadAPIMessage;

    if (!attachment)
        return false;

    const { type } = attachment;

    if (!type)
        return false;

    return ['image', 'video', 'audio', 'file'].includes(type);
}


export const transformAttachmentUploadApiMessage = (message: IFBMUploadAPIMessage): IFBMMessage => {
    const media_type = message.attachment.type;
    const url = message.attachment.payload.url;

    return {
        attachment: {
            type: 'template',
            payload: {
                template_type: 'media',
                elements: [{
                    media_type,
                    url,
                    buttons: []
                }]
            }
        }
    }
}