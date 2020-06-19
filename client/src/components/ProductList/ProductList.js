import * as React from "react";
import debounce from "lodash.debounce";
import { Spacer } from "../Spacer/Spacer";
import { Loading } from "../Loading/Loading";
import { Sort } from "../Sort/Sort";
import { Product } from "../Product/Product";
import { DisplayError } from "../DisplayError/DisplayError";
import { End } from "../End/End";
import { API, LIMIT, TOTAL_PRODUCTS } from "../../constants";
import { isInViewport } from "../../utils/isInViewport";

function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  // status: 'pending', 'success', 'error'
  const [fetchStatus, setFetchStatus] = React.useState("pending");
  const [hasMore, setHasMore] = React.useState(true);

  // fetch product if pageNumber change
  React.useEffect(() => {
    const fetchProducts = (page) => {
      setFetchStatus("pending");
      fetch(`${API}?_page=${page}&_limit=${LIMIT}`)
        .then((response) => response.json())
        .then((data) => {
          setFetchStatus("success");
          if (products.length >= TOTAL_PRODUCTS && data.length === 0) {
            setHasMore(false);
            return;
          }
          setProducts((prevProducts) => prevProducts.concat(data));
        })
        .catch((error) => {
          setFetchStatus("error");
          throw new Error(error);
        });
    };

    hasMore && fetchProducts(pageNumber);
  }, [pageNumber]);

  // sort event listener callback
  const onSortChange = (e) => {
    const sortBy = e.currentTarget.value;

    setFetchStatus("pending");
    setHasMore(true);
    setProducts([]);

    fetch(`${API}?_sort=${sortBy}&_limit=${LIMIT}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFetchStatus("success");
      })
      .catch((error) => {
        setFetchStatus("error");
        throw new Error(error);
      });
  };

  // infinite loop
  const lastElementRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      // check if element is in viwport and there is more content
      if (isInViewport(lastElementRef.current) && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    if (hasMore) {
      window.addEventListener("scroll", debounce(handleScroll, 500));
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className='wrapper'>
      <Spacer size={"20px"} inline='' />
      <Sort onSortChange={onSortChange} />
      <Spacer size={"20px"} inline='' />
      <div className='display-products'>
        {products.map((product, idx) => {
          if (idx === products.length - 1) {
            return (
              <Product
                {...product}
                key={product.id + idx}
                ref={lastElementRef}
              />
            );
          } else {
            return <Product {...product} key={product.id + idx} />;
          }
        })}
      </div>
      <Spacer size={"20px"} inline='' />
      {fetchStatus === "pending" && <Loading />}
      {fetchStatus === "error" && <DisplayError />}
      <Spacer size={"20px"} inline='' />
      {!hasMore && <End />}
      <Spacer size={"30px"} inline='' />
    </div>
  );
}

export default ProductList;
