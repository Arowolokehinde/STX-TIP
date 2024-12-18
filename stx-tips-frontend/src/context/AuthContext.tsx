// import { createContext, useEffect, useReducer } from "react";

// const initialState = {
//   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
//   token: localStorage.getItem("token"),
//   activationToken: localStorage.getItem("activationToken"),
//   activation_Code: localStorage.getItem("activation_Code")
// };

// export const authContext = createContext(initialState);

// interface State {
//   user: any;
//   token: string | null;
//   activationToken: string | null;
//   activation_Code: string | null;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// const authReducer = (state: State, action: Action): State =>
// {
//   switch (action.type)
//   {
//     case "ACTIVATE_USER":
//       return {
//         activationToken: action.payload.activationToken,
//         activation_Code: action.payload.activation_Code,
//         user: null,
//         token: null
//       }

   
    

//     default:
//       return state;
//   }
// };

// import { ReactNode } from "react";

// export const AuthContextProvider = ({ children }: { children: ReactNode }) =>
// {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() =>
//   {
//     localStorage.setItem("user", JSON.stringify(state.user))
//     localStorage.setItem("activationToken", state.activationToken);
//     localStorage.setItem("activation_Code", state.activation_Code);
//   }, [state])

//   return (
//     <authContext.Provider
//       value={{
//         user: state.user,
//         token: state.token,
//         activationToken: state.activationToken,
//         activation_Code: state.activation_Code,
//         dispatch,
//       }}
//     >
//       {children}
//     </authContext.Provider>
//   );
// };

import { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";

// Define types
interface User {
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  activationToken: string | null;
  activation_Code: string | null;
}

type AuthAction = {
  type: "ACTIVATE_USER";
  payload: {
    activationToken: string;
    activation_Code: string;
  };
};

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// Initialize state
const initialState: AuthState = {
  user: localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user") as string) 
    : null,
  activationToken: localStorage.getItem("activationToken") || null,
  activation_Code: localStorage.getItem("activation_Code") || null
};

// Create context with type assertion
export const authContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "ACTIVATE_USER":
      return {
        ...state,
        activationToken: action.payload.activationToken,
        activation_Code: action.payload.activation_Code,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
    if (state.activationToken) {
      localStorage.setItem("activationToken", state.activationToken);
    }
    if (state.activation_Code) {
      localStorage.setItem("activation_Code", state.activation_Code);
    }
  }, [state]);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};