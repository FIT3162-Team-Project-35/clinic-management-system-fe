import {
  Button,
  Center,
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
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import ApiService from "../services/ApiService";
import { Patient } from "./PatientTable";
import { useDispatch } from "react-redux";
import { addPatients } from "../store/patient.slice";

function Layout({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: {
  input: any;
  previews: any;
  submitButton: any;
  dropzoneProps: any;
  files: any;
  extra: { maxFiles: any };
}) {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

      {files.length > 0 && submitButton}
    </div>
  );
}

function AddPatientButton({ p }: { p: Array<Patient> }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  //   specify upload params and url for your files
  const getUploadParams = ({ meta }: { meta: any }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  // const handleChangeStatus = (
  //   { meta, file }: { meta: any; file: any },
  //   status: any
  // ) => {
  //   console.log(status, meta, file);
  // };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any, allFiles: any) => {
    //console.log(files.map((f: any) => console.log(f)));
    const form = new FormData();
    console.log(files[0]);
    form.append("file", files[0].file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setLoading(true);
    ApiService.post("http://localhost:3001/patient/registration", form, config)
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
    allFiles.forEach((f: any) => f.remove());
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
              {/* <Input ref={initialRef} placeholder="First name" /> */}
              {!loading && (
                <Dropzone
                  LayoutComponent={Layout}
                  getUploadParams={getUploadParams}
                  onSubmit={handleSubmit}
                  accept="image/*,audio/*,video/*"
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
            </FormControl>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddPatientButton;
