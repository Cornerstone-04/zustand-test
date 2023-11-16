import Column from "./components/Column";

const App = () => {
  return (
    <div className="app">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
};

export default App;
