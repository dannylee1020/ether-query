import { parseTxs, getLatestBlock, getBlock } from "../api/extract";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

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
        <div className="flex justify-center">
            {txData ? (
                <div className="mt-10 flex justify-center">
                    <table className="table table-compact">
                        <thead>
                            <tr>
                                <th>Hash</th>
                                <th>Block</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Value</th>
                                <th>Txn Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {txData.map((data) => {
                                return (
                                    <tr>
                                        <td className="truncate">
                                            {data.hash}
                                        </td>
                                        <td className="truncate">
                                            {data.blockNumber}
                                        </td>
                                        <td className="truncate">
                                            {data.from}
                                        </td>
                                        <td className="truncate">{data.to}</td>
                                        <td className="truncate">
                                            {data.value}
                                        </td>
                                        <td className="truncate">{data.gas}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
};

export default Transactions;
