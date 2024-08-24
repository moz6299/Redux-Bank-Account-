import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withDraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        (state.loan = action.payload.amount),
          (state.loanPurpose = action.payload.purpose),
          (state.balance = state.balance + action.payload.amount);
      },
    },
    payLoan(state) {
      (state.loan = 0),
        (state.loanPurpose = ""),
        (state.balance = state.balance - state.loan);
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

export default accountSlice.reducer;

export const { withDraw, requestLoan, payLoan } = accountSlice.actions;

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch) => {
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convereted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convereted });
  };
};
