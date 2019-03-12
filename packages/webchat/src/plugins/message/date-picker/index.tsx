import * as React from "react";
import DayPicker, { DayPickerProps } from "react-day-picker";
import 'react-day-picker/lib/style.css';
import "./datepicker.css";
import "./style.css";
import { MessageComponentProps, MessagePlugin } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";

// Include the locale utils designed for moment
import MomentLocaleUtils from 'react-day-picker/moment';

// Make sure moment.js has the required locale data
import 'moment/locale/ja';
import 'moment/locale/ar';
import 'moment/locale/it';
import 'moment/locale/de';

interface State {
  selectedDay: Date | null;
}

class DatePicker extends React.Component<MessageComponentProps, State> {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null
    };
  }

  handleDayClick = (day: Date) => {
    this.setState({
      selectedDay: day
    });
  }

  handleSubmit = () => {
    this.props.onSendMessage("", {
      _plugin: "date-picker",
      selectedDay: this.state.selectedDay,
      abort: false
    });
  }

  handleAbort = () => {
    this.props.onSendMessage("", {
      _plugin: "date-picker",
      selectedDay: null,
      abort: true
    });
  }

  render() {
    const { onSendMessage, message, config, attributes } = this.props;
    const event = message.data._plugin.event;
    const firstDayOfWeek = message.data._plugin.firstDayOfWeek;
    // include locale with moment.js -> https://react-day-picker.js.org/docs/localization#localization-props
    const locale = message.data._plugin.locale;
    console.log(message.data)

    return (
      <div {...attributes} style={{ display: "flex", flexDirection: "column" }}>
        <div className="info">
          <h2 className="title">{event}</h2>
        </div>
        <div className="datepicker">
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
            disabledDays={{ daysOfWeek: [0, 6] }} //disable sunday, saturday
            firstDayOfWeek={firstDayOfWeek}
            locale={"de"}
            localeUtils={MomentLocaleUtils}
          />
        </div>
        <div className="controlButtons">
          <button onClick={this.handleAbort} className="cancelButton">cancel</button>
          <button onClick={this.handleSubmit} className="submitButton" disabled={!this.state.selectedDay}>submit</button>
        </div>
      </div>

    );
  }
}

const datePickerPlugin = createMessagePlugin('date-picker', DatePicker, { fullscreen: true });

registerMessagePlugin(datePickerPlugin);

export default datePickerPlugin;