import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Location.css';

// DUMMY_LOCATIONS 데이터는 이전과 동일합니다.
const DUMMY_LOCATIONS = [
  // ... (이전의 한성대입구점, 성신여대입구점 데이터 그대로 사용)
  {
    id: 1,
    name: '한성대입구점',
    address: '서울 성북구 성북로 16',
    manager: '김철수',
    capacity: 80,
    directions: '한성대입구역 6번 출구에서 도보 3분',
    imageFacility: '/images/facility_hansung.jpg',
    imageBuilding: '/images/building_hansung.png',
    imageMap: '/images/map_hansung.png',
    canReserve: true,
  },
  {
    id: 2,
    name: '성신여대입구점',
    address: '서울 성북구 동소문로 75',
    manager: '이영희',
    capacity: 60,
    directions: '성신여대입구역 4번 출구에서 도보 5분',
    imageFacility: '/images/facility_sungshin.jpg',
    imageBuilding: '/images/building_sungshin.png',
    imageMap: '/images/map_sungshin.png',
    canReserve: true,
  },
];


// =======================================================
// 1. 개별 지점 결과를 표시하는 컴포넌트 (UI 전면 수정)
// =======================================================
function LocationResultItem({ location }) {
  const navigate = useNavigate();

  const handleReservation = () => {
    // 한성대입구점 (id: 1) 일 때만 예약 페이지로 이동
    if (location.id === 1 && location.canReserve) {
      navigate('/reservation');
    } else {
      alert(`${location.name}은 현재 예약 페이지가 구현되지 않았거나 예약이 불가능합니다.`);
    }
  };

  // 텍스트 정보를 간결하게 압축하여 표시할 배열
  const compactInfo = [
    `주소: ${location.address}`,
    `관리자: ${location.manager}`,
    `최대 인원: ${location.capacity}명`,
    `오시는 길: ${location.directions}`,
  ];

  return (
    <div className="location-item large-layout">
      
      {/* 1. 좌측: 시설/건물 이미지 (클릭 이벤트 삭제) */}
      <div className="item-left-area">
        <div className="large-image-group">
            <img src={location.imageFacility} alt={`${location.name} 시설 사진`} className="facility-image" />
            <img src={location.imageBuilding} alt={`${location.name} 건물 사진`} className="building-image" />
        </div>
      </div>

      {/* 2. 우측: 상세 정보, 지도, 예약 버튼 영역 (구조 변경) */}
      <div className="item-right-area">

        {/* 2-1. 점포 이름 */}
        <h3 className="location-name">{location.name}</h3>

        {/* 2-2. 지도 이미지 영역 (이름 바로 밑) */}
        <div className="map-area">
            <img src={location.imageMap} alt={`${location.name} 지도 이미지`} className="map-image" />
            <p className="map-caption">지도 위치</p>
        </div>

        {/* 2-3. 상세 텍스트 정보 */}
        <div className="compact-text-info bottom">
            <h4 className="info-title">지점 상세 정보</h4>
            {compactInfo.map((info, index) => (
                <p key={index}>{info}</p>
            ))}
        </div>
        
        {/* 2-4. 예약 버튼 (가장 아래) */}
        <button 
            className={`reservation-button ${location.canReserve ? '' : 'disabled'}`} 
            onClick={handleReservation}
            disabled={!location.canReserve}
        >
            시설 예약하기
        </button>
        
      </div>
    </div>
  );
}


// =======================================================
// 2. 메인 Location 컴포넌트 (검색 기능) - 이전과 동일
// =======================================================
function Location() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => { setSearchResults(DUMMY_LOCATIONS); };
  const handleInputChange = (e) => { setSearchTerm(e.target.value); };
  const handleKeyDown = (e) => { if (e.key === 'Enter') { handleSearch(); } };

  return (
    <div className="location-page">
      <div className="page-container">
        <h1 className="page-title">지점 찾기</h1>
        <div className="location-content search-area">
          <div className="search-group">
            <input
              type="text"
              placeholder="지점 주소나 이름을 입력하세요(예: 한성대입구)"
              className="search-input"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              Search!
            </button>
          </div>
        </div>

        <div className="location-content location-results">
          {searchResults.length === 0 ? (
            <p className="placeholder-text">지점 검색 결과가 여기에 표시됩니다. 지점명을 입력하고 검색 버튼을 눌러주세요.</p>
          ) : (
            <div className="results-list">
              {searchResults.map((location) => (
                <LocationResultItem key={location.id} location={location} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Location;