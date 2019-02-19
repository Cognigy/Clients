import { TextInput } from "./TextInput";
import { InputPlugin } from "../../../../../common/interfaces/input-plugin";

const textInputPlugin: InputPlugin = {
    type: 'select',
    id: 'text',
    component: TextInput
};

export default textInputPlugin;