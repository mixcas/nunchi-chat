import React from 'react'
import styled from 'styled-components';

import { framesAnimation } from  '../styles/Keyframes'

import { WIDTH } from '../constants'

const AnimatedDiv = styled.div`
  width: ${WIDTH + 'px'};
  height: ${(WIDTH * .75) + 'px'};
  background-position-x: 0;
  background-image: ${props => 'url(' + props.image + ')'};
  animation: ${framesAnimation} 500ms infinite;
  margin: 0 5px;
`

const AnimatedFrames = ({image}) => {
  return(
    <AnimatedDiv image={image} />
  )
}

export default AnimatedFrames
