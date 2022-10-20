import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { searchIdApi } from "../services/searchService";
import BreadCrumb from "../components/BreadCrumb";
import IProduct from "../interfaces/IProduct";
import ICategory from "../interfaces/ICategory";

const Details = (): any => {
  //  id es el parametro de la url para el item, o sea el id del producto
  const { id } = useParams();
  //  estado product donde se guarda la información que viene de servidor
  const [product, setProduct] = useState<IProduct>();
  //  estad categories donde se guarda la información para breadcrumb desde servidor
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //  se ejecuta en cuando el componente se monta
  useEffect(() => {
    getData();
  }, []);

  // hace el llamado a la api del servidor para traer datos con un id de producto
  const getData = async (): Promise<any> => {
    // valida si existe el id del producto para hacer el llamado a la api
    if (id != null) {
      setLoading(true);
      const result: any = await searchIdApi(id);
      setLoading(false);

      if (result.item != null) {
        setProduct(result.item);
        // actualiza las categorías encontradas para ese producto
        setCategories(result.categories);
      }
    }
  };

  return (
    <>
      {product !== null && product !== undefined ? (
        <>
          <BreadCrumb categories={categories} />

          <div className="detailContainer">
            <div className="inLine">
              <div className="image">
                <img src={product.picture} alt={product.id} />
              </div>
              <div className="details">
                <div>
                  <span>
                    {product.condition === "new" ? "Nuevo" : "Usado"} -{" "}
                    {product.sold_quantity} vendidos
                  </span>
                </div>
                <h3>{product.title}</h3>
                <div className="price">
                  <h2>
                    ${" "}
                    {new Intl.NumberFormat("de-DE").format(
                      product.price.amount
                    )}
                  </h2>
                  <span>00</span>
                </div>

                <button>Comprar</button>
              </div>
            </div>
            <div className="description">
              <h2>Descripción del producto</h2>
              <span>
                {product.description != null && product.description !== ""
                  ? product.description
                  : "Este producto no cuenta con descripción..."}
              </span>
            </div>
          </div>
          <div className="end_space"></div>
        </>
      ) : loading ? (
        <h1>Cargando...</h1>
      ) : (
        <h1>No se encontró el producto</h1>
      )}
    </>
  );
};

export default Details;
