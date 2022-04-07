import { useState } from "react";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";
import UpdateProductForm from "../updateProductForm/UpdateProductForm";

const ProductList = ({ filterProducts, options, updateHandler }) => {
  const [edit, setEdit] = useState({
    group: "",
    number: null,
    title: "",
    id: null,
  });

  const editProduct = (product) => {
    updateHandler(product);
    setEdit({
      group: "",
      number: null,
      title: "",
      id: null,
    });
  };

  const renderProducts = () => {
    if (filterProducts.length === 0)
      return <div className={styles.noProduct}>هنوز محصولی ثبت نشده</div>;
    return (
      <div className={styles.productList}>
        {filterProducts.map((product) => {
          return (
            <Product
              key={product.id}
              onEdit={() => setEdit(product)}
              product={product}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      {edit.id ? (
        <UpdateProductForm
          editProduct={editProduct}
          updateHandler={updateHandler}
          edit={edit}
          options={options}
        />
      ) : (
        renderProducts()
      )}
    </>
  );
};

export default ProductList;
