import Search from "./components/Search";
import Transactions from "./components/Transactions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { getBlock, getLatestBlock, parseTxs } from "./api/extract";

export default function App() {
    const [blockNum, setBlockNum] = useState();
    const [block, setBlock] = useState();

    const handleInput = (e) => {
        setBlockNum(e.target.value);
    };

    const handleClick = async () => {
        let res;

        if (!blockNum) {
            await latestBlock.refetch();
            res = latestBlock.data;
        } else {
            await nBlock.refetch();
            res = nBlock.data;
        }

        setBlock(res);
    };

    // subscribe data fetching with react query
    const queryBlock = async () => {
        let data = await getBlock(blockNum);
        return data;
    };

    const queryTxs = async () => {
        let data = block ? await parseTxs(block.transactions) : null;

        return data;
    };

    const nBlock = useQuery(["block"], queryBlock, {
        enabled: false,
        staleTime: 10000,
    });

    const transactions = useQuery(["txs"], queryTxs, {
        enabled: !!block,
        staleTime: Infinity,
    });

    const latestBlock = useQuery(
        "latest_block",
        async () => {
            const data = await getLatestBlock();
            console.log("fetching...");
            return data;
        },
        {
            enabled: false,
            staleTime: 10000,
        }
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Search
                            handleInput={handleInput}
                            handleClick={handleClick}
                            queryBlock={queryBlock}
                            queryTxs={queryTxs}
                            block={block}
                        />
                    }
                ></Route>
                <Route
                    path="/transactions"
                    element={
                        <Transactions
                            queryBlock={queryBlock}
                            queryTxs={queryTxs}
                        />
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}
