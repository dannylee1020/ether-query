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
        <div className="flex flex-col items-center">
            <table className="table table-normal table-fixed w-2/5">
                <thead>
                    <tr>
                        <th>Overview</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([key, value]) => {
                        if (key === "transactions") {
                            return (
                                <tr className="bg-white">
                                    <td>{key}</td>
                                    <td className="truncate">
                                        <button onClick={toTransaction}>
                                            view transactions
                                        </button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr className="bg-white">
                                    <td className="pr-20">{key}</td>
                                    <td className="truncate">{value}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Block;
