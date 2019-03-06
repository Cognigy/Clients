import * as React from "react";
import DayPicker, { DayPickerProps } from "react-day-picker";
import "./datepicker.css";
import "./style.css";
import { MessageComponentProps, MessagePlugin } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";

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
    return (
      <div {...attributes} className="datepicker">
        <div>
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
          />
        </div>
        <div>
          <button onClick={this.handleAbort} >cancel</button>
          <button onClick={this.handleSubmit} disabled={!this.state.selectedDay}>submit</button>
        </div>
      </div>
 
    );
  }
}

const datePickerPlugin = createMessagePlugin('date-picker', DatePicker, { fullscreen: false });

registerMessagePlugin(datePickerPlugin);

export default datePickerPlugin;