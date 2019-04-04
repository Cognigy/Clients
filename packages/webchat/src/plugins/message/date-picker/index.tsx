import * as React from "react";
import "./style.css";

// Flatpickr Datepicker
import Flatpickr from './components/react-flatpickr';
import './flatpickr.css';

// languages
import l10n from './langHelper';
import moment, { locale, lang } from 'moment';

import { MessageComponentProps, MessagePlugin, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";

const datePickerDaySelector = ".flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange, .flatpickr-day.selected.inRange, .flatpickr-day.startRange.inRange, .flatpickr-day.endRange.inRange, .flatpickr-day.selected:focus, .flatpickr-day.startRange:focus, .flatpickr-day.endRange:focus, .flatpickr-day.selected:hover, .flatpickr-day.startRange:hover, .flatpickr-day.endRange:hover, .flatpickr-day.selected.prevMonthDay, .flatpickr-day.startRange.prevMonthDay, .flatpickr-day.endRange.prevMonthDay, .flatpickr-day.selected.nextMonthDay, .flatpickr-day.startRange.nextMonthDay, .flatpickr-day.endRange.nextMonthDay";

interface IState {
  date: Date[]
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

  const NotFullscreen = styled.div(({ theme }) => ({
    background: theme.primaryGradient,
    borderRadius: theme.unitSize * 2,
    borderBottomLeftRadius: 0,
    boxShadow: theme.messageShadow,
    color: theme.primaryContrastColor,
    padding: `${theme.unitSize * 2}px ${theme.unitSize * 3}px`,
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
        date: [new Date()],
      };
    }

    handleSubmit = (mode, locale) => {
      const { message } = this.props
      try {
        moment.locale(message.data._plugin.data.locale);
      } catch (e) {
        moment.locale("en");
      }

      if (message.source === 'bot')
        processedMessages.add(message.traceId);

      let langWord = ""
      switch (locale) {
        case "de":
          langWord = " bis ";
          break;
        case "en":
          langWord = " to ";
          break;
        case "es":
          langWord = " hasta ";
          break;
        case "ja":
          langWord = " へ ";
          break;
        default:
          langWord = " to ";
          break;
      }

      let dateOutputMessage = "";
      switch (mode) {
        case "single":
          dateOutputMessage += moment(this.state.date[0]).format('LLL');
          break;
        case "multiple":
          for (let d of this.state.date) dateOutputMessage += moment(d).format('LL') + ", ";
          dateOutputMessage = dateOutputMessage.slice(0,-2)
          break;
        case "range":
          dateOutputMessage += moment(this.state.date[0]).format('LL') + langWord + moment(this.state.date[1]).format('LL')
          break;
      }

      console.log(this.state.date)

      //this.props.onSendMessage("" + moment(this.state.date[0]).format('LLLL'), {
      this.props.onSendMessage(dateOutputMessage), {
        _plugin: "date-picker",
        date: this.state.date,
        abort: false
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
        disable: [],
        enable: [],
        minDate: "",
        maxDate: "",
        // TODO: does nothing. https://flatpickr.js.org/options/
        defaultDate: new Date(),
        dateFormat: "",
        time_24hr: false,
      }

      let dateButtonText = "pick date";
      let cancelButtonText = "cancel";
      let submitButtonText = "submit";

      try {
        // Message Data
        options.enableTime = message.data._plugin.data.enableTime;
        options.mode = message.data._plugin.data.mode;
        options.disable = message.data._plugin.data.disable || [];
        options.enable = message.data._plugin.data.enable || [];
        options.event = message.data._plugin.data.eventName;
        options.minDate = message.data._plugin.data.minDate;
        options.maxDate = message.data._plugin.data.maxDate;
        options.locale = message.data._plugin.data.locale;
        options.defaultDate = message.data._plugin.data.defaultDate;
        options.dateFormat = message.data._plugin.data.dateFormat;
        options.time_24hr = message.data._plugin.data.time_24hr;


        dateButtonText = message.data._plugin.data.openPickerButtonText;
        cancelButtonText = message.data._plugin.data.cancelButtonText;
        submitButtonText = message.data._plugin.data.submitButtonText;
      } catch (e) {

      }

      const { date } = this.state;

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
              value={date}
              onChange={date => { this.setState({ date }) }}
              options={
                options
              }
            />
          </Content>
          <Footer>
            <CancelButton onClick={this.handleAbort} className="cancelButton">{cancelButtonText}</CancelButton>
            <SubmitButton onClick={e => this.handleSubmit(options.mode, options.locale)} className="submitButton">{submitButtonText}</SubmitButton>
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