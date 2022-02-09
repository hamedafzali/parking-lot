import React, { Component } from "react";

import { connect } from "react-redux";
import getData from "../services/parking";
import { systemInitialed, ticketIssued, ticketSettled } from "../store/parking";
import {
  calculatePrice,
  getFreePlaces,
  getTicket,
  getTicketStatus,
} from "../utils/calc";
import Parking from "./common/Parking";
import TicketMachine from "./common/TicketMachine";

class Main extends Component {
  constructor(props) {
    super(props);
    const { parking, ticketIssued } = this.props;
    window.getFreeSpaces = () => {
      console.log(getFreePlaces(parking.parkingMap, parking.ticket));
    };
    window.getTicketState = (barcode) => {
      const item = parking.ticket.filter((i) => i.ticketNumber === barcode);
      console.log(getTicketStatus(item[0]) > 15 ? "paid" : "unpaid");
    };
    window.payTicket = (barcode, paymentMethod) => {
      this.props.ticketSettled({
        no: parseInt(barcode.substring(1, 3)),
        setteledTimestamp: Date.now(),
        type: paymentMethod,
        price: barcode,
      });
    };
    window.calculatePrice = (barcode) => {
      const item = parking.ticket.filter((i) => i.ticketNumber === barcode);
      console.log(calculatePrice(barcode, item[0]));
    };
    window.getTicket = () => {
      const freeplaces = getFreePlaces(parking.parkingMap, parking.ticket);
      const randomElement =
        freeplaces[Math.floor(Math.random() * freeplaces.length)];
      const ticketNumber = getTicket(randomElement.no);
      ticketIssued({
        no: randomElement.no,
        ticketNumber: ticketNumber,
      });
    };
  }

  state = { parkingMap: [] };
  componentDidMount() {
    const data = getData();
    this.setState({ parkingMap: data.parkingMap }, () => {
      if (!this.state.parkingMap && !this.state.parkingMap.length)
        this.props.systemInitialed(getData().parkingMap);
    });
  }
  render() {
    return (
      <div className="app-container">
        <Parking />
        <TicketMachine />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  parking: state.parkingReducer,
});
const mapDispatchToProps = (dispatch) => ({
  systemInitialed: (payload) => dispatch(systemInitialed(payload)),
  ticketSettled: (barcode, paymentMethod) =>
    dispatch(ticketSettled(barcode, paymentMethod)),
  ticketIssued: (payload) => dispatch(ticketIssued(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Main);
