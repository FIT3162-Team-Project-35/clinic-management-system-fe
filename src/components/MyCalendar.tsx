import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Children, cloneElement, useEffect, useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
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
import { useToast } from "@chakra-ui/react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import ApiService from "../services/ApiService";

// import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.

type Event = {
  title: string;
  patientId: string;
  start: Date;
  end: Date;
};
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export function MyCalendar(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEventExist, setIsEventExist] = useState(false);
  const [startEndDate, setStartEndDate] = useState([new Date(), new Date()]);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const toast = useToast();

  const formats = {
    dayFormat: (date: any, culture: any, loca: any) =>
      loca.format(date, "dddd D"),
    weekdayFormat: (date: any, culture: any, loca: any) =>
      loca.format(date, "dddd"),
    agendaDateFormat: (date: any, culture: any, loca: any) =>
      loca.format(date, "dddd D MMMM YYYY"),
  };

  useEffect(() => {
    ApiService.get(`/appointment/`)
      .then((response) => {
        // setLoading(false);
        setEvents(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        //   if (err && err.response) {
        //     console.log(err)
        //   }
      });

    ApiService.get(`/patient`)
      .then((response) => {
        setPatients(response.data);
        setPatientId(response.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    console.log(event);

    setIsEventExist(true);
    setEventId(event.id);
    setPatientId(event.patient.id);
    setEventTitle(event.title);
    setStartEndDate([event.start, event.end]);
    onOpen();

    console.log(isEventExist, eventId, eventTitle, event.start, event.end);
  };

  const onSelectSlot = ({
    action,
    slots /*, ...props */,
  }: {
    action: any;
    slots: any;
  }) => {
    setIsEventExist(false);
    if (action === "click") {
      setEventTitle("");
      setStartEndDate([new Date(), new Date()]);
      onOpen();
    }
    return false;
  };

  const onCalendarEventDoubleClick = (event: any) => {
    console.log(123);
  };

  const handleDelete = () => {
    if (isEventExist) {
      setLoading(true);
      ApiService.delete(
        `https://clinic-management-be.herokuapp.com/appointment/${eventId}`
      )
        .then((response) => {
          onClose();
          console.log("Deleted successfully");
          events.forEach(function (e: any, i) {
            if (e.id === eventId) {
              events.splice(i, 1);
            }
          });
          setLoading(false);
          toast({
            title: "Deleted successfully",
            description: "The selected event is deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = () => {
    console.log(patientId);
    const event: Event = {
      title: eventTitle,
      patientId: patientId,
      start: startEndDate[0],
      end: startEndDate[1],
    };

    if (isEventExist) {
      setLoading(true);
      ApiService.put(
        `https://clinic-management-be.herokuapp.com/appointment/update/${eventId}`,
        event
      )
        .then((response) => {
          onClose();
          console.log("Updated successfully");
          events.forEach(function (e: any, i) {
            if (e.id === eventId) {
              events.splice(i, 1);
              events.push({
                ...event,
                id: eventId,
                patient: { id: patientId },
              } as never);
              toast({
                title: "Updated successfully",
                description: "The selected event is updated.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }
          });
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      onClose();
      ApiService.post(
        "https://clinic-management-be.herokuapp.com/appointment/create",
        event
      )
        .then((response) => {
          console.log(response.data);
          setIsEventExist(true);
          setEventId(response.data.id);
          setEvents([...events, response.data] as never);
          // console.log(event.start.toISOString());
          // console.log(event.end.toISOString());
          toast({
            title: "Created successfully",
            description: "A new event is created.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{eventTitle ? eventTitle : "Add New Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event Title</FormLabel>
              <Input
                placeholder="Event Title"
                defaultValue={eventTitle ? eventTitle : ""}
                onChange={(e) => setEventTitle(e.target.value)}
                // setCurrEvent({...currEvent, title: })
              />
            </FormControl>

            <FormControl>
              <FormLabel>Patient</FormLabel>
              <Select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              >
                {patients.map((p: any) => {
                  return (
                    <option
                      value={p.id}
                    >{`${p.firstName} ${p.lastName}`}</option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start - End (Date Time)</FormLabel>
              <DateTimeRangePicker
                onChange={setStartEndDate}
                value={startEndDate}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {!loading && (
        <Calendar
          components={{
            dateCellWrapper: (props: any) => (
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
          views={["month", "agenda"]}
          selectable
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          onDoubleClickEvent={onCalendarEventDoubleClick}
          style={{ minHeight: 800 }}
        />
      )}

      {loading && (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
    </>
  );
}
