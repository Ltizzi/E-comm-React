import "./App.css";
import BaseButton from "./components/common/BaseButton";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <div className="bg-gradient-to-br from-base-100 to-base-300 min-h-screen">
        <Nav />
        <BaseButton
          btnLabel={"test"}
          btnType={"primary"}
          btnAction={() => null}
        />
      </div>
    </>
  );
}

export default App;
