import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment';

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
            const m = moment(event.start)
            console.log(m)
            recurringEvent.startTime = m.format('YYYYMMDD[T]HHmmss')
            console.log(recurringEvent.startTime)
            recurringEvent.endTime = event.end
            recurringEvent.rrule = `DTSTART:${recurringEvent.startTime}\n${event.recurrence.replace('Z;', ';')}`
            console.log(recurringEvent.rrule)
            organizedEvents.push(recurringEvent)
        }
    }

    return (
    <FullCalendar
    plugins={[ dayGridPlugin,  rrulePlugin]}
    initialView="dayGridMonth"
    events={organizedEvents}
    />
    )
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
    //     events={[
    //         {
    //             title: 'my recurring event 1',
    //             // startTime: '10:30:000',
    //             // endTime: '11:30:000',
    //             rrule: 'DTSTART:20210810T103000\nRRULE:FREQ=WEEKLY;UNTIL=20210910;BYDAY=TU,TH'
    //         },
    //         {
    //             title: 'my recurring event 2',
    //             rrule: 'DTSTART:20210727T110000\nRRULE:FREQ=WEEKLY;WKST=SU;UNTIL=20210819;BYDAY=MO,TH,TU,WE'
    //         },
    //         { title: 'event 3', date: '2021-08-12' },
    //     ]}
    //     />
    // )
}

export default EventCalendar;
