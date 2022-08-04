import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All products</h2>
          <div className="content__items">
            <PizzaBlock title="Mexican" price={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
