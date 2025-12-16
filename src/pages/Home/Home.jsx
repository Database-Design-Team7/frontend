import { useState, useRef, useEffect } from 'react'
import './Home.css'

function Home() {
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef(null)

  // 더미데이터 - 중형 시설들 (201호~204호)
  const facilities = [
    {
      id: 1,
      title: '201호',
      description: '넓고 쾌적한 사무 공간으로 팀 회의와 업무에 최적화된 환경을 제공합니다. 최신 시설과 편의 장비가 완비되어 있습니다.',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    },
    {
      id: 2,
      title: '202호',
      description: '모던한 인테리어의 사무실로 창의적인 업무 환경을 제공합니다. 자연 채광과 조용한 분위기로 집중력을 높일 수 있습니다.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    },
    {
      id: 3,
      title: '203호',
      description: '프리미엄 사무 공간으로 비즈니스 미팅과 프레젠테이션에 적합합니다. 대형 화면과 음향 시설이 완비되어 있습니다.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    },
    {
      id: 4,
      title: '204호',
      description: '컴포트한 업무 환경을 제공하는 사무실입니다. 개인 작업과 소규모 팀 협업 모두에 최적화된 공간입니다.',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop&q=80',
      branch: '한성대입구역',
      date: '12월 19일',
      size: '중형'
    }
  ]

  // showResults가 true가 되면 스크롤
  useEffect(() => {
    if (showResults && resultsRef.current) {
      // DOM이 완전히 렌더링된 후 스크롤
      const timer = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [showResults])

  const handleSearch = () => {
    // 모든 검색 조건이 선택되었는지 확인
    if (!selectedBranch || !selectedDate || !selectedSize) {
      alert('모든 검색 조건을 선택해주세요.')
      setShowResults(false)
      return
    }

    // 모든 조건이 선택되면 결과 표시
    setShowResults(true)
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

