import * as React from "react";
import { randomize } from "../../utils/randomize";

function Ads({ ...props }) {
  return (
    <img
      className='ad'
      src={`http://localhost:3000/ads/?r=${randomize()}`}
      alt='unsplash random picture'
      loading='lazy'
      {...props}
    />
  );
}

export { Ads };
