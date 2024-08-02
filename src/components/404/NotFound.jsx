import { Link } from 'react-router-dom'
import './NotFound.css'
export default function NotFound(){

    return (
        <div className='error-page'>
<h1>404 Error Page </h1>
<p class="zoom-area"><b>Sorry</b> The page you are trying to access does not exist. </p>
<section class="error-container">
  <span class="four"><span class="screen-reader-text">4</span></span>
  <span class="zero"><span class="screen-reader-text">0</span></span>
  <span class="four"><span class="screen-reader-text">4</span></span>
</section>
<div class="link-container">
  <Link to="/">Home Page</Link>
</div>
</div>
    )
}