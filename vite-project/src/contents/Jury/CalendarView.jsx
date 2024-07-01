import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr'; // Si vous souhaitez utiliser la localisation française

const CalendarView = (props) => {


    const events = props.soutenances.map(soutenance => ({
        title: soutenance.title,
        start: new Date(soutenance.startDate),
        end: new Date(soutenance.endDate),
    }));

    const renderEventsForDay = (day) => {
        const dayEvents = events.filter(event =>
            moment(event.start).isSame(day, 'day')
        );

        return dayEvents.map((event, index) => (
            <div 
                key={index} 
                className={`event ${index % 2 === 0 ? 'event-even' : 'event-odd'}`} 
                onClick={props.handleInfSup(event)}
            >
                <h4>{event.title}</h4>
                <p>{moment(event.start).format('LT')} - {moment(event.end).format('LT')}</p>
            </div>
        ));
    };

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < 5; i++) {
            const day = moment(props.currentStartDate).add(i, 'days');
            days.push(
                <div key={i} className="day-column">
                    <h3>{day.format('dddd, MMMM Do')}</h3>
                    {renderEventsForDay(day)}
                </div>
            );
        }
        return days;
    };

    const handlePrevClick = () => {
        props.setCurrentStartDate(prev => moment(prev).subtract(5, 'days'));
    };

    const handleNextClick = () => {
        props.setCurrentStartDate(prev => moment(prev).add(5, 'days'));
    };

    return (
        <div className="calendar-container">
            <h2 className="calendar-title">Calendrier des Soutenances</h2>
            <div className="calendar-grid">
                {renderDays()}
            </div>
            <div className="calendar-navigation">
                <button onClick={handlePrevClick}>←</button>
                <button onClick={handleNextClick}>→</button>
            </div>
        </div>
    );
};

export default CalendarView;
