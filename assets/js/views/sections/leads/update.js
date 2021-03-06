import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import Card from '../../components/card';
import axios from 'axios';
import globals from '../../../globals';



class LeadCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			id: null
		};

		this.model = {};

		this.onSubmit = this.onSubmit.bind(this);
	}



	componentDidMount() {
		const self = this;
		const id = self.props.match.params.id;

		axios.get(`${globals.api}/leads/${id}`, {
			name: this.name
		}).then((response) => {
			self.model = response.data;
			self.setState({ modelLoad: true });
		}).catch((error) => {
			console.log(error)
		});
	}



	onSubmit(e) {
		const self = this;
		e.preventDefault();

		axios.patch(`${globals.api}/leads/${self.model.id}`, self.model).then((response) => {
			if(response.status == 200 && response.data.id) {
				self.setState({id: response.data.id});
			}
		});
	}

	

	render() {
		if(this.state.id) {
			return (<Redirect to={`/leads/${this.state.id}`}/>);
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
								<Link to="/leads">Leads</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to={`/leads/${this.model.id}`}>{this.model.name}</Link>
							</li>
							<li className="breadcrumb-item active">Add new lead</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="Lead task" padding={true}>
						<form onSubmit={this.onSubmit}>
							<label htmlFor="dous-name">Name</label>
							<input type="text" className="form-control" id="dous-name" placeholder="Name" required value={this.model.name} onChange={(event) => { this.model.name = event.target.value; this.setState({name: event.target.value}); }} />
							<br/>
							<button type="submit" className="btn btn-primary">Update lead</button>
						</form>
					</Card>
				</div>
			</div>
		</div>);
	}
}


export default LeadCreate;