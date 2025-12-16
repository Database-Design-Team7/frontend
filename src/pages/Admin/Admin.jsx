import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './Admin.css'

function Admin() {
  const {
    branches,
    facilities,
    equipment,
    events,
    addFacility,
    deleteFacility,
    updateBranch,
    addEquipmentToFacility,
    removeEquipmentFromFacility,
    addEquipment,
    deleteEquipment,
    updateEquipment,
    addEvent,
    deleteEvent,
    updateEvent,
    getFacilityEquipment,
    getFacilityEvents
  } = useApp()

  // 한성대역점 찾기
  const hansungBranch = branches.find(b => b.name === '한성대역점')

  // 한성대역점의 시설 목록
  const hansungFacilities = facilities.filter(
    f => f.branchId === hansungBranch?.branchId
  )

  // 시설 등록 상태
  const [showFacilityForm, setShowFacilityForm] = useState(false)
  const [facilityForm, setFacilityForm] = useState({
    facilityName: '',
    capacity: 10
  })

  // 장비 연결 상태
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [showEquipmentForm, setShowEquipmentForm] = useState(false)

  // 장비 관리 상태
  const [showEquipmentManagement, setShowEquipmentManagement] = useState(false)
  const [showAddEquipmentForm, setShowAddEquipmentForm] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState(null)
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: 'OTHER',
    quantity: 1
  })

  // 이벤트 등록 상태
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEventId, setEditingEventId] = useState(null)
  const [eventForm, setEventForm] = useState({
    facilityId: '',
    title: '',
    startTime: '13:00',
    endTime: '18:00',
    description: ''
  })

  // 지점 정보 수정 상태
  const [showBranchEditForm, setShowBranchEditForm] = useState(false)
  const [branchEditForm, setBranchEditForm] = useState({
    name: '',
    address: '',
    contactNumber: '',
    operatingHours: ''
  })

  // 시설 등록 처리
  const handleAddFacility = (e) => {
    e.preventDefault()
    if (!hansungBranch) {
      return
    }

    addFacility({
      branchId: hansungBranch.branchId,
      facilityName: facilityForm.facilityName,
      capacity: parseInt(facilityForm.capacity)
    })

    setFacilityForm({ facilityName: '', capacity: 10 })
    setShowFacilityForm(false)
  }

  // 시설 삭제 처리
  const handleDeleteFacility = (facilityId) => {
    if (window.confirm('정말 이 시설을 삭제하시겠습니까? 연결된 장비와 이벤트도 함께 삭제됩니다.')) {
      deleteFacility(facilityId)
    }
  }

  // 장비를 시설에 등록
  const handleRegisterEquipment = (equipmentId) => {
    if (!selectedFacility) {
      return
    }

    addEquipmentToFacility(selectedFacility, equipmentId)
  }

  // 시설에서 장비 등록 해제
  const handleUnregisterEquipment = (equipmentId) => {
    if (!selectedFacility) {
      return
    }

    removeEquipmentFromFacility(selectedFacility, equipmentId)
  }

  // 새 장비 추가
  const handleAddNewEquipment = (e) => {
    e.preventDefault()
    addEquipment({
      name: equipmentForm.name,
      type: equipmentForm.type,
      quantity: parseInt(equipmentForm.quantity) || 1
    })
    setEquipmentForm({ name: '', type: 'OTHER', quantity: 1 })
    setShowAddEquipmentForm(false)
  }

  // 장비 수정
  const handleUpdateEquipment = (equipmentId) => {
    const targetEquipment = equipment.find(eq => eq.equipmentId === equipmentId)
    if (targetEquipment) {
      setEditingEquipment(equipmentId)
      setEquipmentForm({
        name: targetEquipment.name,
        type: targetEquipment.type,
        quantity: targetEquipment.quantity || 1
      })
      setShowAddEquipmentForm(true)
    }
  }

  // 장비 수정 저장
  const handleSaveEquipment = (e) => {
    e.preventDefault()
    if (editingEquipment) {
      updateEquipment(editingEquipment, {
        name: equipmentForm.name,
        type: equipmentForm.type,
        quantity: parseInt(equipmentForm.quantity) || 1
      })
      setEditingEquipment(null)
      setEquipmentForm({ name: '', type: 'OTHER', quantity: 1 })
      setShowAddEquipmentForm(false)
    }
  }

  // 장비 삭제
  const handleDeleteEquipment = (equipmentId) => {
    if (window.confirm('정말 이 장비를 삭제하시겠습니까? 시설에 등록된 장비도 함께 제거됩니다.')) {
      deleteEquipment(equipmentId)
    }
  }

  // 이벤트 등록 처리
  const handleAddEvent = (e) => {
    e.preventDefault()
    
    if (!eventForm.facilityId || !eventForm.title) {
      return
    }

    // 날짜는 오늘 날짜로 설정
    const today = new Date().toISOString().split('T')[0]
    const startDateTime = `${today}T${eventForm.startTime}:00`
    const endDateTime = `${today}T${eventForm.endTime}:00`

    addEvent({
      facilityId: eventForm.facilityId,
      title: eventForm.title,
      startTime: startDateTime,
      endTime: endDateTime,
      description: eventForm.description
    })

    setEventForm({
      facilityId: '',
      title: '',
      startTime: '13:00',
      endTime: '18:00',
      description: ''
    })
    setEditingEventId(null)
    setShowEventForm(false)
  }

  // 이벤트 수정 처리
  const handleUpdateEvent = (e) => {
    e.preventDefault()
    
    if (!eventForm.facilityId || !eventForm.title || !editingEventId) {
      return
    }

    // 날짜는 오늘 날짜로 설정
    const today = new Date().toISOString().split('T')[0]
    const startDateTime = `${today}T${eventForm.startTime}:00`
    const endDateTime = `${today}T${eventForm.endTime}:00`

    updateEvent(editingEventId, {
      facilityId: eventForm.facilityId,
      title: eventForm.title,
      startTime: startDateTime,
      endTime: endDateTime,
      description: eventForm.description
    })

    setEventForm({
      facilityId: '',
      title: '',
      startTime: '13:00',
      endTime: '18:00',
      description: ''
    })
    setEditingEventId(null)
    setShowEventForm(false)
  }

  // 이벤트 수정 모드로 전환
  const handleEditEvent = (event) => {
    setEditingEventId(event.eventId)
    setEventForm({
      facilityId: event.facilityId,
      title: event.title,
      startTime: new Date(event.startTime).toTimeString().slice(0, 5),
      endTime: new Date(event.endTime).toTimeString().slice(0, 5),
      description: event.description || ''
    })
    setShowEventForm(true)
  }

  // 이벤트 삭제 처리
  const handleDeleteEvent = (eventId) => {
    if (window.confirm('정말 이 이벤트를 삭제하시겠습니까?')) {
      deleteEvent(eventId)
    }
  }

  // 지점 정보 수정 처리
  const handleUpdateBranch = (e) => {
    e.preventDefault()
    if (!hansungBranch) {
      return
    }

    updateBranch(hansungBranch.branchId, branchEditForm)
    setShowBranchEditForm(false)
  }

  // 지점 정보 수정 폼 열기
  const handleOpenBranchEdit = () => {
    if (hansungBranch) {
      setBranchEditForm({
        name: hansungBranch.name,
        address: hansungBranch.address,
        contactNumber: hansungBranch.contactNumber,
        operatingHours: hansungBranch.operatingHours
      })
      setShowBranchEditForm(true)
    }
  }

  return (
    <div className="admin-page">
      <div className="page-container">
        <h1 className="page-title">관리자 페이지</h1>
        
        <div className="admin-content">
          {/* 한성대역점 정보 */}
          <div className="admin-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="admin-section-title">지점 정보</h2>
              {!showBranchEditForm && (
                <button 
                  className="admin-button primary"
                  onClick={handleOpenBranchEdit}
                >
                  수정
                </button>
              )}
            </div>
            {hansungBranch ? (
              <>
                {!showBranchEditForm ? (
                  <div className="branch-info">
                    <p><strong>지점명:</strong> {hansungBranch.name}</p>
                    <p><strong>주소:</strong> {hansungBranch.address}</p>
                    <p><strong>연락처:</strong> {hansungBranch.contactNumber}</p>
                    <p><strong>운영시간:</strong> {hansungBranch.operatingHours}</p>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateBranch} className="admin-form">
                    <div className="form-group">
                      <label>지점명</label>
                      <input
                        type="text"
                        value={branchEditForm.name}
                        onChange={(e) => setBranchEditForm({ ...branchEditForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>주소</label>
                      <input
                        type="text"
                        value={branchEditForm.address}
                        onChange={(e) => setBranchEditForm({ ...branchEditForm, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>연락처</label>
                      <input
                        type="text"
                        value={branchEditForm.contactNumber}
                        onChange={(e) => setBranchEditForm({ ...branchEditForm, contactNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>운영시간</label>
                      <input
                        type="text"
                        value={branchEditForm.operatingHours}
                        onChange={(e) => setBranchEditForm({ ...branchEditForm, operatingHours: e.target.value })}
                        placeholder="예: 09:00-22:00"
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="submit" className="admin-button primary">저장</button>
                      <button 
                        type="button" 
                        className="admin-button secondary"
                        onClick={() => setShowBranchEditForm(false)}
                      >
                        취소
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <p>한성대역점 정보를 찾을 수 없습니다.</p>
            )}
          </div>

          {/* 시설 관리 */}
          <div className="admin-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="admin-section-title">시설 관리</h2>
              <button 
                className="admin-button primary"
                onClick={() => setShowFacilityForm(!showFacilityForm)}
              >
                {showFacilityForm ? '취소' : '+ 시설 등록'}
              </button>
            </div>

            {showFacilityForm && (
              <form onSubmit={handleAddFacility} className="admin-form">
                <div className="form-group">
                  <label>시설명</label>
                  <input
                    type="text"
                    value={facilityForm.facilityName}
                    onChange={(e) => setFacilityForm({ ...facilityForm, facilityName: e.target.value })}
                    placeholder="예: 301호"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>수용 인원</label>
                  <input
                    type="number"
                    value={facilityForm.capacity}
                    onChange={(e) => setFacilityForm({ ...facilityForm, capacity: e.target.value })}
                    min="1"
                    required
                  />
                </div>
                <button type="submit" className="admin-button primary">등록</button>
              </form>
            )}

            {/* 시설 목록 */}
            <div className="facility-list">
              {hansungFacilities.length === 0 ? (
                <p>등록된 시설이 없습니다.</p>
              ) : (
                hansungFacilities.map(facility => (
                  <div key={facility.facilityId} className="facility-item">
                    <div className="facility-header">
                      <div>
                        <h3>{facility.facilityName}</h3>
                        <span>수용인원: {facility.capacity}명</span>
                      </div>
                      <button
                        className="admin-button"
                        style={{ 
                          background: '#e53e3e', 
                          color: 'white',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem'
                        }}
                        onClick={() => handleDeleteFacility(facility.facilityId)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 장비 관리 */}
          <div className="admin-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="admin-section-title">장비 관리</h2>
              <button 
                className="admin-button primary"
                onClick={() => setShowEquipmentManagement(!showEquipmentManagement)}
              >
                {showEquipmentManagement ? '시설에 등록' : '장비 목록 관리'}
              </button>
            </div>

            {showEquipmentManagement ? (
              /* 장비 목록 관리 */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3>장비 목록</h3>
                  <button 
                    className="admin-button primary"
                    onClick={() => {
                      if (showAddEquipmentForm) {
                        setShowAddEquipmentForm(false)
                        setEditingEquipment(null)
                        setEquipmentForm({ name: '', type: 'OTHER', quantity: 1 })
                      } else {
                        setShowAddEquipmentForm(true)
                        setEditingEquipment(null)
                        setEquipmentForm({ name: '', type: 'OTHER', quantity: 1 })
                      }
                    }}
                  >
                    {showAddEquipmentForm ? '취소' : '+ 장비 추가'}
                  </button>
                </div>

                {showAddEquipmentForm && (
                  <form onSubmit={editingEquipment ? handleSaveEquipment : handleAddNewEquipment} className="admin-form">
                    {editingEquipment && (
                      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f0f0f0', borderRadius: '4px' }}>
                        <strong>장비 수정 모드</strong>
                      </div>
                    )}
                    <div className="form-group">
                      <label>장비명</label>
                      <input
                        type="text"
                        value={equipmentForm.name}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, name: e.target.value })}
                        placeholder="예: 프로젝터"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>장비 종류</label>
                      <select
                        value={equipmentForm.type}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, type: e.target.value })}
                        className="admin-select"
                        required
                      >
                        <option value="DISPLAY">디스플레이</option>
                        <option value="AUDIO">오디오</option>
                        <option value="PRESENTATION">프레젠테이션</option>
                        <option value="OTHER">기타</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>총 개수</label>
                      <input
                        type="number"
                        value={equipmentForm.quantity}
                        onChange={(e) => setEquipmentForm({ ...equipmentForm, quantity: e.target.value })}
                        min="1"
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="submit" className="admin-button primary">
                        {editingEquipment ? '저장' : '등록'}
                      </button>
                      {editingEquipment && (
                        <button 
                          type="button"
                          className="admin-button secondary"
                          onClick={() => {
                            setShowAddEquipmentForm(false)
                            setEditingEquipment(null)
                            setEquipmentForm({ name: '', type: 'OTHER', quantity: 1 })
                          }}
                        >
                          취소
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {/* 장비 목록 */}
                <div className="equipment-list">
                  {equipment.map(eq => (
                    <div key={eq.equipmentId} className="equipment-item">
                      <div style={{ flex: 1 }}>
                        <strong style={{ color: '#333' }}>{eq.name}</strong>
                        <span style={{ marginLeft: '1rem', color: '#666' }}>({eq.type})</span>
                        <span style={{ marginLeft: '1rem', color: '#667eea' }}>총 {eq.quantity || 0}개</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          className="admin-button secondary"
                          onClick={() => handleUpdateEquipment(eq.equipmentId)}
                        >
                          수정
                        </button>
                        <button
                          className="admin-button"
                          style={{ 
                            background: '#e53e3e', 
                            color: 'white',
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                          }}
                          onClick={() => handleDeleteEquipment(eq.equipmentId)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* 시설에 장비 등록 */
              <div>
                {/* 시설 선택 */}
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>시설 선택</label>
                  <select
                    value={selectedFacility || ''}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                    className="admin-select"
                  >
                    <option value="">시설을 선택하세요</option>
                    {hansungFacilities.map(facility => (
                      <option key={facility.facilityId} value={facility.facilityId}>
                        {facility.facilityName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 사용 가능한 장비 목록 */}
                {selectedFacility && (
                  <div>
                    <h3>장비 등록</h3>
                    <div className="equipment-list">
                      {equipment.map(eq => {
                        const facilityEquipment = getFacilityEquipment(selectedFacility)
                        const isRegistered = facilityEquipment.some(fe => fe.equipmentId === eq.equipmentId)
                        
                        return (
                          <div key={eq.equipmentId} className="equipment-item">
                            <div style={{ flex: 1 }}>
                              <span>{eq.name} ({eq.type})</span>
                              <span style={{ marginLeft: '1rem', color: '#666', fontSize: '0.9rem' }}>
                                총 {eq.quantity || 0}개
                              </span>
                            </div>
                            <button
                              className={`admin-button ${isRegistered ? 'secondary' : 'primary'}`}
                              onClick={() => isRegistered 
                                ? handleUnregisterEquipment(eq.equipmentId)
                                : handleRegisterEquipment(eq.equipmentId)
                              }
                            >
                              {isRegistered ? '등록 해제' : '등록'}
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    {/* 선택된 시설의 등록된 장비 목록 */}
                    {getFacilityEquipment(selectedFacility).length > 0 && (
                      <div style={{ marginTop: '1.5rem' }}>
                        <h4>등록된 장비</h4>
                        <div className="equipment-list">
                          {getFacilityEquipment(selectedFacility).map(eq => (
                            <div key={eq.equipmentId} className="equipment-item">
                              <span>{eq.name} ({eq.type})</span>
                              <button
                                className="admin-button"
                                style={{ 
                                  background: '#e53e3e', 
                                  color: 'white',
                                  padding: '0.5rem 1rem',
                                  fontSize: '0.9rem'
                                }}
                                onClick={() => handleUnregisterEquipment(eq.equipmentId)}
                              >
                                등록 해제
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 이벤트 관리 (예약 불가 시간대) */}
          <div className="admin-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="admin-section-title">이벤트 관리</h2>
              <button 
                className="admin-button primary"
                onClick={() => {
                  if (showEventForm) {
                    setShowEventForm(false)
                    setEditingEventId(null)
                    setEventForm({ facilityId: '', title: '', startTime: '13:00', endTime: '18:00', description: '' })
                  } else {
                    setShowEventForm(true)
                    setEditingEventId(null)
                    setEventForm({ facilityId: '', title: '', startTime: '13:00', endTime: '18:00', description: '' })
                  }
                }}
              >
                {showEventForm ? '취소' : '+ 이벤트 등록'}
              </button>
            </div>

            {showEventForm && (
              <form onSubmit={editingEventId ? handleUpdateEvent : handleAddEvent} className="admin-form">
                {editingEventId && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f0f0f0', borderRadius: '4px' }}>
                    <strong>이벤트 수정 모드</strong>
                  </div>
                )}
                <div className="form-group">
                  <label>시설 선택</label>
                  <select
                    value={eventForm.facilityId}
                    onChange={(e) => setEventForm({ ...eventForm, facilityId: e.target.value })}
                    className="admin-select"
                    required
                  >
                    <option value="">시설을 선택하세요</option>
                    {hansungFacilities.map(facility => (
                      <option key={facility.facilityId} value={facility.facilityId}>
                        {facility.facilityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>이벤트명</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    placeholder="예: 워크샵"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>시작 시간</label>
                  <input
                    type="time"
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>종료 시간</label>
                  <input
                    type="time"
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>설명 (선택)</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    rows="3"
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="admin-button primary">
                    {editingEventId ? '저장' : '등록'}
                  </button>
                  {editingEventId && (
                    <button 
                      type="button"
                      className="admin-button secondary"
                      onClick={() => {
                        setShowEventForm(false)
                        setEditingEventId(null)
                        setEventForm({ facilityId: '', title: '', startTime: '13:00', endTime: '18:00', description: '' })
                      }}
                    >
                      취소
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* 등록된 이벤트 목록 */}
            <div className="event-list" style={{ marginTop: '1rem' }}>
              {events.length === 0 ? (
                <p>등록된 이벤트가 없습니다.</p>
              ) : (
                events.map(event => {
                  const facility = facilities.find(f => f.facilityId === event.facilityId)
                  return (
                    <div key={event.eventId} className="event-item">
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong style={{ fontSize: '1.1rem' }}>{event.title}</strong>
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          <strong>적용 시설:</strong> {facility ? facility.facilityName : '알 수 없음'}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          <strong>시간:</strong>{' '}
                          {new Date(event.startTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(event.endTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {event.description && (
                          <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            {event.description}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <button
                          className="admin-button secondary"
                          onClick={() => handleEditEvent(event)}
                        >
                          수정
                        </button>
                        <button
                          className="admin-button"
                          style={{ 
                            background: '#e53e3e', 
                            color: 'white',
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                          }}
                          onClick={() => handleDeleteEvent(event.eventId)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
