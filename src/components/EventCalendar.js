import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

const EventCalendar = (props) => {
    
    const allEvents = [...props.events]
    console.log(allEvents)
    
    let organizedEvents = []
    for (const event of allEvents) {
        if (event.recurrence === null) {
            organizedEvents.push(event)
        } else {
            let recurringEvent = {} 
            recurringEvent.title = event.title
            const mStart = moment(event.start)
            recurringEvent.startTime = mStart.format('YYYYMMDD[T]HHmmss')
            const mEnd = moment(event.end)
            const duration = moment.duration(mEnd.diff(mStart)).as('minutes')
            const reformatDuration = moment.duration(duration,'minutes').format("hh:mm", {trim:false})
            recurringEvent.duration = reformatDuration
            recurringEvent.rrule = `DTSTART:${recurringEvent.startTime}\n${event.recurrence.replace('Z;', ';')}`
            organizedEvents.push(recurringEvent)
        }
    }
    
    if (organizedEvents.length === 0) {
        return <div/>
    } else {
        return (
            <FullCalendar
            plugins={[ dayGridPlugin,  rrulePlugin]}
            initialView="dayGridMonth"
            showNonCurrentDates={false}
            displayEventEnd={true}
            displayEventTime={true}
            events={organizedEvents}
            />
            )
    }
    // return (
    //     <FullCalendar
    //     plugins={[ dayGridPlugin,  rrulePlugin]}
    //     initialView="dayGridMonth"
    //     events={allEvents}
    //     />
    //     )
    // return (
    //     <FullCalendar
    //     plugins={[ dayGridPlugin, rrulePlugin]}
    //     initialView="dayGridMonth"
    //     events={[
    //         {
    //             title: 'my recurring event',
    //             daysOfWeek: [2,4], 
    //             startTime: '10:30:000',
    //             endTime: '11:30:000',
    //             startRecur: '2021-08-10',
    //             endRecur: '2021-09-10'
    //         }
    //     ]}
    //     />
    // )
    // return (
    //     <FullCalendar
    //     plugins={[ dayGridPlugin, rrulePlugin]}
    //     initialView="dayGridMonth"
    //     displayEventEnd="true"
    //     displayEventTime="true"
    //     events={[
    //         {
    //             title: 'my recurring event 1',
    //             duration: "01:00",
    //             rrule: 'DTSTART:20210810T103000\nRRULE:FREQ=WEEKLY;UNTIL=20210910;BYDAY=TU,TH'
    //         },
    //         {
    //             title: 'my recurring event 2',
    //             duration: "00:20",
    //             rrule: 'DTSTART:20210727T110000\nRRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20210819;BYDAY=MO,TH,TU,WE'
    //         },
    //         { title: 'event 3', date: '2021-08-12' },
    //     ]}
    //     />
    // )
}

export default EventCalendar;
