import { TextInput } from "./TextInput";
import { InputPlugin } from "../../../../../common/interfaces/input-plugin";
import Button from "./Button";

const textInputPlugin: InputPlugin = {
    type: 'select',
    id: 'text',
    component: TextInput,
    button: Button
};

export default textInputPlugin;