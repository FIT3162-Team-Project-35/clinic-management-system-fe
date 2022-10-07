import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  SimpleGrid,
  Text,
  Box,
  Stack,
  StackDivider,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import ApiService from "../services/ApiService";
import { EditIcon, LinkIcon } from "@chakra-ui/icons";

function EditPatientButton({ patient }: { patient: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [updPatient, setPatient] = useState({ patient });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...updPatient, [e.target.name]: e.target.value });
    console.log(patient);
    console.log(updPatient);
  };
  const handleSubmit = () => {
    ApiService.put(`/patient/update/${patient.id}`, updPatient);
    onClose();
  };

  return (
    <>
      <Tooltip label="Edit">
        <LinkIcon
          onClick={onOpen}
          as={EditIcon}
          color={useColorModeValue("gray.900", "white")}
          fontSize={25}
          cursor={"pointer"}
          _hover={{
            bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
          }}
          zIndex={1}
        />
      </Tooltip>
      {/* <Button
        float={"right"}
        mr={5}
        bgColor={"blue.400"}
        color={"white"}
        _hover={{ bg: "blue.600" }}
        onClick={onOpen}
      >
        Edit Patient
      </Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"xl"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Patients</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <SimpleGrid>
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={"column"}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                      />
                    }
                  >
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={useColorModeValue("blue.500", "blue.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Patient Info
                      </Text>
                      <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          name="firstName"
                          ref={initialRef}
                          placeholder="First name"
                          defaultValue={patient.firstName}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>LastName</FormLabel>
                        <Input
                          name="lastName"
                          ref={initialRef}
                          placeholder="Last Name"
                          defaultValue={patient.lastName}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Gender</FormLabel>
                        <Input
                          name="gender"
                          placeholder="Gender"
                          defaultValue={patient.gender}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Contact Number</FormLabel>
                        <Input
                          name="contactNumber"
                          placeholder="Contact Number"
                          defaultValue={patient.contactNumber}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input
                          name="dob"
                          placeholder="Date of Birth"
                          defaultValue={patient.dob}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Address</FormLabel>
                        <Input
                          name="address"
                          placeholder="Address"
                          defaultValue={patient.address}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>City</FormLabel>
                        <Input
                          name="city"
                          placeholder="City"
                          defaultValue={patient.city}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Post Code</FormLabel>
                        <Input
                          name="postcode"
                          placeholder="Post Code"
                          defaultValue={patient.postcode}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={useColorModeValue("blue.500", "blue.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Emergency Contact
                      </Text>
                      <FormControl mt={4}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          name="emergencyFirstName"
                          placeholder="Emergency Contact First Name"
                          defaultValue={patient.emergencyFirstName}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Full Name</FormLabel>
                        <Input
                          name="emergencyLastName"
                          placeholder="Emergency Contact Last Name"
                          defaultValue={patient.emergencyLastName}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Contact Number</FormLabel>
                        <Input
                          name="emergencyContact"
                          placeholder="Contact Number"
                          defaultValue={patient.emergencyContact}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Relationship</FormLabel>
                        <Input
                          name="emergencyRelationship"
                          placeholder="Relationship"
                          defaultValue={patient.emergencyRelationship}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={useColorModeValue("blue.500", "blue.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Medical Info
                      </Text>
                      <FormControl mt={4}>
                        <FormLabel>Medical Details</FormLabel>
                        <Input
                          name="medicalDetails"
                          placeholder="Medical Details"
                          defaultValue={patient.medicalDetails}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Allergy Detail</FormLabel>
                        <Input
                          name="allergicDetails"
                          placeholder="Allergy Details"
                          defaultValue={patient.allergicDetails}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>
              </SimpleGrid>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditPatientButton;
