import { useState } from 'react'
import Product from './Product'
import Home from './Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import Check from './check';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/check" element={<Check />} /> 
        {/* conflict ke lie CheckBranch */}

      </Routes>
    </Router>
    </QueryClientProvider>
  )
}

export default App
