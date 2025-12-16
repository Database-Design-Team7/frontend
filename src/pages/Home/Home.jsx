import { useState, useRef } from 'react'
import './Home.css'

function Home() {
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef(null)

  // 더미데이터 - 한성대입구역, 12월 19일, 중형 조건에 맞는 시설들
  const facilities = [
    {
      id: 1,
      title: 'Office Space',
      description: 'Make a home for yourself and your team with a private office. Fully-serviced and flexible, with everything included.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    },
    {
      id: 2,
      title: 'Coworking Membership',
      description: 'Enjoy coworking space access at over 3,000 inspiring and creative locations worldwide, all with a flexible contract.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    },
    {
      id: 3,
      title: 'Dedicated Desk',
      description: 'Enjoy your own private desk in a beautifully designed shared workspace.',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    },
    {
      id: 4,
      title: 'Virtual Office',
      description: 'Establish a presence for your business at any of our locations around the world.',
      image: 'https://images.unsplash.com/photo-1497366754035-2001989cee19?w=600&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    },
    {
      id: 5,
      title: 'Meeting rooms',
      description: 'Book meeting rooms on-demand, with all the support and services that you need.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    }
  ]

  const handleSearch = () => {
    // 검색 조건 확인 (고정값: 한성대입구역, 2024-12-19, 중형)
    const isMatch = 
      selectedBranch === 'hansung' && 
      selectedDate === '2024-12-19' && 
      selectedSize === 'medium'

    if (isMatch) {
      setShowResults(true)
      // 검색 결과 섹션으로 스크롤
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      setShowResults(false)
    }
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">
                <span>We'll find you</span>
                <span>The Perfect Space</span>
              </h1>
              
              <div className="search-container">
                <select 
                  className="search-dropdown"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="">지점 선택</option>
                  <option value="gangnam">강남점</option>
                  <option value="hongdae">홍대점</option>
                  <option value="jamsil">잠실점</option>
                  <option value="hansung">한성대입구역</option>
                </select>
                
                <input
                  type="date"
                  className="search-dropdown date-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  placeholder="날짜 선택"
                />
                
                <select 
                  className="search-dropdown"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">크기</option>
                  <option value="small">소형 (1-5명)</option>
                  <option value="medium">중형 (6-10명)</option>
                  <option value="large">대형 (11명 이상)</option>
                </select>
                
                <button className="search-button" onClick={handleSearch}>
                  Search!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="results-section" ref={resultsRef}>
          <div className="results-container">
            <h2 className="results-title">We offer creative working environments</h2>
            <div className="facilities-grid">
              {facilities.map((facility) => (
                <div key={facility.id} className="facility-card">
                  <div className="facility-image">
                    <img src={facility.image} alt={facility.title} />
                  </div>
                  <div className="facility-content">
                    <h3 className="facility-title">{facility.title}</h3>
                    <p className="facility-description">{facility.description}</p>
                    <div className="facility-buttons">
                      <button className="facility-btn-primary">지금 문의하기</button>
                      <button className="facility-btn-secondary">Learn more</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

