import * as React from "react";
import { MessageComponentProps } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";

const RatingMessage = (props: MessageComponentProps) => (
	<div>
		<span onClick={() => props.onSendMessage("", { rate: 1 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 2 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 3 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 4 })}>★</span>
		<span onClick={() => props.onSendMessage("", { rate: 5 })}>★</span>
	</div>
);

const ratingPlugin = createMessagePlugin('rating', RatingMessage);

registerMessagePlugin(ratingPlugin);

export default ratingPlugin;