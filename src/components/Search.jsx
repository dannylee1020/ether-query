import { GoSearch } from "react-icons/go";
import { getBlock, getLatestBlock } from "../api/extract";
import { useState, useEffect } from "react";
import Block from "./Block";

const Search = () => {
    const [blockNum, setBlockNum] = useState();
    const [block, setBlock] = useState();

    async function queryBlock() {
        let blockData;

        if (!blockNum) {
            blockData = await getLatestBlock();
        } else {
            blockData = await getBlock(blockNum);
        }

        setBlock(blockData);
    }

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
                    <GoSearch onClick={queryBlock}></GoSearch>
                </div>
            </div>
            <div className="w-2/3">
                {block ? <Block block={block} /> : null}
            </div>
        </div>
    );
};

export default Search;
