import { registerInputPlugin } from "../../helper";
import SpeechInput from "./SpeechInput";
import { InputPlugin } from "../../../common/interfaces/input-plugin";
import Button from "./Button";

const speechInput: InputPlugin = {
    type: 'select',
    id: 'speech',
    component: SpeechInput,
    button: Button
}

registerInputPlugin(speechInput);

export default speechInput