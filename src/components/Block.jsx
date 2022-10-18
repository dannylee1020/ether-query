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
import Transactions from "./Transactions";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    function toTransaction() {
        navigate("/transactions");
    }

    return (
        <div>
            <TableContainer>
                <Table
                    variant="striped"
                    colorScheme="gray"
                    className="table-fixed"
                >
                    <TableCaption>
                        Data for Ethereum Block #: {data.number}
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Overview</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.entries(data).map(([key, value]) => {
                            if (key === "transactions") {
                                return (
                                    <Tr>
                                        <Td>{key}</Td>
                                        <Td className="truncate">
                                            <button onClick={toTransaction}>
                                                view transactions
                                            </button>
                                        </Td>
                                    </Tr>
                                );
                            } else {
                                return (
                                    <Tr>
                                        <Td>{key}</Td>
                                        <Td className="truncate">{value}</Td>
                                    </Tr>
                                );
                            }
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Block;
