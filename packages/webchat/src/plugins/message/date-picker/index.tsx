import * as React from "react";
import "./style.css";

// Flatpickr Datepicker
import Flatpickr from './components/react-flatpickr';
import './flatpickr.css';

// languages
import l10n from './langHelper';
import moment from 'moment';

import { MessageComponentProps, MessagePlugin, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";

const datePickerDaySelector = ".flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange, .flatpickr-day.selected.inRange, .flatpickr-day.startRange.inRange, .flatpickr-day.endRange.inRange, .flatpickr-day.selected:focus, .flatpickr-day.startRange:focus, .flatpickr-day.endRange:focus, .flatpickr-day.selected:hover, .flatpickr-day.startRange:hover, .flatpickr-day.endRange:hover, .flatpickr-day.selected.prevMonthDay, .flatpickr-day.startRange.prevMonthDay, .flatpickr-day.endRange.prevMonthDay, .flatpickr-day.selected.nextMonthDay, .flatpickr-day.startRange.nextMonthDay, .flatpickr-day.endRange.nextMonthDay";

interface IState {
  date: Date[]
}

const datePickerPlugin: MessagePluginFactory = ({ styled }) => {


  const DatePickerRoot = styled.div(({ theme }) => ({
    [datePickerDaySelector]: {
      backgroundColor: theme.primaryColor,
      color: theme.primaryContrastColor,
      borderColor: theme.primaryStrongColor
    }
  }));

  const SubmitButton = styled.button(({ theme }) => ({
    backgroundColor: theme.primaryColor,
    color: theme.primaryContrastColor,
    width: "40%",
    border: "none",
    fontSize: "100%",
    fontFamily: "Helvetica",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    height: "40px"

  }));

  const CancelButton = styled.button(({ theme }) => ({
    backgroundColor: theme.greyColor,
    color: theme.greyContrastColor,
    width: "20%",
    fontSize: "100%",
    fontFamily: "Helvetica",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    height: "40px"
  }));

  const OpenDatepickerButton = styled.button(({ theme }) => ({
    fontSize: "16px",
    fontFamily: "Arial",
    padding: "2%",
    borderRadius: "10px",
    cursor: "pointer"
  }));

  class DatePicker extends React.Component<MessageComponentProps, IState> {
    constructor(props) {
      super(props);
      this.state = {
        date: [new Date()],
      };
    }
  
    handleSubmit = () => {
      const { message } = this.props
      moment.locale(message.data._plugin.data.locale);
      console.log(this.state.date)
  
      this.props.onSendMessage("" + moment(this.state.date[0]).format('LLLL'), {
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
      const { onSendMessage, message, config, attributes, isFullscreen, onSetFullscreen } = this.props;
  
      // Message Data
      const enableTime = message.data._plugin.data.enableTime;
      const mode = message.data._plugin.data.mode;
      const disable = message.data._plugin.data.disable;
      const event = message.data._plugin.data.eventName;
      const minDate = message.data._plugin.data.minDate;
      const maxDate = message.data._plugin.data.maxDate;
      const locale = message.data._plugin.data.locale;
  
  
      const dateButtonText = "Pick a date";
      const cancelButtonText = "Cancel";
      const submitButtonText = "Submit";
      const { date } = this.state;
  
      if (!isFullscreen) {
        return <OpenDatepickerButton onClick={onSetFullscreen}>{dateButtonText}</OpenDatepickerButton>
      }
  
      return (
        <DatePickerRoot {...attributes} style={{ display: "flex", flexDirection: "column" }}>
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
            <CancelButton onClick={this.handleAbort} className="cancelButton">{cancelButtonText}</CancelButton>
            <SubmitButton onClick={this.handleSubmit} className="submitButton">{submitButtonText}</SubmitButton>
          </div>
        </DatePickerRoot>
      );
    }
  }

  const plugin = {
    match: "date-picker",
    component: DatePicker
  }

  return plugin;
}

registerMessagePlugin(datePickerPlugin);

export default datePickerPlugin;