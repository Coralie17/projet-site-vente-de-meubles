import React from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Meubles from './components/Meubles';
import Footer from './components/Footer';

import Form from './components/Form';

export default function Home() {
  return (<>
    <main>
      <Header />
      <Navbar />
      <Meubles />
      <Footer />
      <Form />
    </main>
    </>
  );
}