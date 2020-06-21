import * as React from "react";
import { Ads } from "../Ads/Ads";

function TopAd() {
  return (
    <div className='ads-container'>
      <div className='img-wrapper adsvert'>
        <Ads width='160' height='100' />
      </div>
      <div className='sponsors-text'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export { TopAd };
