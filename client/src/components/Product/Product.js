import * as React from "react";
import { displayPrice } from "../../utils/displayPrice";
import { relativeTime } from "../../utils/relativeTime";

const Product = React.forwardRef((props, ref) => {
  const { date, face, size, price } = props;

  return (
    <div className='product' ref={ref}>
      <div className='product-face'>
        <p style={{ fontSize: `${size}px` }}>{face}</p>
      </div>
      <div className='product-detail-wrapper'>
        <div className='product-detail'>
          <span className='bold text-lg price-label'>$</span>
          <span className='bold product-price text-lg'>
            {displayPrice(price)[0]}
          </span>
          <span className='bold product-price'>.</span>
          <span className='bold product-price text-md'>
            {displayPrice(price)[1]}
          </span>
        </div>
        <div className='product-detail'>
          <span className='product-label'>Size:</span>
          <span className='light-bold product-unit'> {size}px</span>
        </div>
        <div className='product-detail'>
          <span className='product-label'>Added:</span>
          <span className='light-bold product-unit'> {relativeTime(date)}</span>
        </div>
      </div>
    </div>
  );
});

export { Product };
