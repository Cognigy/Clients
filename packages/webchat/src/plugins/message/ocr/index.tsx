import * as React from "react";
import { MessageComponentProps, MessagePlugin, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";
import ocrSpaceApi from "ocr-space-api";
import sharp from "sharp";


interface State {
    selectedFile: any;
    loaded: any;
}

const ocrPlugin: MessagePluginFactory = ({ styled }) => {

    const OpenDatepickerButton = styled.button(({ theme }) => ({
        backgroundColor: 'transparent',
        border: `1px solid ${theme.primaryColor}`,
        color: theme.primaryColor,
        borderRadius: "10px",
        padding: "2%",
        cursor: "pointer",
        marginTop: "2%"
    }));

    const InputForm = styled.input(({ theme }) => ({
        color: theme.primaryColor
    }));

    class OCR extends React.Component<MessageComponentProps, State> {
        constructor(props) {
            super(props)
            this.state = {
                selectedFile: null,
                loaded: 0,
            }
        }

        handleselectedFile = event => {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
            })
        }
        handleUpload = (apiKey) => {
            const options = {
                apikey: apiKey,
                language: "ger",
                imageFormat: "image/png"
            };

            sharp(this.state.selectedFile)
                .resize(800, 500)
                .toFormat("png")
                .normalize(true)
                .rotate()
                .toFile("output.png")
                .then(info => {
                    // Run and wait the result
                    ocrSpaceApi
                        .parseImageFromLocalFile("output.png", options)
                        .then(parsedResult => {
                            let parsedTextList = parsedResult.parsedText.split(/\r?\n/);
                            let list:any = [];

                            for (let w of parsedTextList) {
                                if (w === w.toUpperCase() &&
                                    !w.includes("BUNDESREPUBLIK DEUTSCHLAND") &&
                                    !w.includes("FEDERAL") &&
                                    !w.includes("PERSONALAUSWEIS") &&
                                    !w.includes("IDENTITY CARD")) {
                                    list.push(w)
                                }
                            }
                            let values = {
                                identityCard: {
                                    text: list
                                }
                            };
                            console.log(values);
                        })
                        .catch(err => {
                            console.log("ERROR:", err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });

        }

        render() {
            const { onSendMessage, message, config, attributes } = this.props;

            const apiKey = message.data._plugin.data.api_key;

            return (
                <div className="App">
                    <InputForm type="file" accept="image/*" id="capture" capture="camera" onChange={this.handleselectedFile} />
                    <OpenDatepickerButton onClick={() => this.handleUpload(apiKey)}>Upload</OpenDatepickerButton>
                </div>
            )
        }
    }

    const plugin = {
        match: "ocr",
        component: OCR
    }
    return plugin;
}
registerMessagePlugin(ocrPlugin);

export default ocrPlugin;