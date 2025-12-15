import { useLocation } from 'react-router-dom'
import './Reservation.css'

// 점포 더미 데이터
const dummyBranches = [
  { id: 1, name: '건대입구점', location: '서울시 광진구', size: 'Large' },
  { id: 2, name: '한성대입구점', location: '서울시 성북구', size: 'Small' },
  { id: 3, name: '홍대입구점', location: '서울시 마포구', size: 'Medium' },
]

// 개별 점포 항목 컴포넌트 
function BranchItem({ branch, index }) {
  return (
    <div className="branch-item">
      {/* 1. 순번, 점포명 영역 */}
      <div className="branch-info">
        <span className="branch-sequence">{index + 1}</span>
        <span className="branch-name">{branch.name}</span>
      </div>

      {/* 2. 버튼 영역 */}
      <div className="branch-actions">
        {/* 점포 상세 정보 버튼 */}
        <button className="action-button detail-button" onClick={() => console.log(`${branch.name} 상세 정보`)}>
          상세 정보
        </button>
        {/* 점포 스케줄 버튼 */}
        <button className="action-button schedule-button" onClick={() => console.log(`${branch.name} 스케줄 조회`)}>
          스케줄 조회
        </button>
        {/* 즉시 예약 버튼 */}
        <button className="action-button reserve-button" onClick={() => console.log(`${branch.name} 즉시 예약`)}>
          즉시 예약
        </button>
      </div>
    </div>
  )
}

function Reservation() {
  const location = useLocation()
  
  const branchCount = dummyBranches.length; 

  return (
    <div className="reservation-page">
      <div className="page-container">
        <h1 className="page-title">시설 예약</h1>
        
        {/* 흰 박스 시작 (reservation-content) */}
        <div className="reservation-content">
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center', 
            marginBottom: '1.5rem', 
            paddingBottom: '0.5rem', 
            borderBottom: '1px solid #eee' 
          }}>
            
           
            <span style={{ 
              fontSize: '1.5rem', 
              color: '#000000', 
              fontWeight: 'bold'
            }}>
              총 {branchCount}개의 점포 존재
            </span>

            {/* 우측: 정렬 기준 (검정색) */}
            <span style={{ 
              fontSize: '1rem', 
              color: '#000000', 
              fontWeight: '600'
            }}>
              정렬: 가나다순
            </span>
          </div>
          
          {/* 점포 목록을 담을 컨테이너 */}
          <div className="branch-list">
            {dummyBranches.map((branch, index) => (
              <BranchItem 
                key={branch.id} 
                branch={branch} 
                index={index} 
              />
            ))}
            
            {/* 목록이 비어있다면 */}
            {branchCount === 0 && (
              <p style={{ textAlign: 'center', color: '#888' }}>
                선택하신 조건에 맞는 지점이 없습니다.
              </p>
            )}
            
          </div>
          
        </div>
        {/* 흰 박스 끝 */}
        
      </div>
    </div>
  )
}

export default Reservation