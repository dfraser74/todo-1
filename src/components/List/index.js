import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { css } from 'glamor';

import addListIcon from 'src/assets/add-list.svg';
import listIcon from 'src/assets/list.svg';

import { uuid } from 'src/utils';

const styles = {
  list: css({
    listStyle: 'none',
    padding: 0,
    '& li': {
      textAlign: 'left'
    },
    '& a': {
      padding: '8px',
      height: '30px',
      lineHeight: '30px',
      display: 'flex',
      '&.active': {
        background: 'purple'
      }
    },
    '& span': {
      marginLeft: '8px'
    },
    '& img': {
      width: '30px'
    }
  })
};

export default class List extends Component {
  state = {
    collection: []
  };

  newTodoId = null;

  componentDidMount() {
    this.props.listStore.onChange(collection => this.setState({ collection }));
  }

  createNewTodo = () => {
    this.props.listStore.save({ id: this.newTodoId }) &&
      this.props.toggleSidebar();
  };

  render() {
    this.newTodoId = uuid();

    return (
      <nav>
        <ul {...styles.list}>
          {this.state.collection.map(({ id, label }) => (
            <li key={id}>
              <NavLink onClick={this.props.toggleSidebar} to={`/list/${id}`}>
                <img src={listIcon} alt="List" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink onClick={this.createNewTodo} to={`/list/${this.newTodoId}`}>
              <img src={addListIcon} alt="Add list" />
              <span>Create new List</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}