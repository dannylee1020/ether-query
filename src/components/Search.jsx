import { GoSearch } from "react-icons/go";
import { getBlock, getLatestBlock } from "../api/extract";
import { useState } from "react";
import { useQuery } from "react-query";
import Block from "./Block";

const Search = () => {
    const [blockNum, setBlockNum] = useState();
    const [block, setBlock] = useState();

    const callBlock = () =>
        useQuery(
            ["block", blockNum],
            () => {
                getBlock(blockNum);
            },
            {
                enabled: false,
            }
        );

    const callLatestBlock = () =>
        useQuery("block_latest", getLatestBlock, {
            enabled: false,
        });

    const latestBlock = callLatestBlock();
    const nBlock = callBlock();

    const handleClick = async (e) => {
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

    function handleInput(e) {
        setBlockNum(e.target.value);
    }

    return (
        <div className="flex flex-col w-100% items-center gap-10">
            <div className="flex justify-center items-center mt-10 w-2/3">
                <input
                    type="text"
                    placeholder="Search by block number / hash"
                    className="border-2 w-2/3 placeholder:text-sm"
                    onChange={handleInput}
                ></input>
                <div className="border-2 h-7 w-8 flex items-center justify-center">
                    <GoSearch onClick={handleClick}></GoSearch>
                </div>
            </div>
            <div className="w-2/3">
                {block ? <Block block={block} /> : null}
            </div>
        </div>
    );
};

export default Search;
