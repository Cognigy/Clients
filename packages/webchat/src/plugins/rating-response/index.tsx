import * as React from "react";
import { MessagePlugin } from "../../../lib/common/interfaces/message-plugin";
import { MessagePluginComponentProps } from "../../common/interfaces/message-plugin";

const RatingResponse = (props: MessagePluginComponentProps) => (
	<span>{props.message.data.rate} / 5 stars!</span>
);

const ratingPlugin: MessagePlugin = {
	match: ({ data }) => data && typeof data.rate === "number",
    component: RatingResponse
}

export default ratingPlugin;