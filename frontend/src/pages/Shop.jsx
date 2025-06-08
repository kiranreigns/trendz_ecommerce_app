import Hero from "../components/Hero/Hero";
import BestSellers from "../components/BestSellers/BestSellers";
import Offers from "../components/Offers/Offers";
import NewCollections from "../components/NewCollections/NewCollections";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const Shop = () => {
  return (
    <>
      <Hero />
      <BestSellers />
      <Offers />
      <NewCollections />
      <NewsLetter />
      <ScrollToTop />
    </>
  );
};

export default Shop;
