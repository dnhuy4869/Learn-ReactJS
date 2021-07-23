import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import React, { Component } from 'react';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: '',
        value: 1
      }
    }
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });
    }
  }

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID = () => {
    return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  onTogglForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
      taskEditing: null
    })
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: null
    })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks
    });

    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }

  onSort = (sort) => {
    this.setState({
      sort: sort
    });
  }

  render() {
    var { tasks, isDisplayForm, taskEditing, filter, keyword, sort } = this.state; // var tasks = this.state.tasks
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }

      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if (sort.by === 'name') {
      tasks = tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else if(sort.by === 'status') {
      tasks = tasks.sort((a, b) => {
        if (a.status > b.status) return sort.value;
        else if (a.status < b.status) return -sort.value;
        else return 0;
      });
    }

    var elmTaskForm = isDisplayForm
      ? <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        taskEditing={taskEditing}
      />
      : '';

    return (
      <div className="container" >
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onTogglForm}
            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <div className="row mt-15">
              <Control
                onSearch={this.onSearch}
                onSort={this.onSort}
              >
                </Control>
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
