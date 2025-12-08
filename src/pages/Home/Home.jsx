import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    // 검색 로직 구현 예정
    console.log('검색:', { selectedBranch, selectedDate, selectedSize })
    // 검색 결과 페이지로 이동하거나 예약 페이지로 이동
    navigate('/reservation', { 
      state: { branch: selectedBranch, date: selectedDate, size: selectedSize }
    })
  }

  return (
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
    </div>
  )
}

export default Home

