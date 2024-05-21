"use client"
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/inter/read");
      console.log(response.data)
      const formattedEvents = response.data.map(event => ({
        id: event._id,
        title: event.candiname,
        start: new Date(`${event.slo.date}T${event.slo.startTime}`),
        end: new Date(`${event.slo.date}T${event.slo.endTime}`),
        interviewer: event.slo.interviewer,
        status: event.status,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNavigate = (action:any) => {
    switch (action) {
      case "PREV":
        setCalendarDate(prevDate => moment(prevDate).subtract(1, 'months').toDate());
        break;
      case "NEXT":
        setCalendarDate(prevDate => moment(prevDate).add(1, 'months').toDate());
        break;
      case "TODAY":
        setCalendarDate(new Date());
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <Sidenavbar />
      </div>

      <div className="p-4 sm:ml-64">
        <div className="p-4 lg:border-2 xs:border-none border-gray-200 lg:border-dashed xs:border-none rounded-lg dark:border-gray-700">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            date={calendarDate}
            onNavigate={date => setCalendarDate(date)}
            style={{ height: 500 }}
            components={{
              toolbar: props => (
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <button onClick={() => handleNavigate("PREV")}>Previous</button>
                    <button onClick={() => handleNavigate("TODAY")} className="mx-4">Today</button>
                    <button onClick={() => handleNavigate("NEXT")}>Next</button>
                  </div>
                  <div>
                    <span>{moment(calendarDate).format('MMMM YYYY')}</span>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
