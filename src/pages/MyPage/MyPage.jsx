import React, { useState } from 'react'; // useState 임포트

import './MyPage.css'

// 인원 관리 팝업 컴포넌트
function ManageApplicantsModal({ group, applicants, onClose, onAction }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">'{group.name}' 지원자 관리</h3>
                <div className="applicant-list">
                    {applicants.length > 0 ? (
                        applicants.map(applicant => (
                            <div key={applicant.id} className="applicant-item">
                                <div className="applicant-info">
                                    <p><strong>성명:</strong> {applicant.name}</p>
                                    <p><strong>지원 이유:</strong> {applicant.reason}</p>
                                </div>
                                <div className="applicant-actions">
                                    <button className="allow-button" onClick={() => onAction(applicant.id, '허가')}>지원 허가</button>
                                    <button className="reject-button" onClick={() => onAction(applicant.id, '반려')}>지원 반려</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-message">현재 대기 중인 지원자가 없습니다.</p>
                    )}
                </div>
                <button className="modal-close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

// 소모임 관리 팝업 컴포넌트
function ManageGroupModal({ group, initialMembers, onClose, onSave }) {
    const [members, setMembers] = useState(initialMembers);

    const handleRoleChange = (memberId, newRole) => {
        setMembers(members.map(member => 
            member.id === memberId ? { ...member, role: newRole } : member
        ));
    };

    const handleSave = () => {
        onSave(members);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">'{group.name}' 소모임 멤버 관리</h3>
                <div className="member-list">
                    {members.map(member => (
                        <div key={member.id} className="member-item">
                            <div className="member-info">
                                <p><strong>{member.name}</strong></p>
                                <p className="member-email">{member.email}</p>
                            </div>
                            <select 
                                value={member.role} 
                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                className="role-dropdown"
                            >
                                <option value="리더">리더</option>
                                <option value="부리더">부리더</option>
                                <option value="일반">일반</option>
                            </select>
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="save-button" onClick={handleSave}>저장</button>
                    <button className="modal-close-button" onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

function MyPage() {
  // 더미데이터
  const initialUserData = {
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

  // 상태 관리
    const [userData, setUserData] = useState(initialUserData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGroups, setFilteredGroups] = useState(initialUserData.groups);
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);
    
    // 팝업용 더미 데이터
    const [applicants, setApplicants] = useState([
        { id: 101, name: '박민준', reason: '디자인 포트폴리오 강화 희망' },
        { id: 102, name: '최지우', reason: 'UX/UI 스터디 경험 공유' },
    ]);
    const [groupMembers, setGroupMembers] = useState([
        { id: 1, name: '홍길동', email: 'hong@example.com', role: '리더' },
        { id: 2, name: '이순신', email: 'lee@example.com', role: '일반' },
        { id: 3, name: '유관순', email: 'yoo@example.com', role: '부리더' },
        { id: 4, name: '안중근', email: 'ahn@example.com', role: '일반' },
    ]);
    const currentLeaderGroup = userData.groups.find(g => g.role === '리더');


    // 검색 로직
    const handleSearch = () => {
        // 텍스트와 관계없이 '디자인 스터디' (id: 2)만 남김
        const result = initialUserData.groups.filter(group => group.id === 2);
        setFilteredGroups(result);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    // 지원자 관리 로직
    const handleApplicantAction = (applicantId, action) => {
        const applicant = applicants.find(a => a.id === applicantId);
        if (applicant) {
            alert(`"${applicant.name}" 님의 지원이 ${action}되었습니다.`);
            setApplicants(applicants.filter(a => a.id !== applicantId));
        }
    };

    // 소모임 멤버 권한 변경 로직
    const handleSaveMembers = (newMembers) => {
        setGroupMembers(newMembers); // 상태 업데이트
        alert("권한이 저장되었습니다.");
    };

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
          <div className="section-header group-section-header"> {/* [추가/수정] 검색바를 위한 클래스 추가 */}
            <h2 className="section-title">가입한 소모임</h2>
            {/* 소모임 검색 입력란 */}
            <div className="group-search-box">
                <input 
                    type="text"
                    placeholder="검색할 소모임명을 입력하세요."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-button" onClick={handleSearch}>검색</button>
            </div>
          </div>
          <div className="groups-card">
            {filteredGroups.map((group) => ( // filteredGroups 사용
              <div key={group.id} className="group-item">
                <div className="group-name">{group.name}</div>
                <div className="group-details">
                  <span className={`group-role ${group.role === '리더' ? 'role-leader' : ''}`}>
                    {group.role}
                  </span>
                  <span className="group-branch">{group.branch}</span>
                    
                    {/* 리더일 경우 버튼 추가 */}
                    {group.role === '리더' && (
                        <div className="leader-actions">
                            <button className="action-button" onClick={() => setShowApplicantsModal(true)}>인원 관리</button>
                            <button className="action-button" onClick={() => setShowGroupModal(true)}>소모임 관리</button>
                        </div>
                    )}
                </div>
              </div>
            ))}
            {filteredGroups.length === 0 && <p className="empty-message">가입된 소모임이 없습니다.</p>}
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
      {/* 모달 렌더링 */}
    {showApplicantsModal && currentLeaderGroup && (
        <ManageApplicantsModal
            group={currentLeaderGroup}
            applicants={applicants}
            onClose={() => setShowApplicantsModal(false)}
            onAction={handleApplicantAction}
        />
    )}
    
    {showGroupModal && currentLeaderGroup && (
        <ManageGroupModal
            group={currentLeaderGroup}
            initialMembers={groupMembers}
            onClose={() => setShowGroupModal(false)}
            onSave={handleSaveMembers}
        />
    )}
    </div>
  )
}

export default MyPage

