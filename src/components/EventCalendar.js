import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const EventCalendar = (props) => {
    
    const currentEvents = [...props.events]
    console.log(currentEvents)
    
    return (
    <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"
    events={currentEvents}
    />
    )
}

export default EventCalendar;
