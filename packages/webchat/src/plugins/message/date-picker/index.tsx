import * as React from "react";
import "./style.css";

// Flatpickr Datepicker
import Flatpickr from 'react-flatpickr'
import './flatpickr.css';

// languages
import l10n from './langHelper';

import { MessageComponentProps, MessagePlugin } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";

class DatePicker extends React.Component<MessageComponentProps> {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  handleSubmit = () => {
    this.props.onSendMessage("", {
      _plugin: "date-picker",
      date: this.state.date,
      abort: false
    });
  }

  handleAbort = () => {
    this.props.onSendMessage("", {
      _plugin: "date-picker",
      date: null,
      abort: true
    });
  }

  render() {
    const { onSendMessage, message, config, attributes } = this.props;

    // Message Data
    const enableTime = message.data._plugin.data.enableTime;
    const mode = message.data._plugin.data.mode;
    const disable = message.data._plugin.data.disable;
    const event = message.data._plugin.data.eventName;
    const minDate = message.data._plugin.data.minDate;
    const maxDate = message.data._plugin.data.maxDate;
    const locale = message.data._plugin.data.locale;
    const { date } = this.state;

    return (
      <div {...attributes} style={{ display: "flex", flexDirection: "column" }}>
        <div className="info">
          <h2 className="title">{event}</h2>
        </div>
        <div className="datepicker">
          <Flatpickr
            value={date}
            onChange={date => { this.setState({ date }) }}
            options={
              {
                locale: l10n[locale],
                inline: true,
                static: true,
                enableTime: enableTime,
                mode: mode,
                disable: disable,
                minDate: minDate,
                maxDate: maxDate
              }
            }
          />
        </div>
        <div className="controlButtons">
          <button onClick={this.handleAbort} className="cancelButton">cancel</button>
          <button onClick={this.handleSubmit} className="submitButton" >submit</button>
        </div>
      </div>

    );
  }
}

const datePickerPlugin = createMessagePlugin('date-picker', DatePicker, { fullscreen: true });

registerMessagePlugin(datePickerPlugin);

export default datePickerPlugin;