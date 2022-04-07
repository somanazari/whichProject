import Nav from "./Nav/Nav";
import AddProductForm from "./AddProductForm/AddProductForm";
import ProductList from "./ProductList/ProductList";
import styles from "./ProductApp.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";

let options = [{ value: "همه", label: "همه" }];

const ProductApp = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [group, setGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: "همه",
    label: "همه",
  });

  useEffect(() => {
    // localStorage.clear();
    // use stored datas on reload
    var storedProducts = JSON.parse(localStorage.getItem("products"));
    var storedGroup = JSON.parse(localStorage.getItem("group"));
    var storedOptions = JSON.parse(localStorage.getItem("options"));
    setProducts(storedProducts);
    setGroup(storedGroup);
    options = [...storedOptions];
  }, []);

  useEffect(() => {
    // store datas
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("group", JSON.stringify(group));
    localStorage.setItem("options", JSON.stringify(options));

    filterHandler(selectedOption);
  }, [products, group]);

  const setProductHandler = (product) => {
    setProducts([
      ...products,
      { ...product, id: Date.now(), created_at: new Date().getTime() },
    ]);

    // جلوگیری از ثبت شدن مقادیر تکراری
    const cloneGroup = Array.from(new Set([...group, product.group]));
    setGroup(cloneGroup);

    optionsHandler(product);
    // notification
    toast.success("محصول شما ثبت شد");
  };

  const optionsHandler = (product) => {
    // اگر دسته بندی انتخاب شده در هنگام ثبت محصول جزو دسته بندی های قبلی بود، آنرا به لیست دسته بندی ها اضافه نکن
    // if(newProduct.group === savedGroup) => dont add this group to group list
    let sameValue = group.find((item) => item == product.group);
    if (!sameValue) {
      options = [...options, { value: product.group, label: product.group }];
    }
  };

  const filterHandler = (selectedOption) => {
    if (selectedOption.value === "همه") {
      setFilterProducts(products);
    } else {
      let updatedProducts = products.filter(
        (product) => product.group === selectedOption.value
      );
      setFilterProducts(updatedProducts);
    }
  };

  const updateHandler = (updatedProduct) => {
    updatedProduct.updated_at = new Date().getTime();
    let cloneProducts = [...products];
    const index = cloneProducts.findIndex((item) => {
      return item.id === updatedProduct.id;
    });
    cloneProducts[index] = updatedProduct;
    cloneProducts = _.orderBy(cloneProducts, ["updated_at"], ["desc"]);
    setProducts(cloneProducts);
    toast.success("محصول مورد نظر با موفقیت به روزرسانی شد");
  };

  const searchHandler = (value) => {
    if (!value || value === "") {
      filterHandler(selectedOption);
      return;
    }

    // filter products befor search
    let updatedProducts;
    if (selectedOption.value === "همه") {
      updatedProducts = products;
    } else {
      updatedProducts = products.filter(
        (product) => product.group === selectedOption.value
      );
    }

    // search product after filter
    let searched = updatedProducts.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterProducts(searched);
  };

  return (
    <section className={styles.productApp}>
      <Nav
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        filterHandler={filterHandler}
        options={options}
        group={group}
        products={products}
        showForm={showForm}
        setShowForm={setShowForm}
        searchHandler={searchHandler}
      />
      {showForm && (
        <AddProductForm
          group={group}
          setProductHandler={setProductHandler}
          setShowForm={setShowForm}
        />
      )}
      <ProductList
        options={options}
        updateHandler={updateHandler}
        filterProducts={filterProducts}
        setFilterProducts={setFilterProducts}
      />
    </section>
  );
};

export default ProductApp;
