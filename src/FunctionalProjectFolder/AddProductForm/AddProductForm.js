import { useState } from "react";
import styles from "./AddProductForm.module.css";

const AddProductForm = ({ setShowForm, setProductHandler, group }) => {
  const [product, setProduct] = useState({
    title: "",
    number: 0,
    group: "",
    created_at: 0,
    updated_at: 0,
  });

  const [showGroup, setShowGroup] = useState(false);

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setProductHandler(product);
    console.log(product.number);
    setShowForm(false);
  };

  return (
    <form onSubmit={submitHandler} className={styles.productForm}>
      <input
        required
        name="title"
        placeholder="نام محصول ..."
        onChange={changeHandler}
        type="text"
        value={product.title}
      />
      <input
        required
        name="number"
        placeholder="تعداد محصول ..."
        onChange={changeHandler}
        type="number"
        value={product.number}
      />
      <div className={styles.groupBox}>
        <h2>دسته بندی</h2>
        {showGroup === true ? (
          <input
            required
            name="group"
            placeholder="دسته بندی ..."
            onChange={changeHandler}
            type="text"
            value={product.group}
          />
        ) : group.length == 0 ? (
          <input
            required
            name="group"
            placeholder="دسته بندی ..."
            onChange={changeHandler}
            type="text"
            value={product.group}
          />
        ) : (
          group.map((item, index) => {
            return (
              <div className={styles.singleGroup} key={index}>
                <label htmlFor={item}>{item}</label>
                <input
                  checked={product.group === item}
                  onChange={changeHandler}
                  type="radio"
                  id={item}
                  value={item}
                  name="group"
                />
              </div>
            );
          })
        )}
        {group.length !== 0 && (
          <a
            className={`${styles.newGroupBtn} ${
              showGroup === false ? styles.Registered : ""
            }`}
            onClick={() => setShowGroup(!showGroup)}
          >
            {showGroup === false ? "دسته بندی جدید" : "دسته بندی های ثبت شده"}
          </a>
        )}
      </div>
      <button type="submit">ذخیره</button>
    </form>
  );
};

export default AddProductForm;
