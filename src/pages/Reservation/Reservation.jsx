import React, { useState } from 'react';
import './Reservation.css';

// --- [데이터 영역] ---
const ROOM_TYPES = [
  { id: 'small', type: '소형', capacity: '1~5인' },
  { id: 'medium', type: '중형', capacity: '6~10인' },
  { id: 'large', type: '대형', capacity: '11인~' },
];

const ROOM_DETAILS_MOCK = {
  small: [
    {
      roomNo: '301호',
      desc: '조용한 소형 회의실입니다. 화이트보드 구비.',
      equipment: '모니터, 화이트보드',
      image: '/images/room1.jpg'
    },
    {
      roomNo: '302호',
      desc: '창가 쪽 소형 룸입니다. 채광이 좋습니다.',
      equipment: '개별 에어컨, 콘센트 다수',
      image: '/images/room2.jpg'
    },
  ],
  medium: [
    {
      roomNo: '401호',
      desc: '중형 프로젝트 룸입니다.',
      equipment: '대형 TV, 8인 테이블',
      image: '/images/room3.jpg'
    },
  ],
  large: [
    {
      roomNo: '501호',
      desc: '대형 세미나실입니다.',
      equipment: '빔프로젝터, 마이크, 강연대',
      image: '/images/room4.jpg'
    },
  ]
};

// 1. 오늘 날짜를 'YYYY-MM-DD' 문자열로 구하는 함수
const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// 2. 날짜별로 예약 상태가 다르게 보이도록 만드는 더미 함수
// (실제 백엔드 연동 전까지 테스트용입니다)
const getMockScheduleByDate = (dateStr) => {
  const times = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  // 날짜 문자열의 길이를 이용해서 가짜 랜덤을 만듭니다 (날짜마다 패턴이 바뀜)
  const randomSeed = dateStr.split('-').reduce((acc, cur) => acc + parseInt(cur), 0);

  return times.map((time, i) => {
    // 임의의 규칙으로 예약 마감(true)/가능(false) 설정
    const isReserved = (randomSeed + i) % 3 === 0;
    return { time, isReserved };
  });
};


// --- [ScheduleModal 컴포넌트 전체 교체] ---
function ScheduleModal({ room, onClose }) {
  // [State] 날짜 선택 (기본값: 오늘)
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  // [State] 시간 선택
  const [selectedTime, setSelectedTime] = useState(null);

  // 선택된 날짜에 맞는 스케줄 데이터 가져오기
  const scheduleData = getMockScheduleByDate(selectedDate);

  const handleReserve = () => {
    if (!selectedTime) return alert("시간을 선택해주세요.");

    // 최종 예약 확인
    const confirmMsg = `
      [예약 확인]
      장소: ${room.roomNo}
      날짜: ${selectedDate}
      시간: ${selectedTime}
      
      예약하시겠습니까?
    `;

    if (window.confirm(confirmMsg)) {
      alert("예약이 완료되었습니다!");
      onClose();
    }
  };

  return (
      <div className="modal-overlay z-high" onClick={onClose}>
        <div className="schedule-modal-content" onClick={(e) => e.stopPropagation()}>

          <div className="modal-header">
            <h3>📅 {room.roomNo} 예약 스케줄</h3>
            <button className="close-btn" onClick={onClose}>X</button>
          </div>

          <div className="schedule-body">
            {/* [추가됨] 날짜 선택 영역 */}
            <div className="date-picker-container">
              <label htmlFor="date-input">날짜 선택: </label>
              <input
                  id="date-input"
                  type="date"
                  className="date-input"
                  value={selectedDate}
                  min={getTodayString()} /* 오늘 이전 날짜 선택 불가 */
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime(null); // 날짜 바꾸면 선택한 시간 초기화
                  }}
              />
            </div>

            <p className="guide-text">
              선택하신 날짜(<strong>{selectedDate}</strong>)의 예약 가능한 시간입니다.
            </p>

            <div className="time-grid">
              {scheduleData.map((slot, i) => (
                  <button
                      key={i}
                      className={`time-slot ${slot.isReserved ? 'reserved' : ''} ${selectedTime === slot.time ? 'selected' : ''}`}
                      disabled={slot.isReserved}
                      onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </button>
              ))}
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={onClose}>취소</button>
              <button
                  className="confirm-btn"
                  disabled={!selectedTime}
                  onClick={handleReserve}
              >
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}


// --- [컴포넌트 2] 룸 목록 모달 (중간 팝업) ---
function RoomListModal({ typeData, onClose, onOpenSchedule }) {
  const details = ROOM_DETAILS_MOCK[typeData.id] || [];

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>

          <div className="modal-header">
            <h2>{typeData.type} ({typeData.capacity}) 룸 목록</h2>
            <button className="close-btn" onClick={onClose}>X</button>
          </div>

          <div className="modal-body">
            {details.map((room, idx) => (
                <div key={idx} className="modal-room-item">
                  <h3 className="room-number">{room.roomNo}</h3>

                  <div className="room-content-wrapper">
                    {/* 왼쪽: 사진 */}
                    <div className="room-photo-box">
                      <img
                          src={room.image}
                          alt="room"
                          className="room-image"
                          onError={(e) => {e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}}
                      />
                    </div>

                    {/* 오른쪽: 설명 및 예약버튼 */}
                    <div className="room-desc-box">
                      <div className="desc-text">
                        <p><strong>설명:</strong> {room.desc}</p>
                        <p><strong>장비:</strong> {room.equipment}</p>
                      </div>

                      {/* 이 버튼을 누르면 스케줄 모달이 뜹니다 */}
                      <button
                          className="modal-schedule-btn"
                          onClick={() => onOpenSchedule(room)}
                      >
                        스케줄 확인 및 예약
                      </button>
                    </div>
                  </div>
                </div>
            ))}
            {details.length === 0 && <p>이용 가능한 룸이 없습니다.</p>}
          </div>

        </div>
      </div>
  );
}


// --- [메인 페이지] ---
function Reservation() {
  const [selectedType, setSelectedType] = useState(null); // 룸 타입 선택 상태
  const [bookingRoom, setBookingRoom] = useState(null);   // 스케줄 예약하려는 룸 상태

  return (
      <div className="reservation-page">
        <div className="page-container">

          {/* 1. 스케줄 모달 (가장 위에 뜸) */}
          {bookingRoom && (
              <ScheduleModal
                  room={bookingRoom}
                  onClose={() => setBookingRoom(null)}
              />
          )}

          {/* 2. 룸 목록 모달 (중간에 뜸) */}
          {selectedType && (
              <RoomListModal
                  typeData={selectedType}
                  onClose={() => setSelectedType(null)}
                  onOpenSchedule={(room) => setBookingRoom(room)} // 예약 버튼 누르면 bookingRoom 설정
              />
          )}

          <h1 className="page-title">시설 예약</h1>
          <div className="reservation-content">
            <div className="content-header">
              <span className="header-title">원하시는 룸 타입을 선택해주세요</span>
            </div>

            <div className="branch-list">
              {ROOM_TYPES.map((item) => (
                  <div key={item.id} className="room-type-item">
                    <div className="room-info">
                      <span className="room-type-title">{item.type}</span>
                      <span className="room-capacity">({item.capacity})</span>
                    </div>
                    <button
                        className="action-button detail-button"
                        onClick={() => setSelectedType(item)}
                    >
                      상세 정보
                    </button>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Reservation;