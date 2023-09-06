import { useState } from "react";

import Header from "./components/header";
import Main from "./components/main";

function App() {
  const [admin, setAdmin] = useState(undefined);

  return (
    <div className="App">
      <Header admin={admin} />
      <Main admin={admin} setAdmin={setAdmin} />
    </div>
  );
}

export default App;
