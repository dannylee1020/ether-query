import { GoSearch } from "react-icons/go";
import { getBlock, getLatestBlock } from "../api/extract";
import { useState } from "react";

const Search = () => {
    const [blockNum, setBlockNum] = useState();

    async function printBlock() {
        if (!blockNum) {
            let block = await getLatestBlock();
            console.log(block);
        } else {
            let block = await getBlock(blockNum);
            console.log(block);
        }
    }

    function handleInput(e) {
        setBlockNum(e.target.value);
    }

    return (
        <div className="flex justify-center items-center mt-10 w-100%">
            <input
                type="text"
                placeholder="Search by block number / hash"
                className="border-2 w-1/3 placeholder:text-sm"
                onChange={handleInput}
            ></input>
            <div className="border-2 h-7 w-8 flex items-center justify-center">
                <GoSearch onClick={printBlock}></GoSearch>
            </div>
        </div>
    );
};

export default Search;
