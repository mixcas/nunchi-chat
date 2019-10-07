import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase'
import YouTube from 'react-youtube'

class PlaylistContainer extends Component {
  state = {
    currentVideo: false,
  }

  handleOnReady = video => {
    const { firestore } = this.props

    const videoId = video.target.b.b.videoId
    const currentVideo = this.findVideoById(videoId)

    if (!currentVideo.endPlaying) {
      firestore.update({
        collection: 'playlist',
        doc: videoId
      }, {
        duration: video.target.getDuration() * 1000,
        endPlaying: currentVideo.startPlaying + (video.target.getDuration() * 1000 * 1000),
      })
    }

    // Seek to current position
    const currentSeek = (new Date() - currentVideo.startPlaying) / 1000
    video.target.seekTo(currentSeek)
  }

  handleOnEnd = video => {
    const { firestore } = this.props

    const videoId = video.target.b.b.videoId

    firestore.delete({
      collection: 'playlist',
      doc: videoId
    })
  }

  handleStateChange = video => {
    const videoId = video.target.b.b.videoId
    const currentVideo = this.findVideoById(videoId)
    const tolerance = 5

    // Seek to current position
    const currentSeek = (new Date() - currentVideo.startPlaying) / 1000

    const seekDiff = video.target.getCurrentTime() - currentSeek
    if (seekDiff < (tolerance * -1) || seekDiff > (tolerance)) {
      video.target.seekTo(currentSeek)
    }
  }

  handleOnPause = video => {
    video.target.playVideo()
  }

  setCurrentVideo = () => {
    const { firestore } = this.props

    if (this.findVideoByStatus('pending')) {
      firestore.update({
        collection: 'playlist',
        doc: this.findVideoByStatus('pending').id
      }, {
        status: 'playing',
        startPlaying: + new Date(),
      })
    }

  }

  findVideoByStatus(status) {
    const { playlist } = this.props
    return playlist.find(video => video.status === status)
  }

  findVideoById(id) {
    const { playlist } = this.props
    return playlist.find(video => video.id === id)
  }

  render () {
    const { playlist } = this.props

    if (!isLoaded(playlist)) {
      return <p>Loading</p>
    } else if (isEmpty(playlist)) {
      return <p>Empty</p>
    }

    const currentVideo = this.findVideoByStatus('playing')

    if (!currentVideo) {
      this.setCurrentVideo()
      return <p>Loading</p>
    }

    return(
      <div className='player-container'>
        {currentVideo && (
          <YouTube
            videoId={currentVideo.id}
            onReady={this.handleOnReady}
            onEnd={this.handleOnEnd}
            onStateChange={this.handleStateChange}
            onPause={this.handleOnPause}
            opts={{
              playerVars: {
                autoplay: 1,
                showInfo: 0,
                // controls: 0,
              }
            }}
          />
        )}
      </div>
    )
  }
}

PlaylistContainer.propTypes = {
	messages: PropTypes.array,
}
const mapStateToProps = (state, props) => {
	return {
		playlist: state.firestore.ordered.playlist,
	}
}

export default compose(
	firestoreConnect([{
    collection: 'playlist',
    orderBy: ['createdDate', 'desc'],
	}]),
	connect(mapStateToProps)
)(PlaylistContainer)
