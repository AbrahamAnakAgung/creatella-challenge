import * as React from "react";
import Spacer from "../Spacer/Spacer";
import { relativeTime } from "../../utils/relativeTime";
import db from "../../../db-1592200732327.json";

function ImageList() {
  const api = "http://localhost:3000/api/products?_page=1&_limit=15";
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    // fetch(api)
    //   .then((response) => response.json())
    //   .then((data) => setProducts(data));
  }, []);

  return (
    <div className='wrapper'>
      <Spacer size={"20px"} inline='' />
      <div className='display-products'>
        {db.products.map(({ date, face, id, price, size }, index) => {
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
                <span className='bold product-unit'> {size}px</span>
              </div>
              <div className='product-detail'>
                <span className='product-label'>Added:</span>
                <span className='bold product-unit'> {relativeTime(date)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageList;
