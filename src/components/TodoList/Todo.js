import React, { Component } from 'react';
import { observer } from "mobx-react";
import { css } from 'glamor';

import Checkmark from './Checkmark';
import {Input} from 'src/components/Misc';
import deleteIcon from 'src/assets/delete.svg';


const styles = {
  container: css({
    display: 'flex',
    justifyItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '5px',
    '& img': {
      opacity: 0.8,
      pointerEvents: 'none'
    },
    ':hover': {
      '& img': {
        opacity: 1,
        pointerEvents: 'initial'
      }
    },
    '& div': {
      margin: '10px'
    },
    '& input, & span': {
      color: '#ffffff',
      background: 'transparent',
      border: 'none',
      width: '100%',
      padding: '.8rem 1.0rem',
      textAlign: 'left'
    },
    '& input:focus': {
      outline: 'none',
      caretColor: '#0cc10c'
    }
  }),
  content: done =>
    css({
      position: 'relative',
      opacity: done ? 0.5 : 1,
      width: '100%',
      textAlign: 'left',
      ':after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: '100%',
        height: '2px',
        top: '48%',
        borderRadius: '1px',
        background: '#cb3066',
        transformOrigin: done ? 'center left' : 'center right',
        transform: done ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.5s cubic-bezier(0.55, 0, 0.1, 1)'
      }
    }),
  delete: css({
    cursor: 'pointer',
    alignSelf: 'end'
  })
};

 class Todo extends Component {
  state = {
    editing: false
  };

  touchId = 0;

  toggle = () => this.props.toggleDone(this.props.todo.id);

  remove = () => this.props.removeTodo(this.props.todo.id);

  toggleEdit = () => this.setState({ editing: !this.state.editing });

  handleSubmit = (value, success) => {
    if (success) {
      this.props.updateTodo(this.props.todo.id, { value });
    }
    this.toggleEdit();
  };

  handleTouchStart = (e) => {
    if(e.touches.length === 1) {
      this.touchId = setTimeout(() => {
        this.toggleEdit();
      }, 400);
      //this.setState({ editing: false});
      //this.touchStart = Date.now();
    }
  }

  handleTouchEnd = () => {
   clearTimeout(this.touchId);
  };

  render() {
    const { done, value } = this.props.todo;
    return (
      <article {...styles.container}>
        <div onClick={this.toggle}>
          <Checkmark checked={done} />
        </div>
        {this.state.editing ? (
          <Input
            handleSubmit={this.handleSubmit}
            initialValue={this.props.todo.value}
          />
        ) : (
          <div
              {...styles.content(done)}
              onDoubleClick={this.toggleEdit}
              onTouchStart={this.handleTouchStart}
              onTouchEnd={this.handleTouchEnd}
            >
              {value}
          </div>
        )}
        <div>
          <img src={deleteIcon} alt="delete" onClick={this.remove} />
        </div>
      </article>
    );
  }
}

export default observer(Todo);
