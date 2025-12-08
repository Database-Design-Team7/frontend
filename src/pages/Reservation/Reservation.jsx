import { useLocation } from 'react-router-dom'
import './Reservation.css'

function Reservation() {
  const location = useLocation()
  const searchParams = location.state || {}

  return (
    <div className="reservation-page">
      <div className="page-container">
        <h1 className="page-title">시설 예약</h1>
        <div className="reservation-content">
          <p>시설 예약 페이지입니다.</p>
          {searchParams.branch && (
            <p>선택된 지점: {searchParams.branch}</p>
          )}
          {searchParams.date && (
            <p>선택된 날짜: {searchParams.date}</p>
          )}
          {searchParams.size && (
            <p>선택된 크기: {searchParams.size}</p>
          )}
          {/* 예약 관련 컴포넌트들을 여기에 추가하세요 */}
        </div>
      </div>
    </div>
  )
}

export default Reservation

