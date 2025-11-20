import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <svg viewBox="0 0 100 100">
          <defs>
            <filter id="shadow">
              <feDropShadow floodColor="#000" stdDeviation="1.5" dy={0} dx={0} />
            </filter>
          </defs>
          <circle
            r={45}
            cy={50}
            cx={50}
            style={{
              fill: 'transparent',
              strokeWidth: 7,
              strokeLinecap: 'round',
            }}
            id="spinner"
            className="stroke-primary"
          />
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes animation {
    0% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -105;
    }
    50% {
      stroke-dasharray: 80 10;
      stroke-dashoffset: -160;
    }
    100% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -300;
    }
  }

  #spinner {
    transform-origin: center;
    animation-name: animation;
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier;
    animation-iteration-count: infinite;
  }
`;

export default Loader;
