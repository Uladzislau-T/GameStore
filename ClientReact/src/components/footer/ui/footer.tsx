import cls from "./footer.module.scss"


function Footer() {
  return ( 
    <footer className={cls["footer"]}>
      <div className={cls["footer-container"]}>
        <div className={cls["row"]}>
          <div className={cls["footer-col"]}>
            <h4>Contact Us</h4>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
            </ul>
          </div>
          <div className={cls["footer-col"]}>
            <h4>get help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">shipping</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div>
          <div className={cls["footer-col"]}>
            <h4>Information</h4>
            <ul>
              <li><a href="#">delivary information</a></li>
              <li><a href="#">Search</a></li>
              <li><a href="#">Terms And Conditions</a></li>
              <li><a href="#">Shipping And Refund</a></li>
            </ul>
          </div>
          <div className={cls["footer-col"]}>
            <h4>follow us</h4>
            <div className={cls["subscribe-form"]}>
              <form action="#">
                  <input type="text" placeholder="Email Address"/>
                  <button><i className="fab fa-telegram-plane"></i></button>
              </form>
            </div>
            <div className={cls["social-links"]}>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <p>Copyright © ${new Date().getFullYear()} GameStore. All rights reserved. All trademarks are property of their respective owners in the RB and other countries.</p>
      </div>
    </footer>   
  );
}
 
export default Footer;