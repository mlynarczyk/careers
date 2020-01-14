import React, {Component, createElement} from 'react'
import styled from 'styled-components';

const H3 = styled.h3`
  color: yellow;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {color: "green"};

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    this.setState({color: this.randomColor()});
  }

  randomColor() {
    let colors = ["red", "blue", "green", "orange", "gold", "slategray"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  render() {
    const {title, subtitle} = this.props

    return (
      <div className="map-component">
        <H3>{title}</H3>
        <p>{subtitle}</p>
        <button onClick={this.changeColor}>Change color</button>
        <div className="map" style={{backgroundColor: this.state.color}}>Jestem mapą :)</div>
      </div>
    );
  }
}

export default Map
