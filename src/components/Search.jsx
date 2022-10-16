import { GoSearch } from "react-icons/go";
import { getBlock } from "../api/extract";

const Search = () => {
    async function printBlock() {
        let block = await getBlock();
        console.log(block);
    }

    return (
        <div className="flex justify-center items-center mt-10 w-100%">
            <input
                type="text"
                placeholder="Search by block number / hash"
                className="border-2 w-1/3 placeholder:text-sm"
            ></input>
            <div className="border-2 h-7 w-8 flex items-center justify-center">
                <GoSearch onClick={printBlock}></GoSearch>
            </div>
        </div>
    );
};

export default Search;
