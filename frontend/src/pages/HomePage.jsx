import { useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUi from '../components/RateLimitedUi';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);

  return (
    <div className='min-h-screen'>
      <NavBar />
      {isRateLimited && <RateLimitedUi /> }
    </div>
  )
}

export default HomePage