import React from 'react'

const AnimatedFrames = ({image}) => {
	return(
    <div className='animated-frames' style={{
      backgroundImage: `url(${image})`
    }} />
	)
}

export default AnimatedFrames
