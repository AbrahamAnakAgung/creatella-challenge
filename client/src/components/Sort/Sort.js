import * as React from "react";

function Sort({ onSortChange, fetchStatus }) {
  return (
    <div className='sort-wrapper'>
      <label htmlFor='sort' className='sort-label'>
        Sort by:{" "}
      </label>
      <select
        id='sort'
        onChange={onSortChange}
        disabled={fetchStatus !== "success"}>
        <option value='size' className='sort-option'>
          size
        </option>
        <option value='price' className='sort-option'>
          price
        </option>
        <option value='id' className='sort-option'>
          id
        </option>
      </select>
    </div>
  );
}

export { Sort };
