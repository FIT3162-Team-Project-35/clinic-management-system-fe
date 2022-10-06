import {
  Table as ChakraTable,
  Text,
  Thead,
  Tbody,
  Box,
  Link,
  Tag,
  Td,
  Th,
  Tr,
  Stack,
  IconButton,
  useDisclosure,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  MinusIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import {
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { HTMLProps, useState, useRef, useEffect, Fragment } from "react";
import { format } from "date-fns";
import Card from "./Card";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import { changeDatetoTZ } from "../common/utils";
import { Patient } from "./PatientTable";

interface Data {
  status: boolean;
  name: string;
  id: string;
}

export interface Encounter {
  diagnosis: string;
  additionalNotes: string;
  serviceDate: string;
  nextAppointment: string;
  doctor: string;
  patient: Patient;
  createdAt: Date;
  updatedAt: Date;
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

const TableLoading = ({ columnsToLoad = 1, rowsToLoad = 1 }: any) => {
  const columns = new Array(columnsToLoad).fill(1);
  const rows = new Array(rowsToLoad).fill(1);
  return (
    <>
      {rows.map((_, index) => (
        <Tr key={index}>
          <Td>
            {" "}
            <Skeleton h="25px" rounded="lg" />
          </Td>

          {columns.map((_, index) => (
            <Td key={index}>
              <Skeleton h="25px" rounded="lg" />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
};

export default function EncounterTable({ encounters }: { encounters: any }) {
  const defaultData: Encounter[] = encounters;
  const columns: ColumnDef<Encounter>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <IndeterminateCheckbox
    //       {...{
    //         checked: table.getIsAllRowsSelected(),
    //         indeterminate: table.getIsSomeRowsSelected(),
    //         onChange: table.getToggleAllRowsSelectedHandler(),
    //       }}
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="px-1">
    //       <IndeterminateCheckbox
    //         {...{
    //           checked: row.getIsSelected(),
    //           indeterminate: row.getIsSomeSelected(),
    //           onChange: row.getToggleSelectedHandler(),
    //         }}
    //       />
    //     </div>
    //   ),
    // },
    {
      header: () => <span>Patient Name</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
      id: "fullName",
      accessorFn: (row) => `${row.patient.firstName} ${row.patient.lastName}`,
    },
    {
      header: () => <span>Service Date</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
      id: "serviceDate",
      accessorFn: (row) =>
        `${format(new Date(row.serviceDate), "dd/MM/yyyy hh:mm bbb")}`,
    },
    {
      header: () => <span>Diagnosed by</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
      id: "doctor",
      accessorFn: (row) => `${row.doctor}`,
    },
    {
      header: () => <span>Created At</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
      id: "createdAt",
      accessorFn: (row) => `${format(new Date(row.createdAt), "dd/MM/yyyy")}`,
    },
    {
      header: () => <span>Last Updated</span>,
      footer: (info) => info.column.id,
      cell: (info) => info.getValue(),
      id: "updatedAt",
      accessorFn: (row) =>
        `${format(new Date(row.updatedAt), "dd/MM/yyyy hh:mm bbb")}`,
    },
  ];

  return (
    <>
      <Table
        {...{
          data: defaultData,
          columns,
        }}
      />
      <hr />
    </>
  );
}

function Table({ data, columns }: { data: any; columns: ColumnDef<any>[] }) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const onRowClick = (index: number, data: Data[]) => {
    console.log(data[index]);
    navigate(`/encounter/${data[index].id}`);
  };

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: { sorting, rowSelection },
  });

  return (
    <Box padding={"20px"}>
      
      <Card title={"Encounters Table"}>
        <Box overflowX="scroll">
        <ChakraTable colorScheme="blue" size="md">
          <Thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <Tr key={headerGroup.id}>
                <Th>#</Th>

                {headerGroup.headers.map((header: any) => (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.id === "select" &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    {!header.isPlaceholder && header.id !== "select" && (
                      <Box
                        onClick={header.column.getToggleSortingHandler()}
                        cursor="pointer"
                      >
                        <Stack
                          alignItems="center"
                          direction={"row"}
                          spacing={2}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {
                            {
                              asc: <TriangleUpIcon />,
                              desc: <TriangleDownIcon />,
                              false: <MinusIcon />,
                            }[`${header.column.getIsSorted()}` as string]
                          }
                        </Stack>
                      </Box>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {loading ? (
              <TableLoading columnsToLoad={5} rowsToLoad={10} />
            ) : (
              <>
                {table.getRowModel().rows.map((row: any, index: number) => (
                  // <Link as={RouterLink} to={`patient/${data[index]}`}>
                  <Tr
                    key={row.id}
                    onClick={() => onRowClick(index, data)}
                    _hover={{
                      cursor: "pointer",
                      bg: "blue.200",
                      rounded: "md",
                    }}
                  >
                    <Td key={index}>{index + 1}</Td>
                    {row.getVisibleCells().map((cell: any) => (
                      <>
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      </>
                    ))}
                  </Tr>
                  // </Link>
                ))}
              </>
            )}
          </Tbody>
        </ChakraTable>
        </Box>
      </Card>
      <br />
      <br />

      <div className="h-2" />
      
      <Center className="flex items-center gap-2">
      <Box overflowX="scroll">
        <HStack>
          <IconButton
            colorScheme="blue"
            aria-label="Most Previous Page"
            icon={<ArrowLeftIcon w={"2"} h={"2"} />}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            size="md"
          />
          <IconButton
            colorScheme="blue"
            aria-label="Previous Page"
            icon={<ChevronLeftIcon />}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Next Page"
            icon={<ChevronRightIcon />}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Most Previous Page"
            icon={<ArrowRightIcon w={"2"} h={"2"} />}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            size="md"
          />

          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <NumberInput
              size="sm"
              maxW={16}
              defaultValue={table.getState().pagination.pageIndex + 1}
              value={table.getState().pagination.pageIndex + 1}
              min={1}
              max={table.getPageCount()}
              onChange={(val: any) => {
                const page = val ? val - 1 : 0;
                table.setPageIndex(page);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {/* <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              /> */}
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

          {/* {JSON.stringify(patients)} */}
        </HStack>
        </Box>
      </Center>
      
    </Box>
  );
}
