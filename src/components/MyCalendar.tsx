import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "../common/events";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export function MyCalendar(props: any) {
  return (
    <div className="myCustomHeight" style={{ height: 700 }}>
      <Calendar
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
