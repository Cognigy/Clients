import * as React from "react";
import Seatmap from './components/Seatmap.jsx';
import './style/style.css';
import { MessageComponentProps, MessagePlugin, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
import { createMessagePlugin, registerMessagePlugin } from "../../helper";

interface State {
  selectedSeats: any[];
}

const flightSeatPickerPlugin: MessagePluginFactory = ({ styled }) => {
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

  const NotFullscreen = styled.button(({ theme }) => ({
    backgroundColor: theme.primaryColor,
    color: theme.primaryContrastColor,
    border: "none",
    fontSize: "100%",
    fontFamily: "Helvetica",
    borderRadius: "10px",
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

  class FlightseatPicker extends React.Component<MessageComponentProps, State> {
    constructor(props) {
      super(props);
      this.state = {
        selectedSeats: []
      };
    }

    handleAddSeat = (row, number) => {
      const selectedSeats = [...this.state.selectedSeats, [row, number]];

      this.setState({
        selectedSeats
      });
    }

    handleRemoveSeat = (row, number) => {
      /* 
       TODO: You cannot chose two or more seats in the same row or column. Only diagonal is possible yet.
      */
      this.setState({
        selectedSeats: this.state.selectedSeats.filter((currentSeat) => {
          return currentSeat[0] !== row && currentSeat[1] !== number
        })
      });
    }

    handleSubmit = () => {
      this.props.onSendMessage(`Row ${this.state.selectedSeats[0][0]}, Seat ${this.state.selectedSeats[0][1]}`, {
        _plugin: "flightseat-picker",
        selectedSeats: this.state.selectedSeats,
        abort: false
      });
    }

    handleAbort = () => {
      this.props.onSendMessage("", {
        _plugin: "flightseat-picker",
        selectedSeats: this.state.selectedSeats,
        abort: true
      });
    }

    render() {
      const { onSendMessage, message, config, attributes, isFullscreen, onSetFullscreen } = this.props;

      let rows = []
      let numbermaxReservableSeats = 1
      let airplane = "A420"
      let fromCity = "Düsseldorf"
      let toCity = "San Francisco"

      try {
        rows = message.data._plugin.data.rows;
        numbermaxReservableSeats = message.data._plugin.data.numbermaxReservableSeats;
        airplane = message.data._plugin.data.airplane;
        fromCity = message.data._plugin.data.from;
        toCity = message.data._plugin.data.to;
      } catch (e) {

      }
        
      if (!isFullscreen) {
          return <NotFullscreen>{fromCity} ✈️ {toCity}</NotFullscreen>
        }

        return (
          // <div {...attributes} style={{ display: "flex", flexDirection: "column", justifyContent:"space-around"}}>
          <div {...attributes} style={{ display: "flex", flexDirection: "column", background: "linear-gradient(to bottom right, rgb(90,175,255,0.7), rgb(255,121,185,0.7))" }}>

            <div className="info">
              <h2 className="title">{fromCity} ✈️ {toCity}</h2>
              <div style={{ marginTop: "2%" }}>
                <div className="infoTextDiv"><p className="infoText">Plane:</p>&ensp;&ensp;{airplane}</div>
                <div className="infoTextDiv"><p className="infoText">Seats:</p>&ensp;&ensp;{numbermaxReservableSeats}</div>
              </div>
            </div>
            <div className="flightmap">
              <Seatmap addSeatCallback={this.handleAddSeat} removeSeatCallback={this.handleRemoveSeat} rows={rows} maxReservableSeats={numbermaxReservableSeats} />
            </div>
            <div className="controlButtons">
              <CancelButton onClick={this.handleAbort} className="cancelButton">cancel</CancelButton>
              <SubmitButton onClick={this.handleSubmit} className="submitButton" disabled={this.state.selectedSeats.length === 0}>submit</SubmitButton>
            </div>
          </div>
        );
      }
    
  }
    const plugin = {
      match: "flightseat-picker",
      component: FlightseatPicker,
      options: {
        fullscreen: true
      }
    }
  return plugin

}

registerMessagePlugin(flightSeatPickerPlugin);

export default flightSeatPickerPlugin;