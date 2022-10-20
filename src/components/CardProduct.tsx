import { FC } from "react";
import { Link } from "react-router-dom";
import shipping from "../assets/shipping.png";
import IProduct from "../interfaces/IProduct";

interface PropsCard {
  product: IProduct;
}

const CardProduct: FC<PropsCard> = ({ product }): any => {
  return (
    <Link className="decoration" to={`/items/${product.id}`}>
      <div className="cardProduct">
        <div className="picture">
          <img src={product.picture} alt={product.picture} />
        </div>
        <div className="detailsSearch">
          <div className="freeShipping">
            <h2>
              ${new Intl.NumberFormat("de-DE").format(product.price.amount)}
            </h2>
            {product.free_shipping ? (
              <img src={shipping} alt="free_shipping" />
            ) : (
              ""
            )}
          </div>
          <h3>{product.title}</h3>
        </div>
        <div className="city">
          <span>{product.city_name}</span>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
