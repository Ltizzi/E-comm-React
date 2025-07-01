import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { buildPagination, getFront } from "../utils/utils";
import { GrPrevious, GrNext } from "react-icons/gr";

const AdminPanel = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const { products, getProductsWithPagination, getProducyById } =
    useContext(ProductContext);

  const [productsToShow, setProductToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  async function getProducts(page) {
    const data = await getProductsWithPagination(page, ITEMS_PER_PAGE);
    setProductToShow(data);
  }

  async function goPrev() {
    if (currentPage > 1) {
      await getProducts(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  }

  async function goNext() {
    if (currentPage < pages[pages.length - 1]) {
      await getProducts(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  }

  async function goPage(page) {
    await getProducts(page);
    setCurrentPage(page);
  }

  useEffect(() => {
    const pagination = buildPagination(products.length, ITEMS_PER_PAGE);
    setTotalPages(pagination.totalPages);
    setPages(pagination.pages);

    async function getProds() {
      const data = await getProductsWithPagination(1, ITEMS_PER_PAGE);
      setProductToShow(data);
    }

    getProds();
  }, [setTotalPages, setPages, products, getProductsWithPagination]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center max-w-full lg:max-w-2/3 lg:min-w-2/3 bg-base-300/85 py-5 px-7 rounded-lg min-h-5/6 max-h-5/6 relative">
        <h1 className="text-3xl font-bold pb-5 absolute top-5">Admin panel</h1>
        <div>
          <table className="table flex flex-col justify-center items-center">
            <thead>
              <tr>
                <th className="max-w-14">Cover</th>
                <th>Album</th>
                <th>Price</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {productsToShow.map((prod) => (
                <tr>
                  <td className="max-w-14">
                    <div className="avatar h-12 w-12 max-w-12">
                      <img src={getFront(prod.coverImages)} alt="Album cover" />
                    </div>
                  </td>
                  <td className="max-w-3/6 min-w-3/6">
                    <div>
                      <div className="font-bold">{prod.title}</div>
                      <div className="text-sm opacity-50">{prod.artist}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="text-sm opacity-50">{prod.price}</div>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="join flex mx-auto justify-center items-center">
            <button className="btn" onClick={() => goPrev()}>
              <GrPrevious />
            </button>
            {pages.map((page) => (
              <button
                className={`${
                  currentPage == page ? "btn-active bg-primary" : ""
                } join-item btn hover:cursor-pointer btn-sm
                      `}
                onClick={() => goPage(page)}
              >
                {page}
              </button>
            ))}
            <button className="btn" onClick={() => goNext()}>
              <GrNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
