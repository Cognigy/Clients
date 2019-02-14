import * as React from "react";
import { MessagePlugin } from "../../common/interfaces/message-plugin";
import { MessageComponentProps } from "../../common/interfaces/message-plugin";

const RatingMessage = (props: MessageComponentProps) => (
	<div>
		<span onClick={() => props.onSendMessage("", { rate: 1 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 2 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 3 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 4 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 5 })}>★</span>
	</div>
);

const ratingPlugin: MessagePlugin = {
	match: ({ data }) => data && data._plugin && data._plugin.type === "rating",
    component: RatingMessage
}

export default ratingPlugin;