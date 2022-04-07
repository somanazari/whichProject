import styles from "./Product.module.css";
import CurrentTime from "../../common/CurrentTime";
import { FaPen } from "react-icons/fa";

const Product = ({ product, onEdit }) => {
  return (
    <div key={product.id} className={styles.singleProduct}>
      <h2>{product.title}</h2>
      <div className={styles.details}>
        <div className={styles.current}>
          <span>
            <strong> ایجاد: </strong>
            {CurrentTime(product.created_at)}
          </span>
          {product.updated_at > 0 && (
            <span>
              <strong> ویرایش: </strong>
              {CurrentTime(product.updated_at)}
            </span>
          )}
        </div>
        <div className={styles.edit} onClick={onEdit}>
          <FaPen />
        </div>
        <p>
          <span className={styles.number}>{product.number}</span>
        </p>
        <p className={styles.group}>
          <span className={styles.group}>{product.group}</span>
        </p>
      </div>
    </div>
  );
};

export default Product;
