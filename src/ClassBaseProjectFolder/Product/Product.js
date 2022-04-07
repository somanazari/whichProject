import { Component } from "react";
import styles from "./Product.module.css";

class Product extends Component {
  render() {
    return (
      <div key={this.props.product.id} className={styles.singleProduct}>
        <h2>{this.props.product.title}</h2>
        <div className={styles.details}>
          <p>
            <span className={styles.number}>{this.props.product.number}</span>
          </p>
          <p>
            <span className={styles.group}>{this.props.product.group}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Product;
