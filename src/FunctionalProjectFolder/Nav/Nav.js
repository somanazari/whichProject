import styles from "./Nav.module.css";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Search from "../Search/Search";

const Nav = ({
  setShowForm,
  showForm,
  products,
  options,
  filterHandler,
  selectedOption,
  setSelectedOption,
  searchHandler,
}) => {
  const changeHandler = (selectedOption) => {
    setSelectedOption(selectedOption);
    filterHandler(selectedOption);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoBox}>
        <h1>انبار محصولات</h1>
        <button
          onClick={() => setShowForm((prevState) => !prevState)}
          className={`${styles.btn} ${showForm === true ? styles.cancel : ""}`}
        >
          {showForm === true ? (
            <FaTimes className={`${styles.icon} ${styles.cancel}`} />
          ) : (
            <FaPlus className={styles.icon} />
          )}
        </button>
      </div>
      <Search searchHandler={searchHandler} />
      {products.length > 0 && (
        <div className={styles.filterBox}>
          <div>
            <span> تعداد: </span>
            <span>{products.length}</span>
          </div>
          <div>
            {/* <span> دسته بندی ها: </span> */}
            <Select
              className={styles.select}
              value={selectedOption}
              onChange={changeHandler}
              options={options}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
