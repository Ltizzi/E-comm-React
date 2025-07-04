import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { buildPagination, getFront } from "../utils/utils";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FaInfoCircle, FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import BaseButton from "./common/BaseButton";
import NewProductModal from "./NewProductModal";

const AdminPanel = ({ goToProd }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState([]);
  const { products, getProductsWithPagination, getProducyById } =
    useContext(ProductContext);

  const [productsToShow, setProductToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showEditor, setShowEditor] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [prodToEdit, setProdToEdit] = useState();

  function showEditorModal(prod = null, isEditor = false) {
    setShowEditor((prev) => !prev);
    setIsEditor(isEditor);
    if (prod) {
      setProdToEdit(prod);
    }
  }

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
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center max-w-full lg:max-w-2/3 lg:min-w-2/3 bg-base-300/85 py-5 px-7 rounded-lg min-h-5/6 max-h-5/6 relative pt-20">
        <h1 className="text-3xl font-bold pb-5 absolute top-5">Admin panel</h1>
        <div className="w-40">
          <BaseButton
            btnLabel={"Add new Album"}
            btnType={"success"}
            btnAction={() => showEditorModal()}
            tooltip={"Add new Album"}
          >
            <MdCreateNewFolder />
          </BaseButton>
        </div>

        <div className="h-full pt-10 md:pt-0">
          <table className="table flex flex-col lg:justify-center lg:items-center justify-start items-start -ml-5 lg:ml-0 text-xs lg:text-base">
            <thead>
              <tr>
                <th className="max-w-14">Cover</th>
                <th>Album</th>
                <th>Price/Stock</th>

                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {productsToShow.map((prod) => (
                <tr>
                  <td className="max-w-14">
                    <div className="avatar lg:h-12 lg:w-12 w-6 h-6 max-w-12">
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
                      <div className="text-sm opacity-85">u$s {prod.price}</div>
                      <div className="text-xs pt-2 opacity-65">
                        {prod.count > 0 ? prod.count : ""}
                        {prod.count > 1
                          ? " units"
                          : prod.count > 0
                          ? " unit"
                          : "none"}
                      </div>
                    </div>
                  </td>

                  <td className="flex flex-row justify-start align-middle gap-2">
                    <BaseButton
                      btnLabel={""}
                      btnType={"info"}
                      btnAction={() => goToProd(prod)}
                      tooltip={"See Album"}
                      rounded={true}
                    >
                      {" "}
                      <FaInfoCircle className="h-4 w-4 md:h-6 md:w-6" />
                    </BaseButton>
                    <BaseButton
                      btnLabel={""}
                      btnType={"warning"}
                      btnAction={() => showEditorModal(prod, true)}
                      tooltip={"Edit Album"}
                      rounded={true}
                    >
                      {" "}
                      <FaRegEdit className="h-4 w-4 md:h-6 md:w-6" />
                    </BaseButton>
                    <BaseButton
                      btnLabel={""}
                      btnType={"error"}
                      btnAction={() => deleteProd(prod.id)}
                      tooltip={"Delete Album"}
                      rounded={true}
                    >
                      {" "}
                      <FaTrashAlt className="h-4 w-4 md:h-6 md:w-6" />
                    </BaseButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="join flex mx-auto justify-center items-center">
            <button
              className={`btn`}
              disabled={currentPage === 1}
              onClick={() => goPrev()}
            >
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
            <button
              className="btn"
              disabled={currentPage === totalPages}
              onClick={() => goNext()}
            >
              <GrNext />
            </button>
          </div>
        </div>
      </div>

      <NewProductModal
        showEditor={showEditor}
        isEditor={isEditor}
        prod={prodToEdit}
        showEditorModal={() => setShowEditor(false)}
      />
    </div>
  );
};

export default AdminPanel;
