import styled, { keyframes } from 'styled-components'

export const framesAnimation = keyframes`
 0% {
   background-position: 0;
    animation-timing-function: steps(1);
 }
 20% {
   background-position: -25%;
    animation-timing-function: steps(1);
 }
 40% {
   background-position: -50%;
    animation-timing-function: steps(1);
 }
 60% {
   background-position: -75%;
    animation-timing-function: steps(1);
 }
 80% {
   background-position: -100%;
    animation-timing-function: steps(1);
 }
`
