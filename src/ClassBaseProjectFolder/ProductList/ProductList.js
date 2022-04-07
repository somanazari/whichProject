import { Component } from "react";
import Product from "../Product/Product";
import styles from "./ProductList.module.css";

class ProductList extends Component {
  render() {
    if (this.props.filterProducts.length === 0)
      return <div className={styles.noProduct}>هنوز محصولی ثبت نشده</div>;
    return (
      <div className={styles.productList}>
        {this.props.filterProducts.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    );
  }
}

export default ProductList;
