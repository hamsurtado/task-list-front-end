import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const INITIAL_TASK = {
    description: "",
    is_complete: false,
    title: ""
};

const NewTaskForm = ({addTask}) => {
    const [formTask, setFormTask] = useState(INITIAL_TASK);

    const handleChange = (event) => {
        const newFormTasks = {
            ...formTask,
            [event.target.name]: event.target.value
        };
        console.log(event.target);
        setFormTask(newFormTasks);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTask(formTask);
        setFormTask(INITIAL_TASK);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Task Title</label>
            <input
                required
                type="text"
                id="title"
                name="title"
                value={formTask.title}
                onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <input
                required
                type="text"
                id="description"
                name="description"
                value={formTask.description}
                onChange={handleChange}
            />
            <input type="submit" value="submit"/>
        </form>
    )
};

NewTaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
  };

export default NewTaskForm;
