import * as React from "react";
import debounce from "lodash.debounce";
import { Spacer } from "../Spacer/Spacer";
import { Loading } from "../Loading/Loading";
import { Sort } from "../Sort/Sort";
import { Product } from "../Product/Product";
import { DisplayError } from "../DisplayError/DisplayError";
import { End } from "../End/End";
import { fetchProducts, cacheNextBatch } from "../../utils/fetchController";
import { isInViewport } from "../../utils/isInViewport";
import { AdsContainer } from "../AdsContainer/AdsContainer";
import { TopAd } from "../TopAd/TopAd";
import { LOCAL_STORAGE_KEY } from "../../constants";

function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  // status: 'pending', 'success', 'error'
  const [fetchStatus, setFetchStatus] = React.useState("pending");
  const [hasMore, setHasMore] = React.useState(true);
  const [sortBy, setSortBy] = React.useState("size");
  const prevProducts = React.useRef([]);

  // fetch product if pageNumber or sort value change
  React.useEffect(() => {
    const fetchData = async (_page, _sort) => {
      const localData = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEY)
      );
      let prodData = {};

      // if any data in localStorage, fetch it
      if (localData !== null && localData.data.length > 0) {
        prodData = localData;
      } else {
        // if no data fetch it from the server
        prodData = await fetchProducts(_page, _sort);
      }
      // save and combine raw product data to ref
      prevProducts.current = [...prevProducts.current, ...prodData.data];

      setHasMore(prodData.hasMore);
      setProducts(() => {
        // insert the ads
        const combineData = [];
        for (let i = 0; i < prevProducts.current.length; i++) {
          if (i % 20 === 0 && i !== 0) {
            combineData.push({ id: "ads" }, prevProducts.current[i]);
          } else {
            combineData.push(prevProducts.current[i]);
          }
        }
        return combineData;
      });

      setFetchStatus(prodData.status);
      // fetch the next batch
      cacheNextBatch(pageNumber + 1, sortBy);
    };

    setFetchStatus("pending");
    if (hasMore) {
      fetchData(pageNumber, sortBy);
    }
  }, [pageNumber, sortBy]);

  /**
   * Select sort event handler
   * @param {*} event
   */
  const onSortChange = (event) => {
    // reset the state
    setHasMore(true);
    setProducts([]);
    setPageNumber(1);
    prevProducts.current = [];
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);

    setSortBy(event.currentTarget.value);
  };

  // infinite scroll
  const lastElementRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      // check if element is in viewport and there is more content
      if (isInViewport(lastElementRef.current) && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    if (hasMore) {
      // lastElementRef.current = document.querySelector('.last');
      window.addEventListener("scroll", debounce(handleScroll, 500));
    } else {
      // stop watching
      // lastElementRef.current = null;
      window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className='wrapper'>
      <TopAd />
      <Spacer size={"30px"} inline='' />
      <Sort onSortChange={onSortChange} />
      <Spacer size={"20px"} inline='' />
      <div className='display-products'>
        {products.map((product, idx) => {
          if (product.id === "ads") {
            return (
              <AdsContainer
                className='img-wrapper'
                key={product.id ? product.id + idx : idx}
              />
            );
          } else {
            return (
              <Product {...product} key={product.id ? product.id + idx : idx} />
            );
          }
        })}
      </div>
      <Spacer size={"20px"} inline='' />
      <div
        className={hasMore ? "last" : "last hidden"}
        ref={hasMore ? lastElementRef : null}></div>
      {fetchStatus === "pending" && hasMore && <Loading />}
      {fetchStatus === "error" && <DisplayError />}
      <Spacer size={"20px"} inline='' />
      {!hasMore && <End />}
      <Spacer size={"30px"} inline='' />
    </div>
  );
}

export default ProductList;
