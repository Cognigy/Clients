import GetStartedInput from "./GetStartedInput";
import { InputRule, InputPlugin } from "../../../common/interfaces/input-plugin";
import { registerInputPlugin } from "../../helper";

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

registerInputPlugin(getStartedInputPlugin);

export default getStartedInputPlugin;