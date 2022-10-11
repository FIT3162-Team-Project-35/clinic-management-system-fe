import { StarIcon } from "@chakra-ui/icons";
import { Box, HStack, Image, Badge, Skeleton } from "@chakra-ui/react";

function DataBox({
  patients,
  appointments,
  encounters,
}: {
  patients: Array<any>;
  appointments: Array<any>;
  encounters: Array<any>;
}) {
  const data = {
    noPatient: patients.length,
    noEncounter: encounters.length,
    noAppointment: appointments.length,
  };

  return (
    <HStack>
      <Box border="1px" borderRadius="md">
        <HStack margin={["0.5", "1", "2"]}>
          <div>
            <Box
              color="black"
              fontWeight="bold"
              letterSpacing="wide"
              fontSize={["1xl", "2xl", "3xl"]}
              textTransform="uppercase"
              ml="2"
            >
              {data.noPatient ? (
                data.noPatient
              ) : (
                <Skeleton h="20px" rounded="lg" />
              )}
            </Box>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize={["x-small", "mg", "1.7xl"]}
              textTransform="uppercase"
              ml="2"
            >
              Patients
            </Box>
          </div>
          <Box padding={["0", "2", "4"]} borderRadius="md">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/946/946390.png"
              boxSize={["0", "30px", "50px"]}
            />
          </Box>
        </HStack>
      </Box>
      <Box border="1px" borderRadius="md">
        <HStack margin={["0.5", "1", "2"]}>
          <div>
            <Box
              color="black"
              fontWeight="bold"
              letterSpacing="wide"
              fontSize={["1xl", "2xl", "3xl"]}
              textTransform="uppercase"
              ml="2"
            >
              {data.noEncounter ? (
                data.noEncounter
              ) : (
                <Skeleton h="20px" rounded="lg" />
              )}
            </Box>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize={["x-small", "mg", "1.7xl"]}
              textTransform="uppercase"
              ml="2"
            >
              Encounters
            </Box>
          </div>
          <Box padding={["0", "2", "4"]} borderRadius="md">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2927/2927067.png"
              boxSize={["0", "30px", "50px"]}
            />
          </Box>
        </HStack>
      </Box>
      <Box border="1px" borderRadius="md" padding="-10">
        <HStack margin={["0.5", "1", "2"]}>
          <div>
            <Box
              color="black"
              fontWeight="bold"
              letterSpacing="wide"
              fontSize={["1xl", "2xl", "3xl"]}
              textTransform="uppercase"
              ml="2"
            >
              {data.noAppointment ? (
                data.noAppointment
              ) : (
                <Skeleton h="20px" rounded="lg" />
              )}
            </Box>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize={["x-small", "mg", "1.7xl"]}
              textTransform="uppercase"
              ml="2"
            >
              Appointments
            </Box>
          </div>
          <Box padding={["0", "2", "4"]} borderRadius="md">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1572/1572132.png"
              boxSize={["0", "30px", "50px"]}
            />
          </Box>
        </HStack>
      </Box>
    </HStack>
  );
}
export default DataBox;
