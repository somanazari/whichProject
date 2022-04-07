import Nav from "./Nav/Nav";
import AddProductForm from "./AddProductForm/AddProductForm";
import ProductList from "./ProductList/ProductList";
import styles from "./ProductApp.module.css";
import { toast } from "react-toastify";
import { Component } from "react";

let options = [{ value: "همه", label: "همه" }];

class ProductApp extends Component {
  state = {
    showForm: false,
    products: [],
    filterProducts: [],
    group: [],
    selectedOption: { value: "همه", label: "همه" },
  };

  componentDidMount() {
    // localStorage.clear();
    // use stored datas on reload
    var storedProducts = JSON.parse(localStorage.getItem("products"));
    var storedGroup = JSON.parse(localStorage.getItem("group"));
    var storedOptions = JSON.parse(localStorage.getItem("options"));

    if (storedProducts && storedGroup && storedOptions) {
      this.setState({ products: storedProducts });
      this.setState({ group: storedGroup });
      options = [...storedOptions];
    }
  }

  setProductHandler = (product) => {
    this.setState({
      products: [...this.state.products, { ...product, id: Date.now() }],
    });

    // جلوگیری از ثبت شدن مقادیر تکراری
    const cloneGroup = Array.from(
      new Set([...this.state.group, product.group])
    );
    this.setState({ group: cloneGroup });

    this.optionsHandler(product);
    // notification
    toast.success("محصول شما ثبت شد");
  };

  optionsHandler = (product) => {
    // اگر دسته بندی انتخاب شده در هنگام ثبت محصول جزو دسته بندی های قبلی بود، آنرا به لیست دسته بندی ها اضافه نکن
    // if(newProduct.group === savedGroup) => dont add this group to group list
    let sameValue = this.state.group.find((item) => item == product.group);
    if (!sameValue) {
      options = [...options, { value: product.group, label: product.group }];
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.group !== this.state.group ||
      prevState.products !== this.state.products
    ) {
      localStorage.setItem("products", JSON.stringify(this.state.products));
      localStorage.setItem("group", JSON.stringify(this.state.group));
      localStorage.setItem("options", JSON.stringify(options));
      this.filterHandler(this.state.selectedOption);
    }
  }

  filterHandler = (selectedOption) => {
    if (selectedOption.value === "همه") {
      this.setState({ filterProducts: this.state.products });
    } else {
      const updatedProducts = this.state.products.filter(
        (product) => product.group === selectedOption.value
      );
      this.setState({ filterProducts: updatedProducts });
    }
  };

  showHideFormHandler = () => {
    this.setState((prevState) => {
      return { showForm: !prevState.showForm };
    });
  };

  selectedOptionHandler = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
  };

  render() {
    return (
      <section className={styles.productApp}>
        <Nav
          selectedOptionHandler={this.selectedOptionHandler}
          selectedOption={this.state.selectedOption}
          filterHandler={this.filterHandler}
          options={options}
          group={this.state.group}
          products={this.state.products}
          showForm={this.state.showForm}
          showHideFormHandler={this.showHideFormHandler}
        />
        {this.state.showForm && (
          <AddProductForm
            group={this.state.group}
            setProductHandler={this.setProductHandler}
            showHideFormHandler={this.showHideFormHandler}
          />
        )}
        <ProductList filterProducts={this.state.filterProducts} />
      </section>
    );
  }
}

export default ProductApp;
