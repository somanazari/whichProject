import { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ searchHandler }) => {
  const [search, setSearch] = useState("");

  const changeHandler = (e) => {
    setSearch(e.target.value);
    searchHandler(e.target.value);
  };

  return (
    <form className={styles.searchForm}>
      <input
        placeholder="جستجو ..."
        onChange={changeHandler}
        type="text"
        value={search}
      />
    </form>
  );
};

export default Search;
