import { createInputPlugin } from "../../helper";
import SpeechInput from "./SpeechInput";
import { InputPlugin } from "../../../common/interfaces/input-plugin";

const speechInput: InputPlugin = {
    type: 'select',
    id: 'speech',
    label: 'voice',
    component: SpeechInput
}

export default speechInput