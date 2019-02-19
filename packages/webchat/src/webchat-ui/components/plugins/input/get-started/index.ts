import { createInputPlugin } from "../../../../../plugins/helper";
import GetStartedInput from "./GetStartedInput";
import { InputMatcher } from "../../../../../common/interfaces/input-plugin";

const match: InputMatcher = ({ config: { settings: { displayGetStartedButton, getStartedButtonText, getStartedPayload, getStartedText } }, messages }) =>
    messages.length === 0
    && displayGetStartedButton
    && !!getStartedButtonText
    && (!!getStartedPayload || !!getStartedText)

const getStartedInputPlugin = createInputPlugin(
    match,
    GetStartedInput
);

export default getStartedInputPlugin;