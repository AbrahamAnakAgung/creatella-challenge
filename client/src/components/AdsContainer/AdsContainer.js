import * as React from "react";
import { Ads } from "../Ads/Ads";

function AdsContainer({ ...props }) {
  return (
    <div {...props}>
      <Ads width='160' height='100' />
    </div>
  );
}

export { AdsContainer };
