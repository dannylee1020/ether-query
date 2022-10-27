import { parseTxs, getLatestBlock, getBlock } from "../api/extract";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

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

const Transactions = () => {
    const latestBlock = useQuery("latest_block", getLatestBlock);
    const nBlock = useQuery("block", getBlock);

    const [txData, setTxData] = useState();

    useEffect(() => {
        const queryTxs = async () => {
            let transactions = await getLatestData();
            const txsList = await getTransactions(transactions);
            setTxData(txsList);
        };

        queryTxs();
    }, []);

    function getLatestData() {
        let transactions;

        latestBlock.dataUpdatedAt > nBlock.dataUpdatedAt
            ? (transactions = latestBlock.data.transactions)
            : (transactions = nBlock.data.transactions);

        return transactions;
    }

    async function getTransactions(tsx) {
        let txsList = await parseTxs(tsx);

        return txsList;
    }

    return (
        <div>
            {txData ? (
                <TableContainer>
                    <Table
                        className="table-fixed"
                        variant="striped"
                        colorschem="gray"
                    >
                        <Thead>
                            <Tr>
                                <Th>Hash</Th>
                                <Th>Block</Th>
                                <Th>From</Th>
                                <Th>To</Th>
                                <Th>Value</Th>
                                <Th>Txn Fee</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {txData.map((data) => {
                                return (
                                    <Tr>
                                        <Td className="truncate">
                                            {data.hash}
                                        </Td>
                                        <Td className="truncate">
                                            {data.blockNumber}
                                        </Td>
                                        <Td className="truncate">
                                            {data.from}
                                        </Td>
                                        <Td className="truncate">{data.to}</Td>
                                        <Td className="truncate">
                                            {data.value}
                                        </Td>
                                        <Td className="truncate">{data.gas}</Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            ) : null}
        </div>
    );
};

export default Transactions;
