import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ControlPanelStyles = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-bottom: 2rem;
  .row-selector {
    border: none;
    background-color: #ffffff00;
  }
  .slidecontainer {
    width: 10rem; /* Width of the outside container */
    display: flex;
    align-items: center;
  }

  /* The slider itself */
  .slider {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
    transition: opacity 0.2s;
  }

  /* Mouse-over effects */
  .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04aa6d; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  .slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04aa6d; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
`;

const ControlPanel = ({
  setListaProdutos,
  listaProdutos,
  listarProdutos,
}: any) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [rowNumber, setRowNumber] = useState(5);
  const [rows, setRows] = useState([]) as any;

  const produto = () => {
    console.log(listaProdutos.products[sliderValue], sliderValue);
  };

  useEffect(() => {
    // if (!listaProdutos) return;
    listarProdutos(sliderValue + 1, rowNumber);
    // if (rowNumber === +listaProdutos.count) {
    //   setSliderValue(0);
    // }
  }, [sliderValue, rowNumber]);

  useEffect(() => {
    if (!listaProdutos) return;

    rowNumbers();
    // console.log(listaProdutos);

    setListaProdutos(listaProdutos);
  }, [listaProdutos]);

  const rowNumbers = () => {
    const options = [];
    for (let i = 5; i <= +listaProdutos.count; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    setRows([...options]);
  };
  return (
    <ControlPanelStyles>
      <select
        className="row-selector"
        onChange={(e) => setRowNumber(+e.target.value)}
        name=""
        id=""
      >
        {...rows}
      </select>
      <div className="slidecontainer">
        {!!listaProdutos && (
          <input
            type="range"
            min="0"
            max={Math.ceil(listaProdutos.count / 5) - 1}
            value={sliderValue}
            className="slider"
            style={{
              visibility:
                rowNumber !== listaProdutos.count ? "visible" : "hidden",
            }}
            id="myRange"
            step="1"
            onChange={(e) => setSliderValue(+e.target.value)}
          />
        )}
      </div>
    </ControlPanelStyles>
  );
};

export default ControlPanel;
