import { ThemeProvider } from "@emotion/react";
import AppRouter from "./Routes/AppRouter";
import { theme } from "./App/Layout/Theme";
import { LoadingProvider } from "./Hooks/LoadingContext";
import { ToastContainer } from "react-toastify";
import TimerController from "./Hooks/TimerController";
import ErrorBoundary from "./ErrorBoundary";


function App() {

  return (
    <ThemeProvider theme={theme}>
      <TimerController>
        <LoadingProvider>
          <ToastContainer />
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </LoadingProvider>
      </TimerController>
    </ThemeProvider>
  )
}

export default App
