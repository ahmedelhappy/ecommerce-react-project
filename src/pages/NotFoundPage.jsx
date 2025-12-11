import {Header} from "../components/Header";
import "./NotFoundPage.css"
export function NotFoundPage({ cart }) {

  return(
    <>
      <title>404 Page Not Found</title>

      <Header cart={cart}/>
      
      <div className="not-found-message">
        Page not found
      </div>
    </>
  )
}