import * as React from "react";
import DayPicker, { DayPickerProps } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { MessagePluginComponentProps, MessagePlugin } from "../../common/interfaces/message-plugin";

interface State {
    selectedDay: Date | null;
}

class DatePicker extends React.Component<MessagePluginComponentProps, State> {
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
      selectedDay: this.state.selectedDay
    });
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
        />
        <button onClick={this.handleSubmit} disabled={!this.state.selectedDay}>submit</button>
      </div>
    );
  }
}

const datePickerPlugin: MessagePlugin = {
  match: ({ data }) =>  data && data._plugin && data._plugin.type === "date-picker",
  component: DatePicker,
  options: {
      fullscreen: true
  }
};

export default datePickerPlugin;