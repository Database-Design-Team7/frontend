import './MyPage.css'

function MyPage() {
  // 더미데이터
  const userData = {
    name: '홍길동',
    email: 'hong@example.com',
    penalty: 2,
    penaltyHistory: [
      { id: 1, date: '2024-11-15', reason: '예약 노쇼', points: 1 },
      { id: 2, date: '2024-10-20', reason: '예약 취소 미통보', points: 1 }
    ],
    paymentMethods: [
      { id: 1, type: '신용카드', number: '****-****-****-1234', brand: 'VISA' },
      { id: 2, type: '계좌이체', bank: 'KB국민은행', account: '123-456-789012' }
    ],
    groups: [
      { id: 1, name: '스타트업 네트워크', role: '멤버', branch: '강남점' },
      { id: 2, name: '디자인 스터디', role: '리더', branch: '홍대점' }
    ],
    reservations: [
      { 
        id: 1, 
        facility: '회의실 A', 
        branch: '강남점', 
        date: '2024-12-20', 
        time: '14:00 - 16:00',
        status: '예약완료',
        capacity: 8
      },
      { 
        id: 2, 
        facility: '오픈 데스크', 
        branch: '홍대점', 
        date: '2024-12-22', 
        time: '10:00 - 18:00',
        status: '예약완료',
        capacity: 1
      },
      { 
        id: 3, 
        facility: '세미나실 B', 
        branch: '잠실점', 
        date: '2024-12-18', 
        time: '15:00 - 17:00',
        status: '사용완료',
        capacity: 12
      }
    ]
  }

  return (
    <div className="mypage-page">
      <div className="page-container">
        <h1 className="page-title">마이페이지</h1>
        
        {/* 사용자 정보 섹션 */}
        <div className="mypage-section">
          <div className="section-header">
            <h2 className="section-title">기본 정보</h2>
          </div>
          <div className="info-card">
            <div className="info-item">
              <span className="info-label">이름</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">이메일</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">패널티 점수</span>
              <span className={`info-value ${userData.penalty > 0 ? 'penalty-high' : ''}`}>
                {userData.penalty}점
              </span>
            </div>
          </div>
        </div>

        {/* 패널티 내역 */}
        <div className="mypage-section">
          <div className="section-header">
            <h2 className="section-title">패널티 내역</h2>
          </div>
          <div className="history-card">
            {userData.penaltyHistory.length > 0 ? (
              <div className="history-list">
                {userData.penaltyHistory.map((penalty) => (
                  <div key={penalty.id} className="history-item">
                    <div className="history-date">{penalty.date}</div>
                    <div className="history-reason">{penalty.reason}</div>
                    <div className="history-points">+{penalty.points}점</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">패널티 내역이 없습니다.</p>
            )}
          </div>
        </div>

        {/* 결제 수단 */}
        <div className="mypage-section">
          <div className="section-header">
            <h2 className="section-title">등록된 결제 수단</h2>
          </div>
          <div className="payment-card">
            {userData.paymentMethods.map((payment) => (
              <div key={payment.id} className="payment-item">
                <div className="payment-icon">
                  {payment.type === '신용카드' ? '💳' : '🏦'}
                </div>
                <div className="payment-info">
                  <div className="payment-type">{payment.type}</div>
                  <div className="payment-details">
                    {payment.number || `${payment.bank} ${payment.account}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 가입한 소모임 */}
        <div className="mypage-section">
          <div className="section-header">
            <h2 className="section-title">가입한 소모임</h2>
          </div>
          <div className="groups-card">
            {userData.groups.map((group) => (
              <div key={group.id} className="group-item">
                <div className="group-name">{group.name}</div>
                <div className="group-details">
                  <span className={`group-role ${group.role === '리더' ? 'role-leader' : ''}`}>
                    {group.role}
                  </span>
                  <span className="group-branch">{group.branch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 예약 내역 */}
        <div className="mypage-section">
          <div className="section-header">
            <h2 className="section-title">예약 내역</h2>
          </div>
          <div className="reservations-card">
            {userData.reservations.map((reservation) => (
              <div key={reservation.id} className="reservation-item">
                <div className="reservation-header">
                  <h3 className="reservation-facility">{reservation.facility}</h3>
                  <span className={`reservation-status status-${reservation.status === '예약완료' ? 'active' : 'completed'}`}>
                    {reservation.status}
                  </span>
                </div>
                <div className="reservation-details">
                  <div className="reservation-detail-item">
                    <span className="detail-label">지점</span>
                    <span className="detail-value">{reservation.branch}</span>
                  </div>
                  <div className="reservation-detail-item">
                    <span className="detail-label">날짜</span>
                    <span className="detail-value">{reservation.date}</span>
                  </div>
                  <div className="reservation-detail-item">
                    <span className="detail-label">시간</span>
                    <span className="detail-value">{reservation.time}</span>
                  </div>
                  <div className="reservation-detail-item">
                    <span className="detail-label">인원</span>
                    <span className="detail-value">{reservation.capacity}명</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage

