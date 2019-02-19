import GetStartedInput from "./GetStartedInput";
import { InputRule, InputPlugin } from "../../../../../common/interfaces/input-plugin";

const rule: InputRule = ({ config: { settings: { displayGetStartedButton, getStartedButtonText, getStartedPayload, getStartedText } }, messages }) =>
    messages.length === 0
    && displayGetStartedButton
    && !!getStartedButtonText
    && (!!getStartedPayload || !!getStartedText)

const getStartedInputPlugin: InputPlugin = {
    type: 'rule',
    rule,
    component: GetStartedInput
};

export default getStartedInputPlugin;