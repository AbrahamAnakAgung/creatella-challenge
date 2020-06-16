import * as React from "react";
import Spacer from "../Spacer/Spacer";
import { relativeTime } from "../../utils/relativeTime";
import db from "../../../db-1592200732327.json";
import Loading from "../Loading/Loading";
import { Sort } from "../Sort/Sort";

function ImageList() {
  const api = "http://localhost:3000/api/products?_page=1&_limit=15";
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const onSortChange = (e) => {
    const sortBy = e.currentTarget.value;
    const sortParam = "&_sort=";
    fetch(api + sortParam + sortBy)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  return (
    <div className='wrapper'>
      <Spacer size={"20px"} inline='' />
      <Sort onSortChange={onSortChange} />
      <Spacer size={"20px"} inline='' />
      <div className='display-products'>
        {products.length === 0 ? (
          <Loading />
        ) : (
          products.map(({ date, face, id, price, size }, index) => {
            return (
              <div key={id} className='product'>
                <div className='product-face bold'>
                  <p style={{ fontSize: `${size}px` }}>{face}</p>
                </div>
                <div className='product-detail'>
                  <span className='bold'>$</span>
                  <span className='bold product-price'>{price}</span>
                </div>
                <div className='product-detail'>
                  <span className='product-label'>Size:</span>
                  <span className='light-bold product-unit'> {size}px</span>
                </div>
                <div className='product-detail'>
                  <span className='product-label'>Added:</span>
                  <span className='light-bold product-unit'>
                    {" "}
                    {relativeTime(date)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ImageList;
