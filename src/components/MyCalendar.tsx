import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "../common/events";
import { Children, cloneElement } from "react";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export function MyCalendar(props: any) {
  const formats = {
    dayFormat: (date: any, culture: any, loca: any) =>
      loca.format(date, "dddd D"),
    weekdayFormat: (date: any, culture: any, loca: any) =>
      loca.format(date, "dddd"),
    agendaDateFormat: (date: any, culture: any, loca: any) =>
      loca.format(date, "dddd D MMMM YYYY"),
  };

  const TouchCellWrapper = ({
    children,
    value,
    onSelectSlot,
  }: {
    children: any;
    value: any;
    onSelectSlot: any;
  }) =>
    cloneElement(Children.only(children), {
      onTouchEnd: () => onSelectSlot({ action: "click", slots: [value] }),
      style: {
        className: `${children}`,
      },
    });

  const onSelectEvent = (event: any) => {
    alert(event.title);
  };

  const onSelectSlot = ({
    action,
    slots /*, ...props */,
  }: {
    action: any;
    slots: any;
  }) => {
    console.log("onSelectSlot");
    if (action === "click") {
      console.log(slots);
      alert("click");
    }
    return false;
  };
  return (
    <Calendar
      components={{
        dateCellWrapper: (props) => (
          <TouchCellWrapper
            value={undefined}
            {...props}
            onSelectSlot={onSelectSlot}
          />
        ),
      }}
      events={events}
      formats={formats}
      localizer={localizer}
      selectable
      onSelectEvent={onSelectEvent}
      onSelectSlot={onSelectSlot}
      style={{ minHeight: 800 }}
    />
  );
}
