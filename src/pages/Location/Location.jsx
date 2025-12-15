import './Location.css'

function Location() {
  return (
    <div className="location-page">
      <div className="page-container">
        <h1 className="page-title">지점 찾기</h1>
        
        {/* === 1. 검색 입력과 버튼을 포함하는 상단 박스 === */}
        <div className="location-content search-area"> {/* 'location-content'는 디자인, 'search-area'는 레이아웃 담당 */}
          <div className="search-group">
            {/* 텍스트를 적을 수 있는 입력 박스 */}
            <input
              type="text"
              placeholder="지점 주소나 이름을 입력하세요(예: 한성대입구)"
              className="search-input"
            />
            
            {/* Search! 버튼 */}
            <button className="search-button">
              Search!
            </button>
          </div>
        </div>

        {/* === 2. 검색 결과를 표시할 하단 박스 === */}
        {/* 상단 박스와 간격을 두기 위해 'location-results' 클래스를 사용합니다. */}
        <div className="location-content location-results">
          {/* 여기에 지점 검색 결과(시각화 차트, 목록 등)가 표시될 것입니다. */}
          <p className="placeholder-text">검색 결과가 여기에 표시됩니다.</p>
        </div>

      </div>
    </div>
  )
}

export default Location