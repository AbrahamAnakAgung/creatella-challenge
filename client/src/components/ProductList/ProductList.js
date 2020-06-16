import * as React from "react";
import Spacer from "../Spacer/Spacer";
import db from "../../../db-1592200732327.json";
import Loading from "../Loading/Loading";
import { Sort } from "../Sort/Sort";
import { Product } from "../Product/Product";
import { DisplayError } from "../DisplayError/DisplayError";

function ImageList() {
  const api = "http://localhost:3000/api/products?_page=1&_limit=20";
  const sortParam = "&_sort=";
  const [products, setProducts] = React.useState([]);
  // status: 'pending', 'success', 'error'
  const [fetchStatus, setFetchStatus] = React.useState("pending");

  React.useEffect(() => {
    // initial fetch
    fetch(api + sortParam + "size")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFetchStatus("success");
      })
      .catch((error) => {
        setFetchStatus("error");
        console.error(error);
      });
  }, []);

  const onSortChange = (e) => {
    const sortBy = e.currentTarget.value;

    setFetchStatus("pending");

    fetch(api + sortParam + sortBy)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFetchStatus("success");
      })
      .catch((error) => {
        setFetchStatus("error");
        console.error(error);
      });
  };

  return (
    <div className='wrapper'>
      <Spacer size={"20px"} inline='' />
      <Sort onSortChange={onSortChange} />
      <Spacer size={"20px"} inline='' />
      <div className='display-products'>
        {fetchStatus === "pending" ? (
          <Loading />
        ) : fetchStatus === "error" ? (
          <DisplayError />
        ) : (
          products.map((product) => {
            return <Product {...product} key={product.id} />;
          })
        )}
      </div>
    </div>
  );
}

export default ImageList;
