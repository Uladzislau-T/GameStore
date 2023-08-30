import { useTranslation } from "react-i18next";
import cls from "./footer.module.scss"


function Footer() {
  const {t} = useTranslation("footer")

  return ( 
    <footer className={cls["footer"]}>
      <div className={cls["footer-container"]}>
        <div className={cls["row"]}>
          <div className={cls["footer-col"]}>
            <h4>{t("Contact Us")}</h4>
            <ul>
              <li><a href="#">{t("About us")}</a></li>
              <li><a href="#">{t("Our Services")}</a></li>
              <li><a href="#">{t("Privacy policy")}</a></li>
              <li><a href="#">{t("Affiliate program")}</a></li>
            </ul>
          </div>
          <div className={cls["footer-col"]}>
            <h4>{t("Get help")}</h4>
            <ul>
              <li><a href="#">{t("FAQ")}</a></li>
              <li><a href="#">{t("Shipping")}</a></li>
              <li><a href="#">{t("Returns")}</a></li>
              <li><a href="#">{t("Order status")}</a></li>
              <li><a href="#">{t("Payment options")}</a></li>
            </ul>
          </div>
          <div className={cls["footer-col"]}>
            <h4>{t("Information")}</h4>
            <ul>
              <li><a href="#">{t("Delivary information")}</a></li>
              <li><a href="#">{t("Search")}</a></li>
              <li><a href="#">{t("Terms And Conditions")}</a></li>
              <li><a href="#">{t("Shipping And Refund")}</a></li>
            </ul>
          </div>
          <div className={cls["footer-col"]}>
            <h4>follow us</h4>
            <div className={cls["subscribe-form"]}>
              <form action="#">
                  <input type="text" placeholder={t("Email Placeholder")}/>
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
        <p>{t("Copyright")} © {new Date().getFullYear()} GameStore. {t("Rights")}</p>
      </div>
    </footer>   
  );
}
 
export default Footer;