import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import Card from '../../components/card';
import axios from 'axios';
import _ from 'lodash';
import globals from '../../../globals';



class TaskUpdate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			id: null,
			refreshId: '0'
		};

		this.model = {};

		this.onSubmit = this.onSubmit.bind(this);
	}



	componentDidMount() {
		const self = this;
		const id = self.props.match.params.id;

		axios.get(`${globals.api}/tasks/${id}`, {
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

		axios.patch(`${globals.api}/tasks/${self.model.id}`, self.model).then((response) => {
			if(response.status == 200 && response.data.id) {
				self.setState({id: response.data.id});
			}
		});
	}

	

	render() {
		if(this.state.id) {
			return (<Redirect to={`/tasks/${this.state.id}`}/>);
		}

		//TODO change to ref inputs see: https://reactjs.org/docs/uncontrolled-components.html

		return (<div className="container">
			<div className="row mt-3">
				<div className="col-12">
					<nav aria-label="breadcrumb" role="navigation">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to="/tasks">Tasks</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to={`/tasks/${this.model.id}`}>{this.model.name}</Link>
							</li>
							<li className="breadcrumb-item active">Add new task</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="Add task" padding={true}>
						<form onSubmit={this.onSubmit}>
							<label htmlFor="dous-name">Name</label>
							<input type="text" className="form-control" id="dous-name" placeholder="Name" required value={this.model.name || ''} onChange={(event) => { this.model.name = event.target.value; }} />
							<label htmlFor="dous-enddate">End date</label>
							<input type="date" className="form-control" id="dous-enddate" placeholder="Date" value={(this.model.endDate) ? this.model.endDate.substr(0,10) : ''} onChange={(event) => { this.model.endDate = event.target.value; }} />
							<label htmlFor="dous-description">Description</label>
							<textarea className="form-control" id="dous-description" placeholder="Description" value={this.model.description} onChange={(event) => {
									this.model.description = event.target.value;
									this.setState({refreshId: _.uniqueId('refresh')});
								}}></textarea>
							<br/>
							<button type="submit" className="btn btn-primary">Update Task</button>
						</form>
					</Card>
				</div>
			</div>
		</div>);
	}
}


export default TaskUpdate;