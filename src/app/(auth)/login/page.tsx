import React from 'react'
import LoginPage from '@/Authentication/LoginPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login to careerawesome",
  description: "Build your resume ",
};

function page() {
  return (
    <div>
      <main>
        <LoginPage/>
      </main>
    </div>
  )
}

export default page