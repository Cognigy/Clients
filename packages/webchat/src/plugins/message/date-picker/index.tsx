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
  msg: string,
}

const datePickerPlugin: MessagePluginFactory = ({ styled }) => {


  const DatePickerRoot = styled.div(({ theme }) => ({
    [datePickerDaySelector]: {
      background: theme.primaryGradient,
      color: theme.primaryContrastColor,
    }
  }));

  const Button = styled.button(({ theme }) => ({
    backgroundColor: theme.greyColor,
    color: theme.greyContrastColor,

    cursor: "pointer",
    border: "none",

    height: 40,

    padding: `${theme.unitSize}px ${theme.unitSize * 2}px`,
    borderRadius: theme.unitSize * 2,
  }));

  const PrimaryButton = styled(Button)(({ theme }) => ({
    background: theme.primaryGradient,
    color: theme.primaryContrastColor,
  }));

  const OutlinedButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    border: `1px solid ${theme.primaryColor}`,
    color: theme.primaryColor
  }));

  const SubmitButton = styled(PrimaryButton)(({ theme }) => ({
    flexGrow: 2,
    marginLeft: theme.unitSize * 2
  }));

  const CancelButton = styled(Button)(({ theme }) => ({
    flexGrow: 1
  }));

  const OpenDatepickerButton = styled(OutlinedButton)(({ theme }) => ({
    '&[disabled]': {
      borderColor: theme.greyColor,
      color: theme.greyColor,
      cursor: 'default'
    }
  }));

  const Padding = styled.div(({ theme }) => ({
    paddingTop: theme.unitSize,
    paddingBottom: theme.unitSize,
    paddingLeft: theme.unitSize * 2,
    paddingRight: theme.unitSize * 2
  }));

  const Header = styled(Padding)(({ theme }) => ({
    background: theme.primaryGradient,
    color: theme.primaryContrastColor,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bolder',
    boxShadow: theme.shadow,
    zIndex: 2
  }));

  const Content = styled(Padding)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
  }))

  const Footer = styled(Padding)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    boxShadow: theme.shadow,
  }));

  const processedMessages: Set<string> = new Set();

  class DatePicker extends React.Component<MessageComponentProps, IState> {
    constructor(props) {
      super(props);
      this.state = {
        msg: "",
      };
    }

    handleSubmit = () => {
      const { message } = this.props

      // close plugin if user didn't choose a date
      if (this.state.msg.length > 0) {
        if (message.source === 'bot')
          processedMessages.add(message.traceId);

        this.props.onSendMessage(this.state.msg), {
          _plugin: "date-picker",
          date: this.state.msg,
        }
      } else {
        this.props.onDismissFullscreen();
      }

    };

    handleAbort = () => {
      const { message } = this.props;

      this.props.onDismissFullscreen();
    }

    render() {
      const { onSendMessage, message, config, attributes, isFullscreen, onSetFullscreen } = this.props;

      const options = {
        event: "Pick a date",
        locale: l10n["en"],
        inline: true,
        static: true,
        enableTime: true,
        mode: "single",
        wantDisable: true,
        disable: [],
        enable: [],
        minDate: "",
        maxDate: "",
        dateFormat: "Y-m-d",
        time_24hr: false,
        defaultDate: new Date()
      }

      let dateButtonText = "pick date";
      let cancelButtonText = "cancel";
      let submitButtonText = "submit";

      try {
        // Message Data
        options.enableTime = message.data._plugin.data.enableTime;
        options.mode = message.data._plugin.data.mode;
        options.event = message.data._plugin.data.eventName;
        options.minDate = message.data._plugin.data.minDate;
        options.maxDate = message.data._plugin.data.maxDate;
        options.locale = message.data._plugin.data.locale;
        options.dateFormat = message.data._plugin.data.dateFormat;
        options.time_24hr = message.data._plugin.data.time_24hr;
        options.defaultDate = message.data._plugin.data.defaultDate;

        // disable or enable dates given the users boolean
        if (message.data._plugin.data.wantDisable) {
          options.disable = message.data._plugin.data.enable_disable || [];
        } else {
          options.enable = message.data._plugin.data.enable_disable || [];
        }

        // disables weekends if user writes "weekends" in the disable field
        switch (options.disable[0]) {
          case "weekends":
            try {
              options.disable = [
                (date) => {
                  return (date.getDay() === 0 || date.getDay() === 6);
                }
              ]
            } catch (err) {
              options.disable = []
            }
            break;
          default:
            options.disable = message.data._plugin.data.disable || [];
        }

        dateButtonText = message.data._plugin.data.openPickerButtonText;
        cancelButtonText = message.data._plugin.data.cancelButtonText;
        submitButtonText = message.data._plugin.data.submitButtonText;
      } catch (e) {

      }

      // define the maxDate given the users choice
      try {
        moment.locale('fr-ca') // for 1970-01-01 format
        switch (message.data._plugin.data.maxDate) {
          case "today":
            options.maxDate = moment().format('L');
            break;
          case "tomorrow":
            options.maxDate = moment().add(1, 'days').format('L');
            break;
          case "yesterday":
            options.maxDate = moment().add(-1, 'days').format('L');
            break;
          default:
            options.maxDate = message.data._plugin.data.maxDate;
        }
      } catch (err) {

      }

      // define the minDate given the users choice
      try {
        moment.locale('fr-ca') // for 1970-01-01 format
        switch (message.data._plugin.data.minDate) {
          case "today":
            options.minDate = moment().format('L');
            console.log(options.minDate)
            break;
          case "tomorrow":
            options.minDate = moment().add(1, 'days').format('L');
            console.log(moment().add(1, 'days').format('L'))
            break;
          case "yesterday":
            options.minDate = moment().add(-1, 'days').format('L');
            break;
          default:
            options.minDate = message.data._plugin.data.minDate;
            console.log("default ", options.minDate)
        }
      } catch (err) {

      }


      const { msg } = this.state;

      let datepickerWasOpen = false;
      if (message.source === 'bot') {
        datepickerWasOpen = processedMessages.has(message.traceId);
      }

      if (!isFullscreen) {
        if (datepickerWasOpen) {
          return <OpenDatepickerButton disabled>{dateButtonText}</OpenDatepickerButton>
        }

        return <OpenDatepickerButton onClick={onSetFullscreen}>{dateButtonText}</OpenDatepickerButton>
      }

      return (
        <DatePickerRoot {...attributes} style={{ display: "flex", flexDirection: "column" }}>
          <Header className="info">
            <h2>{options.event}</h2>
          </Header>
          <Content>
            <Flatpickr
              onChange={(dates, msg) => { this.setState({ msg }) }}
              options={
                options
              }
            />
          </Content>
          <Footer>
            <CancelButton onClick={this.handleAbort} className="cancelButton">{cancelButtonText}</CancelButton>
            <SubmitButton onClick={this.handleSubmit} className="submitButton">{submitButtonText}</SubmitButton>
          </Footer>
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