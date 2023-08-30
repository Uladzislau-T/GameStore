import cls from './startpage.module.scss'
// import { GameCard } from "../../components/gameCard/gameCard";
import { useEffect} from "react";
// import Hover from "../../components/hover/hover";
import { getAllProducts } from '../../../app/core/API/gameService';
import { useAppDispatch, useTypedSelector } from '../../../app/store/store';
import { classNames } from '../../../utils/classNames/classNames';
import { useTranslation } from 'react-i18next';

 
function StartPage() {
  const dispatch = useAppDispatch();
  const {games, isLoading, error} = useTypedSelector(state => state.gameReducer)
  const {t} = useTranslation("startpage")

  useEffect(() => {
    // if(!games)
      dispatch(getAllProducts())
  }, [])

  return (
    <div className={classNames(cls.startPage_container, {}, [])}>
      <div>{t("Main Page")}</div>
      
      {/* <section id="carouselCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className={cls["carousel-indicators"]}>
          <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className={`${cls["carousel-item]"]} active`} data-bs-interval="7000">
            <img src="images/thumb-1920-1151027.jpg" className="d-block w-100" alt="..."/>
            <div className="carousel-caption  text-end mb-md-5 pb-md-5">
              <h1 >WORLD OF 2042</h1>
              <p>Want to see the massive-scale fights of Battlefield 2042 in action?</p>              
              <a href="/" className="btn btn-danger btn-lg">Pre-Order</a>
            </div>
          </div>
          <div className={cls["carousel-item"]} data-bs-interval="7000">
            <img src="images/HL-Alyx-Reveal-Featured.jpg" className="d-block w-100" alt="..."/>
            <div className={`${cls['carousel-caption']} d-none d-md-block`}>
              <h5>Purchase Now</h5>
              <p>Extremely creative slogan</p>
            </div>
          </div>
          <div className={cls["carousel-item"]} data-bs-interval="7000">
            <img src="images/A-Total-War-Saga-Troy-Recensione-apertur.jpg" className="d-block w-100" alt="..."/>
            <div className={`${cls['carousel-caption']} text-start pb-lg-5 mb-lg-5`}>
            <a href="/" className="btn btn-warning btn-lg mb-xl-5 btn-troy">Purchase Now</a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </section> */}


      {/* <section className="py-5 mt-5">
        <div className="container-fluid">
            <div className="row home-icons" style={{alignSelf:"center"}}>
                <div className="mb-4 text-center home-icon">
                    <i className="fas fa-comment-dots fa-3x mb-2"></i>
                    <h3>Client Service</h3>
                    <p>
                        Support 24 hours a day
                    </p>
                </div>
                <div className=" mb-4 text-center home-icon">
                    <i className="fas fa-user-shield fa-3x mb-2"></i>
                    <h3>Quality Assurance</h3>
                    <p>
                        We sell only original games
                    </p>
                </div>
                <div className=" mb-4 text-center home-icon">
                    <i className="far fa-smile fa-3x mb-2"></i>
                    <h3>Money Return</h3>
                    <p>
                        Back Guarantee in 7 days
                    </p>
                </div>
                <div className=" mb-4 text-center home-icon">
                    <i className="fas fa-dollar-sign fa-3x mb-2"></i>
                    <h3>Member Discount</h3>
                    <p>
                        On every order over $10.00
                    </p>
                </div>
            </div>
        </div>
      </section> */}



      
      {/* <Hover>
        {(hover) => (
          <section className="section-gameList">
            <h1 className="startpage-gameList-sectionName">
              <i className={"fa-solid fa-percent" + ( hover ? " fa-bounce" : "")} style={{color:"#f8a9f9"}}></i> Now on sale
            </h1>
            <div className="startPage-gamesList">
              {
                games && games.map(game =>
                  <GameCard key={game.id} game={game}/>
              )}
            </div>
          </section>
        )
        }
      </Hover> */}

      {/* <section className="home-heading p-5">
          <div className="dark-overlay">
              <div className="">
                  <div className="">
                      <div className="container adv">
                          <h1>Are You Ready To Get Started?</h1>
                          <p className="d-none d-md-block">
                              Check out the comprehensive list of the latest games and bonuses on offer from GameStore.
                              Forget your problems with our games as solutions!
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section> */}

      {/* <section className="banner">
        <h5 className="pb-5 pt-5" style={{marginLeft: "25%"}}>MegaStore Games Catalog</h5>
        <div className="container brows-cat">
            <a href="/catalog" className="brows-cat-link"><img className="brows-cat-pic" src="/images/brows-cat.png" alt="First Slide"/></a>
            <div className="explore">
                <p className="browse">Browse</p>
                <p className="explore-words">Explore our catalog for your next favorite game!</p>
                <a href="/catalog" className="btn btn-light btn-lg mt-4">Learn More</a>
            </div>
        </div>
      </section> */}
    </div>
  );
}

export default StartPage;
