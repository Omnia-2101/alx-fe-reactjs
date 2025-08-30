import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div className="p-8">
      <RegistrationForm />
      <hr className="my-8" />
      <FormikForm />
    </div>
  );
}

export default App
