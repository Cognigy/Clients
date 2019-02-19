import { createInputPlugin } from "../../../../../plugins/helper";
import { TextInput } from "./TextInput";

const textInputPlugin = createInputPlugin(
    () => true,
    TextInput
);

export default textInputPlugin;