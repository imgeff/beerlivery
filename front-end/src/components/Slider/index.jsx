import React, { useState, useEffect, useContext } from 'react';
import { getAll } from '../../helpers/api/requests';
import Slide from './Slide';
import ManualNavigation from '../ManualNavigation';
import ButtonsFilter from '../ButtonsFilter';
import setActiveElement from '../../helpers/dom/setActiveElement';
import SliderContext from '../../context/Slider/SliderContext';
import './style.css';

function Slider() {
  const [customerCart, setCustomerCart] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [amountItems, setAmountItems] = useState(0);

  const [products, setProducts] = useState([]);

  const [brandings, setBrandings] = useState([]);

  const [productsByBrand, setProductsByBrand] = useState([]);

  const {
    slideNavigation: {
      setSlideActive,
      limits,
      setLimits,
      scrollToSlide,
    },
  } = useContext(SliderContext);

  const getAllProducts = async () => {
    const response = await getAll('products');
    setProducts(response);
    setProductsByBrand(response);
    setLimits({ ...limits, end: response.length - 1 });
  };

  const getAllBrandings = async () => {
    const response = await getAll('brandings');
    setBrandings(response);
  };

  const calculateTotalCard = () => {
    const totalPriceCalculation = customerCart
      .reduce((acc, itemCart) => acc + parseFloat(itemCart.subTotal), 0);
    setTotalPrice(totalPriceCalculation);

    const totalAmountItems = customerCart
      .reduce((acc, itemCart) => acc + itemCart.quantity, 0);
    setAmountItems(totalAmountItems);
  };

  const filterByBrand = (brand, selectorElement) => {
    const productsFiltered = products
      .filter((product) => product.name.includes(brand));
    scrollToSlide(0);
    setProductsByBrand(productsFiltered);
    setActiveElement('active-filter-quaternary', selectorElement, true);
  };

  useEffect(() => {
    getAllProducts();
    getAllBrandings();
    setActiveElement('active-filter-quaternary', '#filter-branding-0', true);
  }, []);

  useEffect(() => {
    calculateTotalCard();
  }, [customerCart]);

  useEffect(() => {
    setLimits({ ...limits, end: productsByBrand.length - 1 });
    setSlideActive(0);
  }, [productsByBrand]);

  const filter = { filterByBrand, brandings };

  const cart = { customerCart, setCustomerCart, totalPrice, amountItems };

  return (
    <div className="slider">
      <ButtonsFilter filter={ filter } />
      <div className="slides">
        <ManualNavigation
          products={ productsByBrand }
        />
        {productsByBrand.map((product, index) => (
          <Slide
            key={ product.id }
            product={ product }
            index={ index }
            cart={ cart }
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
