import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import React, { useState, useRef } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ type, id }: { type: string; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (type === "encounter") {
      ApiService.delete(`http://localhost:3001/encounter/${id}`)
        .then((response) => {
          onClose();
          navigate("/encounter");
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      ApiService.delete(`http://localhost:3001/patient/${id}`)
        .then((response) => {
          onClose();
          navigate("/patient");
        })
        .catch((err: any) => {
          console.log(err);
        });
    }

    onClose();
  };

  return (
    <>
      <Tooltip label="Delete">
        <LinkIcon
          onClick={() => setIsOpen(true)}
          as={DeleteIcon}
          color={useColorModeValue("gray.900", "white")}
          fontSize={25}
          cursor={"pointer"}
          _hover={{
            bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
          }}
          zIndex={1}
        />
      </Tooltip>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {type}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onSubmit} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
