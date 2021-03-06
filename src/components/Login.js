import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'

class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			username: '',
			password: '',
			error: {
				message: '',
			},
		}
	}

	componentDidMount() {
		this.email.focus()
	}

	login() {
		const { email, password } = this.state
		const { firebase } = this.props
		firebase.auth().signInWithEmailAndPassword(email, password)
			.catch(error => {
				if(error) {
					this.setState({error});
					console.log(error)
				}
			})
	}

	render() {
		return (
			<form onSubmit={event => event.preventDefault()}>
				<input
					ref={ ref => this.email = ref}
					type='text'
					placeholder='Email'
					onChange={event => this.setState({ email: event.target.value })}
				/>
				<input
					ref={ ref => this.password = ref}
					type='password'
					placeholder='Password'
					onChange={event => this.setState({ password: event.target.value })}
				/>
				<button
					onClick={() => this.login()}
					type='submit'>
					Iniciar Sesion
				</button>
				<p>{this.state.error.message}</p>
			</form>
		)
	}
}

export default withFirebase(Login)
