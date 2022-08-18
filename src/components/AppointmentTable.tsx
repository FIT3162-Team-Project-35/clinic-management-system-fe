import {
    Table as ChakraTable,
    Text,
    Thead,
    Tbody,
    Box,
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
  import { HTMLProps, useState, useRef, useEffect } from "react";
  import customData from "../../appointmentsData.json";
  import Card from "./Card";
  
  interface Data {
    status: boolean;
    name: string;
    id: string;
    date : string;
    time : string;
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
  
  export default function AppointmentsTable() {
    const defaultData: Data[] = customData;
    const columns: ColumnDef<Data>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: () => <span>Id</span>,
        footer: (info) => info.column.id,
        cell: (info) => info.getValue(),
        accessorKey: "id",
        id: "patientId",
      },
      {
        header: () => <span>Patient Name</span>,
        footer: (info) => info.column.id,
        cell: (info) => info.getValue(),
        accessorKey: "name",
        id: "patientname",
      },
      {
        footer: (info) => info.column.id,
        header: () => "Status",
        accessorKey: "status",
        id: "status",
        cell: (info) => (
          <Tag colorScheme={info.getValue() ? "green" : "red"}>
            {info.getValue() ? "Complete" : "Pending"}
          </Tag>
        ),
      },
      {
        footer: (info) => info.column.id,
        header: () => <span>Date</span>,
        accessorKey: "date",
        id: "date",
        cell: (info) => info.getValue()
      },
      {
        footer: (info) => info.column.id,
        header: () => <span>Time</span>,
        accessorKey: "time",
        id: "time",
        cell: (info) => info.getValue()
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
    const { onToggle, isOpen } = useDisclosure();
    const [selectedDataIndex, setSelectedDataIndex] = useState(0);
    const [loading, setLoading] = useState(true);
  
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  
    const onRowClick = (index: number) => {
      setSelectedDataIndex(index);
      onToggle();
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
        <Card title={"Patients Table"}>
          <ChakraTable colorScheme="blue" size="md">
            <Thead>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <Tr key={headerGroup.id}>
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
                    <Tr
                      key={row.id}
                      onClick={() => onRowClick(index)}
                      _hover={{
                        cursor: "pointer",
                        bg: "blue.200",
                        rounded: "md",
                      }}
                    >
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
                  ))}
                </>
              )}
            </Tbody>
          </ChakraTable>
        </Card>
        <br />
        <br />
  
        <div className="h-2" />
        <Center className="flex items-center gap-2">
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
          </HStack>
        </Center>
      </Box>
    );
  }