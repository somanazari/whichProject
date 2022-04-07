import styles from "./Nav.module.css";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Component } from "react";

class Nav extends Component {
  changeHandler = (selectedOption) => {
    this.props.selectedOptionHandler(selectedOption);
    this.props.filterHandler(selectedOption);
  };

  showFormHandler = () => {
    this.props.showHideFormHandler();
  };

  render() {
    let { showForm, products, options, selectedOption } = this.props;
    return (
      <header className={styles.header}>
        <div className={styles.logoBox}>
          <h1>انبار محصولات</h1>
          <button
            onClick={() => this.showFormHandler((prevState) => !prevState)}
            className={`${styles.btn} ${
              showForm === true ? styles.cancel : ""
            }`}
          >
            {showForm === true ? (
              <FaTimes className={`${styles.icon} ${styles.cancel}`} />
            ) : (
              <FaPlus className={styles.icon} />
            )}
          </button>
        </div>
        {products.length > 0 && (
          <div>
            <div>
              <span> تعداد محصولات: </span>
              <span>{products.length}</span>
            </div>
            <div>
              <Select
                className={styles.select}
                value={selectedOption}
                onChange={this.changeHandler}
                options={options}
              />
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Nav;
