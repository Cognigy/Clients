import { createInputPlugin } from "../../helper";
import SpeechInput from "./SpeechInput";

export const speechInput = createInputPlugin('speech', SpeechInput);