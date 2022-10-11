import {
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import ApiService from "../services/ApiService";
import { Patient } from "./PatientTable";
import { useDispatch } from "react-redux";
import { Encounter } from "./EncounterTable";
import { addEncounters } from "../store/encounter.slice";
import { useFileUpload } from "use-file-upload";

function AddEncounterButton({
  e,
  p,
}: {
  e: Array<Encounter>;
  p: Array<Patient>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  const [diagnosis, setDiagnosis] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [doctor, setDoctor] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [nextAppointmentDate, setAppointmentDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [files, setFiles] = useState([]);
  const [file, selectFile] = useFileUpload();

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleFileSubmit = (files: any) => {
    const form = new FormData();
    // form.append("file", files[0]);
    form.append("file", file["file"]);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setLoading(true);
    ApiService.post(
      "https://clinic-management-be.herokuapp.com/encounter/recognition",
      form,
      config
    )
      .then((response) => {
        const newEncounter = {
          diagnosis: response.data.diagnosis,
          additionalNotes: response.data.additionalNotes,
          serviceDate: response.data.serviceDate,
          nextAppointment: response.data.nextAppointment,
          patient: response.data.patient,
          doctor: response.data.doctor,
        };

        setDiagnosis(newEncounter.diagnosis);
        setAdditionalNotes(newEncounter.additionalNotes);
        setServiceDate(newEncounter.serviceDate);
        setAppointmentDate(newEncounter.nextAppointment);
        setDoctor(newEncounter.doctor);

        p.forEach((patient) => {
          if (
            patient.firstName === newEncounter.patient.firstName &&
            patient.lastName === newEncounter.patient.lastName
          ) {
            setPatientId(patient.id);
          }
        });

        setLoading(false);
        toast({
          title: "Recognized Diagnosis Form",
          description:
            "You may view the info were inserted into the relative fields.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Error Occurs Adding Encounters",
          description: "Please inform the technician of this issue",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  const handleFormSubmit = async () => {
    const newEncounter = {
      diagnosis: diagnosis,
      additionalNotes: additionalNotes,
      serviceDate: serviceDate,
      nextAppointment: nextAppointmentDate,
      patientId: patientId ? patientId : p[0].id,
      doctor: doctor,
    };

    setLoading(true);
    await ApiService.post(
      "https://clinic-management-be.herokuapp.com/encounter/create",
      newEncounter
    )
      .then((response) => {
        const newEncounters = [...e, response.data];
        dispatch(addEncounters(newEncounters));

        toast({
          title: "Created successfully",
          description: "A new encounter is created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        onClose();
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        toast({
          title: "Error Occurs Adding Encounters",
          description: "Please inform the technician of this issue",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      });

    setDiagnosis("");
    setAdditionalNotes("");
    setServiceDate("");
    setAppointmentDate("");
    setDoctor("");
  };

  return (
    <>
      <Button
        float={"right"}
        mr={5}
        bgColor={"blue.400"}
        color={"white"}
        _hover={{ bg: "blue.600" }}
        onClick={onOpen}
      >
        Add Encounter
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Encounters</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              {/* <Input ref={initialRef} placeholder="First name" /> */}
              {!loading && (
                <>
                  {/* <Dropzone
                    accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
                    onDrop={handleDrop}
                  >
                    {({ getRootProps, getInputProps, open }) => (
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Drag'n'drop files, or click to select files</p>
                        <button type="button" onClick={open}>
                          Press to Upload
                        </button>
                      </div>
                    )}
                  </Dropzone>
                  <div>
                    <strong>Files:</strong>
                    <ul>
                      {files.map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  </div> */}
                  {/* new file upload */}
                  <div>
                    <Center>
                      <Button
                        onClick={() => {
                          // Single File Upload accepts only images
                          selectFile(
                            { accept: "image/*" } as any,
                            ({
                              source,
                              name,
                              size,
                              file,
                            }: {
                              source: any;
                              name: any;
                              size: any;
                              file: any;
                            }) => {
                              // file - is the raw File Object
                              console.log({ source, name, size, file });
                              // Todo: Upload to cloud.
                            }
                          );
                        }}
                      >
                        Click to Upload
                      </Button>
                    </Center>
                    <br />
                    {file ? (
                      <div>
                        <Center>
                          <img
                            className="img-upload"
                            src={file["source"]}
                            alt="preview"
                          />
                        </Center>
                        <span> Name: {file["name"]} </span>
                        <span> Size: {file["size"]} </span>
                      </div>
                    ) : (
                      <span>No file selected</span>
                    )}
                  </div>
                  <br />
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => handleFileSubmit(files)}
                    size={"sm"}
                  >
                    Recognize
                  </Button>{" "}
                  <br />
                  <Divider orientation="horizontal" mt={2} mb={2} />{" "}
                  <FormControl>
                    <FormLabel>Diagnosis: </FormLabel>
                    <Textarea
                      placeholder="Patient Diagnosis"
                      defaultValue={diagnosis ? diagnosis : ""}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Additional Notes: </FormLabel>
                    <Textarea
                      placeholder="Additional Notes"
                      defaultValue={additionalNotes ? additionalNotes : ""}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Patient</FormLabel>
                    <Select
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                    >
                      {p.map((patient: any) => {
                        return (
                          <option
                            value={patient.id}
                          >{`${patient.firstName} ${patient.lastName}`}</option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Doctor: </FormLabel>
                    <Input
                      placeholder="Doctor"
                      defaultValue={doctor ? doctor : ""}
                      onChange={(e) => setDoctor(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Service Date: </FormLabel>
                    <Input
                      placeholder="Service Date"
                      defaultValue={serviceDate ? serviceDate : ""}
                      onChange={(e) => setServiceDate(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Next Appointment Date: </FormLabel>
                    <Input
                      placeholder="Next Appointment Date"
                      defaultValue={
                        nextAppointmentDate ? nextAppointmentDate : ""
                      }
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </FormControl>
                </>
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddEncounterButton;
