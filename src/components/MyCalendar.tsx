import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "../common/events";
import { Children, cloneElement, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.

type Event = {
  title: string;
  start: Date;
  end: Date;
};
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export function MyCalendar(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currEvent, setCurrEvent] = useState({} as Event);
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
    // alert(event.title);
    console.log(event);
    setCurrEvent(event);
    onOpen();
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
      setCurrEvent({} as Event);
      onOpen();
    }
    return false;
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currEvent.title ? currEvent.title : "Add New Event"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
    </>
  );
}
