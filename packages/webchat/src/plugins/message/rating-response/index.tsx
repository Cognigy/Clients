import * as React from "react";
import { MessageComponentProps } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin } from "../../helper";

const RatingResponse = (props: MessageComponentProps) => (
	<span>{props.message.data.rate} / 5 stars!</span>
);

const ratingResponsePlugin = createMessagePlugin(
	({ data }) => data && typeof data.rate === "number",
	RatingResponse
)

export default ratingResponsePlugin;