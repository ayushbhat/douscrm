import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import Card from '../../components/card';
import axios from 'axios';
import globals from '../../../globals';



class ContactCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			id: null
		}

		this.onSubmit = this.onSubmit.bind(this);
	}



	onSubmit(e) {
		const self = this;
		e.preventDefault();

		axios.post(`${globals.api}/contacts`, {
			name: self.state.name
		}).then((response) => {
			if(response.status == 200 && response.data.id) {
				self.setState({id: response.data.id});
			}
		});
	}

	

	render() {
		if(this.state.id) {
			return (<Redirect to={`/contacts/${this.state.id}`}/>);
		}

		return (<div className="container">
			<div className="row mt-3">
				<div className="col-12">
					<nav aria-label="breadcrumb" role="navigation">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to="/contacts">Contacts</Link>
							</li>
							<li className="breadcrumb-item active">Add new contact</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="Add contact" padding={true}>
						<form onSubmit={this.onSubmit}>
							<label htmlFor="dous-name">Name</label>
							<input type="text" className="form-control" id="dous-name" placeholder="Name" required value={this.state.name} onChange={(event) => { this.setState({name: event.target.value}); }} />
							<br/>
							<button type="submit" className="btn btn-primary">Add contact</button>
						</form>
					</Card>
				</div>
			</div>
		</div>);
	}
}


export default ContactCreate;