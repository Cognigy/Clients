import * as React from "react";
import { MessagePlugin } from "../../common/interfaces/message-plugin";
import { MessageComponentProps } from "../../common/interfaces/message-plugin";

const RatingResponse = (props: MessageComponentProps) => (
	<span>{props.message.data.rate} / 5 stars!</span>
);

const ratingPlugin: MessagePlugin = {
	match: ({ data }) => data && typeof data.rate === "number",
    component: RatingResponse
}

export default ratingPlugin;