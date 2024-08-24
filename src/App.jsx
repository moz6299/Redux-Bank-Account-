import CreateCustomer from "./Features/Customer/CreateCustomer";
import Customer from "./Features/Customer/Customer";
import AccountOperations from "./Features/Account/AccountOperations";
import BalanceDisplay from "./Features/Account/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const { fullName } = useSelector((store) => store.customer);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {fullName ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <CreateCustomer />
      )}
    </div>
  );
}

export default App;
