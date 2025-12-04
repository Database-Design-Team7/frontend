import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const handleSearch = () => {
    // 검색 로직 구현 예정
    console.log('검색:', { selectedBranch, selectedDate, selectedSize })
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🪑</div>
            <div className="logo-text">
              <div className="logo-main">COOFFICE</div>
              <div className="logo-sub">COFFICE</div>
            </div>
          </div>
          <nav className="nav">
            <a href="#location" className="nav-link">지점 찾기</a>
            <span className="nav-divider">|</span>
            <a href="#reservation" className="nav-link">시설 예약</a>
            <span className="nav-divider">|</span>
            <a href="#about" className="nav-link">소개</a>
            <span className="nav-divider">|</span>
            <a href="#contact" className="nav-link">문의하기</a>
            <span className="nav-divider">|</span>
            <a href="#login" className="nav-link">
              {isLoggedIn ? '마이페이지' : '로그인'}
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
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
                </select>
                
                <select 
                  className="search-dropdown"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">날짜</option>
                  <option value="today">오늘</option>
                  <option value="tomorrow">내일</option>
                  <option value="this-week">이번 주</option>
                </select>
                
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
      </main>
    </div>
  )
}

export default App
