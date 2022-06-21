import Form from "./components/Form";
import LinkList from "./components/LinkList";

function App() {
  return (
    <div className=" bg-blue-200 flex p-10 items-center justify-center space-x-5 flex-col h-screen">
      <Form />
      <LinkList />
    </div>
  );
}

export default App;
