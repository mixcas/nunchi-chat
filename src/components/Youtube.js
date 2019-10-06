import React, { Component } from 'react'
import styled from 'styled-components'

const YoutubeWrapper = styled.div`
  flex: 1 0 70%;
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
`

export default () => {
  return (
    <YoutubeWrapper>
    <iframe style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }} src="https://www.youtube.com/embed/jb6sAnDdEJ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </YoutubeWrapper>
  )
}
