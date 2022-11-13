import { GoSearch } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { useState, useEffect } from "react";
import Block from "./Block";

const Search = (props) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    //dark theme
    useEffect(() => {
        useDark();
    }, [theme]);

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
    }

    function toggleDark() {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    }

    return (
        <div className="flex flex-col items-center gap-10 h-screen">
            <div className="flex justify-center items-center mt-10 w-2/3">
                <input
                    type="text"
                    placeholder="Search by block number / hash"
                    className="border-[1.3px] border-slate-300 w-2/3 placeholder:text-sm border-r-0 h-8 pl-3"
                    onChange={props.handleInput}
                ></input>
                <button className="btn btn-sm btn-square btn-outline rounded-none">
                    <GoSearch onClick={props.handleClick}></GoSearch>
                </button>
                <button onClick={toggleDark} className="text-2xl ml-10">
                    {theme === "dark" ? <BsSun /> : <MdOutlineDarkMode />}
                </button>
            </div>

            <div>{props.block ? <Block block={props.block} /> : null}</div>
        </div>
    );
};

export default Search;
