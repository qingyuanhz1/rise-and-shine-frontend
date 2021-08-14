import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewEventForm.css';

const NewEventForm = (props) => {
    const [eventForm, setEventForm] = useState({
        summary: '',
        start:{
            dateTime: ''
        },
        end: {
            dateTime: ''
        }
    });

    const onSummaryChange = (event) => {
        setEventForm({
            ...eventForm,
            summary: event.target.value
        })
    };

    const onStartChange = (event) => {
        setEventForm({
            ...eventForm,
            start: {
                dateTime:event.target.value
            }
        })
    };

    const onEndChange = (event) => {
        setEventForm({
            ...eventForm,
            end: {
                dateTime:event.target.value
            }
        })
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        props.createNewEvent({
            summary: eventForm.summary,
            start: {
                dateTime:eventForm.start.dateTime
            },
            end: {
                dateTime:eventForm.end.dateTime
            }
        })

        setEventForm({
        summary: '',
        start:{
            dateTime: ''
        },
        end: {
            dateTime: ''
        }
        })
    }

    return (
        <form onSubmit={onFormSubmit}>
            <div className='fieldItself'>
                <label>Summary</label> 
                <input
                    value={eventForm.summary}
                    onChange={ onSummaryChange }
                    className={(eventForm.summary.length === 0)? 'invalid-form-input' : ''}
                />
            </div>
            <div className='fieldItselfs'>
                <label>Start Date And Time</label> 
                <input
                    value={eventForm.start.dateTime}
                    onChange={ onStartChange }
                    className={(eventForm.start.dateTime.length === 0)? 'invalid-form-input' : ''}
                />
            </div>
            <div className='fieldItselfs'>
                <label>End Date And Time</label> 
                <input
                    value={eventForm.end.dateTime}
                    onChange={ onEndChange }
                    className={(eventForm.end.dateTime.length === 0)? 'invalid-form-input' : ''}
                />
            </div>
            <input className='fieldPrompt'
                type="submit"
                value="Add The Event"
                disabled={((eventForm.summary.length === 0) || (eventForm.start.dateTime.length === 0)) || (eventForm.end.dateTime.length === 0)}
            />
        </form>
    );
};

export default NewEventForm;
