import Navbar from '../containers/Navbar';
import ProductItemDesc from '../containers/ProductItemDesc';

const MainPage = () => {

  const API = "https://api.escuelajs.co/api/v1/products?limit=15&offset=0"

  // const products = useGetProducts(API)

  return (
    <>
        <header>
            <Navbar />
        </header>
        <main className='grid grid-auto-fill gap-6 justify-center pt-16'>
            {/* {products.map((item, index) => {
                return <ProductItemDesc product={item} key={index} />
            })} */}
        </main>
    </>
  )
}

export default MainPage;