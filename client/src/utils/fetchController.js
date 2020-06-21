import { API, LIMIT, TOTAL_PRODUCTS, LOCAL_STORAGE_KEY } from "../constants";

/**
 * fetch data from database
 * @param {number} page page number to fetch
 * @param {object[]} prod current products data
 * @param {string} sort current sort value
 * @return {Promise<object>} status, data, hasMore
 */

export async function fetchProducts(page, sort) {
  try {
    const res = await fetch(
      `${API}?_page=${page}&_limit=${LIMIT}&_sort=${sort}`
    );
    const data = await res.json();
    console.log('FETCH', data.length)

    if (data.length === 0 && page * LIMIT + data.length >= TOTAL_PRODUCTS) {
      return {
        status: "success",
        data,
        hasMore: false,
      };
    }
    return {
      status: "success",
      data,
      hasMore: true,
    };
  } catch (error) {
    return {
      status: error,
      data: [],
      hasMore: false,
    };
  }
}

/**
 * fetch data from database and cache it to local storage
 * @param {number} page page number to fetch
 * @param {object[]} prod current products data
 * @param {string} sort current sort value
 * @return {Promise<boolean>} True if success fetching otherwise false
 */
export async function cacheNextBatch(page, sort) {
  try {
    const result = await fetchProducts(page, sort);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
