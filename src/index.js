import React, { Component, createRef } from "react";
import "./app.css";
import { getSliderValues, propTypeValidation } from "./utils";

class ReactSlider extends Component {
  state = {
    elementsPerView: 2,
    pages: 0,
    currentPage: 0,
    percent: 50,
    length: 0,
    direction: "forwards"
  };

  sliderRef = createRef();

  setUpSlider = () => {
    const { pages, elementsPerView, percent, length } = getSliderValues({
      minWidth: this.props.elementsMinWidth,
      elementsPerView: this.props.elementsPerView || 4,
      sliderWidth: this.sliderRef.current.clientWidth,
      length: this.props.children.length
    });

    this.setState(prevState => ({
      elementsPerView,
      pages,
      percent,
      length,
      currentPage:
        prevState.currentPage > prevState.pages
          ? prevState.pages
          : prevState.currentPage
    }));
  };

  componentDidMount() {
    this.setUpSlider();
    window.addEventListener("resize", this.setUpSlider);
    if (this.props.autoMode) {
      this.setAnimationMode();
    }
  }

  componentDidUpdate() {
    if (this.state.currentPage > this.state.pages)
      this.setState({
        currentPage: this.state.pages
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setUpSlider);
  }

  handleNext = () => {
    if (this.state.currentPage < this.state.pages) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
    }
  };

  handlePrev = () => {
    if (this.state.currentPage > 0) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1
      }));
    }
  };

  setAnimationMode() {
    setInterval(() => {
      if (this.state.currentPage === 0) {
        this.setState({
          direction: "forwards"
        });
      } else if (this.state.currentPage === this.state.pages) {
        this.setState({
          direction: "backwards"
        });
      }
      if (this.state.direction === "forwards") this.handleNext();
      else this.handlePrev();
    }, this.props.autoModeDelayTime * 1000 || 4000);
  }

  render() {
    return (
      <div className="slider-menu-wrapper-container">
        <svg
          className="slider-menu-prev-icon"
          style={{
            display: `${this.state.currentPage === 0 ? "none" : "initial"}`
          }}
          onClick={this.handlePrev}
          width="20"
          height="26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1.88669L8.09174 0L0 8L8.09174 16L10 14.1133L3.81658 8L10 1.88669Z"
            fill={`${this.props.btnColor || "black"}`}
          />
        </svg>

        <svg
          className="slider-menu-next-icon"
          onClick={this.handleNext}
          style={{
            display: `${
              this.state.currentPage === this.state.pages ? "none" : "initial"
            }`
          }}
          width="20"
          height="26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.89189 0L0 1.86667L6.21622 8L0 14.1333L1.89189 16L10 8L1.89189 0Z"
            fill={`${this.props.btnColor || "black"}`}
          />
        </svg>
        <div className="slider-menu-wrapper">
          <div
            ref={this.sliderRef}
            className="slider-menu-container"
            style={{
              gridTemplateColumns: `repeat(${this.state.length}, minmax(${this.state.percent}%, ${this.state.percent}%))`,
              transform: `translateX(-${this.state.currentPage * 100}%)`,
              transition: `transform ${this.props.sliderTransition ||
                0.7}s ease-out`,
              height: `${this.props.height || 200}px`
            }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

ReactSlider.propTypes = propTypeValidation;

ReactSlider.defaultProps = {
  elementsMinWidth: 200,
  autoModeDelayTime: 5,
  sliderTransition: 0.7
};

export default ReactSlider;
