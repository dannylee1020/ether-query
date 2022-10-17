import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";

import { useEffect } from "react";

function Block(props) {
    const data = (({
        baseFeePerGas,
        gasLimit,
        gasUsed,
        hash,
        nonce,
        number,
        parentHash,
        timestamp,
        totalDifficulty,
        transactions,
        size,
    }) => ({
        baseFeePerGas,
        gasLimit,
        gasUsed,
        hash,
        nonce,
        number,
        parentHash,
        timestamp,
        totalDifficulty,
        transactions,
        size,
    }))(props.block);

    // useEffect(() => {
    //     console.log(
    //         Object.entries(data).map(([key, value]) =>
    //             console.log(key + ":" + value)
    //         )
    //     );
    // }, [data]);

    return (
        <TableContainer>
            <Table variant="striped" colorScheme="gray">
                <TableCaption>
                    Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Overview</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.entries(data).map(([key, value]) => {
                        return (
                            <Tr>
                                <Td>{key}</Td>
                                <Td>{value}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default Block;
