import {
  Button,
  Center,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { Patient } from "./PatientTable";
import { useDispatch } from "react-redux";
import { addPatients } from "../store/patient.slice";
import Dropzone from "react-dropzone";
import "../App.css";

function AddPatientButton({ p }: { p: Array<Patient> }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any) => {
    const form = new FormData();
    form.append("file", files[0]);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setLoading(true);
    ApiService.post(
      "https://clinic-management-be.herokuapp.com/patient/registration",
      form,
      config
    )
      .then((response) => {
        const newP = {
          address: response.data.address,
          allergicDetails: response.data.allergicDetails,
          city: response.data.city,
          contactNumber: response.data.contactNumber,
          createdAt: response.data.createdAt,
          dob: response.data.dob,
          emergencyContact: response.data.emergencyContact,
          emergencyFirstName: response.data.emergencyFirstName,
          emergencyLastName: response.data.emergencyLastName,
          emergencyRelationship: response.data.emergencyRelationship,
          firstName: response.data.firstName,
          gender: response.data.gender,
          id: response.data.id,
          lastName: response.data.lastName,
          medicalDetails: response.data.medicalDetails,
          postcode: response.data.postcode,
          updatedAt: response.data.updatedAt,
        };
        const newPatients = [...p, newP];
        dispatch(addPatients(newPatients));
        setLoading(false);
        toast({
          title: "Added Patients",
          description: "You may refresh the page to view the new records now.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log(response.data);
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Error Occurs Adding Patients",
          description: "Please inform the technician of this issue",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(err);
      });
    setFiles([]);
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
        Add Patient
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Patients</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              {!loading && (
                <>
                  <Dropzone
                    // accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
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
                  </div>
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
            <Button
              onClick={() => handleSubmit(files)}
              colorScheme="blue"
              mr={3}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddPatientButton;
