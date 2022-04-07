import { Component, useState } from "react";
import styles from "./AddProductForm.module.css";

class AddProductForm extends Component {
  state = {
    product: {
      title: "",
      number: "",
      group: "",
    },
    showGroup: false,
  };

  changeHandler = (e) => {
    this.setState({
      product: { ...this.state.product, [e.target.name]: e.target.value },
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.setProductHandler(this.state.product);
    this.props.showHideFormHandler();
  };

  render() {
    let { setProductHandler, group, showHideFormHandler } = this.props;

    return (
      <form onSubmit={this.submitHandler} className={styles.productForm}>
        <input
          required
          name="title"
          placeholder="نام محصول ..."
          onChange={this.changeHandler}
          type="text"
          value={this.state.product.title}
        />
        <input
          required
          name="number"
          placeholder="تعداد محصول ..."
          onChange={this.changeHandler}
          type="number"
          value={this.state.product.number}
        />
        <div className={styles.groupBox}>
          <h2>دسته بندی</h2>
          {this.state.showGroup === true ? (
            <input
              required
              name="group"
              placeholder="دسته بندی ..."
              onChange={this.changeHandler}
              type="text"
              value={this.state.product.group}
            />
          ) : group.length == 0 ? (
            <input
              required
              name="group"
              placeholder="دسته بندی ..."
              onChange={this.changeHandler}
              type="text"
              value={this.state.product.group}
            />
          ) : (
            group.map((item, index) => {
              return (
                <div className={styles.singleGroup} key={index}>
                  <label htmlFor={item}>{item}</label>
                  <input
                    checked={this.state.product.group === item}
                    onChange={this.changeHandler}
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
                this.state.showGroup === false ? styles.Registered : ""
              }`}
              onClick={() =>
                this.setState({ showGroup: !this.state.showGroup })
              }
            >
              {this.state.showGroup === false
                ? "دسته بندی جدید"
                : "دسته بندی های ثبت شده"}
            </a>
          )}
        </div>
        <button type="submit">ذخیره</button>
      </form>
    );
  }
}

export default AddProductForm;
