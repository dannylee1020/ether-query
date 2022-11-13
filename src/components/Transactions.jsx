import { useQuery } from "react-query";

const Transactions = (props) => {
    const txData = useQuery("txs", props.queryTxs);

    const generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
    };

    return (
        <div className="flex justify-center">
            {txData.data ? (
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
                            {txData.data.map((data) => {
                                return (
                                    <tr key={generateKey(data.hash)}>
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
