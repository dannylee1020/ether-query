import { GoSearch } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { getBlock, getLatestBlock } from "../api/extract";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Block from "./Block";

const Search = () => {
    // set state
    const [blockNum, setBlockNum] = useState();
    const [block, setBlock] = useState();
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    //dark theme
    useEffect(() => {
        useDark();
    }, [theme]);

    // subscribe data fetching with react query
    const nBlock = useQuery(["block", blockNum], () => {
        getBlock(blockNum);
    });
    const latestBlock = useQuery("latest_block", getLatestBlock, {});

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

    // dark mode
    function useDark() {
        if (
            theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }

        console.log(localStorage.getItem("theme"));
    }

    function toggleDark() {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    }

    // handle user input
    function handleInput(e) {
        setBlockNum(e.target.value);
    }

    return (
        <div className="flex flex-col items-center gap-10 h-screen">
            <div className="flex justify-center items-center mt-10 w-2/3">
                <input
                    type="text"
                    placeholder="Search by block number / hash"
                    className="border-[1.3px] border-slate-300 w-2/3 placeholder:text-sm border-r-0 h-8 pl-3"
                    onChange={handleInput}
                ></input>
                <button className="btn btn-sm btn-square rounded-none">
                    <GoSearch onClick={handleClick}></GoSearch>
                </button>
                <button onClick={toggleDark} className="text-2xl ml-10">
                    {theme === "dark" ? <BsSun /> : <MdOutlineDarkMode />}
                </button>
            </div>

            <div>{block ? <Block block={block} /> : null}</div>
        </div>
    );
};

export default Search;
