import { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./UpdateProductForm.module.css";

const UpdateProductForm = ({ options, edit, editProduct }) => {
  const [product, setProduct] = useState(edit ? edit : "");
  const [selectedOption, setSelectedOption] = useState(
    product ? { value: product.group, label: product.group } : ""
  );

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const groupChangeHandler = (selectedOption) => {
    setSelectedOption(selectedOption);
    setProduct({ ...product, group: selectedOption.label });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    editProduct(product);
  };

  return (
    <form onSubmit={submitHandler} className={styles.updateForm}>
      <input
        required
        onChange={changeHandler}
        type="text"
        name="title"
        value={product.title}
      />
      <input
        required
        onChange={changeHandler}
        type="number"
        name="number"
        value={product.number}
      />
      <Select
        name="select"
        className={styles.select}
        value={selectedOption}
        onChange={groupChangeHandler}
        //همه ی گزینه ها بغیر از همه
        options={options.filter((item) => item.label != "همه")}
      />
      <button type="submit">ثبت</button>
    </form>
  );
};

export default UpdateProductForm;
