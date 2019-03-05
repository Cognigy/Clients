import { getPersistentMenuInput } from "./PersistentMenuInput";
import { registerInputPlugin } from "../../helper";
import { InputPluginFactory } from "../../../common/interfaces/input-plugin";

const persistentMenuInput: InputPluginFactory = ({ React, styled }) => {
    const icon = require('./baseline-menu-24px.svg');

    const Input = getPersistentMenuInput({ React, styled });

    return {
        type: 'select',
        id: 'persistent-menu',
        icon,
        component: Input
    }
}

registerInputPlugin(persistentMenuInput);