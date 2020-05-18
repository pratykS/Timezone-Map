import React from "react";
import Draggable from "../DraggablePanel/draggablePanel";
import timespace from "@mapbox/timespace";
import * as styles from "./timeBox.css";

const dayMapping = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

class TimeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: timespace.getFuzzyLocalTimeFromPoint(Date.now(), [
        props.longitude,
        props.latitude,
      ]),
      isOpen: true,
    };

    this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(() => ({
      time: timespace.getFuzzyLocalTimeFromPoint(Date.now(), [
        this.props.longitude,
        this.props.latitude,
      ]),
    }));
  }

  onCloseBtnClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { time, isOpen } = this.state;

    const ISO1806Format = time
      ? `${time.format("YYYY-MM-DD hh:mm:ss")} GMT ${time.format("Z")}`
      : null;

    const day = time ? time.format("dddd") : dayMapping[new Date().getUTCDay()];
    const timeString = time
      ? time.format("hh:mm:ss A")
      : new Date().toLocaleTimeString();
    const dateString = time
      ? time.format("YYYY/MM/DD")
      : new Date().toLocaleDateString();

    return isOpen ? (
      <React.Fragment>
        <Draggable x={10} y={60}>
          <div className="sidebarStyle">
            <div className="timehourcontainer">
              <span className="humanReadable">{day}</span>
              <span className="humanReadable">{dateString}</span>
              <span className="humanReadable"> {timeString}</span>
            </div>

            {ISO1806Format ? (
              <div className="paddingHelper">{ISO1806Format}</div>
            ) : null}
          </div>
          <span
            className="closeBtn"
            onClick={() => this.onCloseBtnClick()}
          ></span>
        </Draggable>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="seeTime" onClick={() => this.onCloseBtnClick()}>
          See Time
        </div>
      </React.Fragment>
    );
  }
}

export default TimeBox;
