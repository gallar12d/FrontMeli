import { useState, useEffect } from "react";
import { searchApi } from "../services/searchService";
import BreadCrumb from "./BreadCrumb";
import { useSearchParams } from "react-router-dom";
import CardProduct from "./CardProduct";
import ICategory from "../interfaces/ICategory";
import IProduct from "../interfaces/IProduct";

const Results = (): any => {
  //  const { search } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string | null>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  //  cuando hay un cambio en el estado de query se ejecuta el gargue de datos de servidor
  useEffect(() => {
    getData();
  }, [query]);
  // cuando hay un cambio en los parametros se actualiza el estado de query
  useEffect(() => {
    if (searchParams.get("search") != null) setQuery(searchParams.get("search"));
  }, [searchParams]);

  // hacer llamado a los servicios para traer datos desde
  //  el servidor con el parametro de busqueda
  const getData = async (): Promise<any> => {
    // si existe el parametro como estado se ejecuta el servicio de busqueda
    if (query != null) {
      setLoading(true);
      setProducts([]);
      const results = await searchApi(query);
      setLoading(false);
      setProducts(results.items);
      setCategories(results.categories);
    }
  };

  // funcion que itera sobre cada uno de
  //  los resultados para armar un componente de card por item encontrado
  const renderProducts = (): any => {
    return products.map((item: IProduct) => (
      <div key={item.id}>
        <CardProduct product={item} />
        <hr className="space" />
      </div>
    ));
  };

  return (
    <>
      {loading ? <h1>Cargando...</h1> : ""}
      {products != null && (products.length > 0) ? (
        <>
          <BreadCrumb categories={categories} />
          <div className="resultsContainer">{renderProducts()}</div>
          <div className="end_space"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Results;
