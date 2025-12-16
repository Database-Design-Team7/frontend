import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

// 초기 Mock 데이터
const initialData = {
  // 지점 데이터
  branches: [
    {
      branchId: 'BRANCH_HANSUNG',
      name: '한성대역점',
      address: '서울시 성북구',
      contactNumber: '02-1234-5678',
      operatingHours: '09:00-22:00'
    }
  ],
  
  // 시설 데이터
  facilities: [],
  
  // 장비 데이터
  equipment: [
    { equipmentId: 'EQ_TV', name: 'TV', type: 'DISPLAY', status: 'NORMAL', quantity: 5 },
    { equipmentId: 'EQ_MIC', name: '마이크', type: 'AUDIO', status: 'NORMAL', quantity: 3 },
    { equipmentId: 'EQ_LASER', name: '레이저포인터', type: 'PRESENTATION', status: 'NORMAL', quantity: 10 }
  ],
  
  // 시설-장비 연결 데이터
  facilityEquipment: [],
  
  // 이벤트 데이터 (예약 불가 시간대)
  events: [],
  
  // 현재 로그인한 사용자
  currentUser: null
}

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // LocalStorage에서 데이터 로드, 없으면 초기 데이터 사용
    const saved = localStorage.getItem('appData')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return initialData
      }
    }
    return initialData
  })

  // 데이터가 변경될 때마다 LocalStorage에 저장
  useEffect(() => {
    localStorage.setItem('appData', JSON.stringify(data))
  }, [data])

  // 시설 등록
  const addFacility = (facilityData) => {
    const newFacility = {
      facilityId: `FACILITY_${Date.now()}`,
      branchId: facilityData.branchId,
      facilityName: facilityData.facilityName,
      capacity: facilityData.capacity || 10,
      ...facilityData
    }
    setData(prev => ({
      ...prev,
      facilities: [...prev.facilities, newFacility]
    }))
    return newFacility
  }

  // 시설 삭제
  const deleteFacility = (facilityId) => {
    setData(prev => ({
      ...prev,
      facilities: prev.facilities.filter(f => f.facilityId !== facilityId),
      facilityEquipment: prev.facilityEquipment.filter(fe => fe.facilityId !== facilityId),
      events: prev.events.filter(e => e.facilityId !== facilityId)
    }))
  }

  // 지점 정보 수정
  const updateBranch = (branchId, branchData) => {
    setData(prev => ({
      ...prev,
      branches: prev.branches.map(b => 
        b.branchId === branchId 
          ? { ...b, ...branchData }
          : b
      )
    }))
  }

  // 장비를 시설에 등록
  const addEquipmentToFacility = (facilityId, equipmentId) => {
    setData(prev => {
      const exists = prev.facilityEquipment.some(
        fe => fe.facilityId === facilityId && fe.equipmentId === equipmentId
      )
      if (exists) return prev
      
      return {
        ...prev,
        facilityEquipment: [
          ...prev.facilityEquipment,
          { facilityId, equipmentId }
        ]
      }
    })
  }

  // 시설에서 장비 등록 해제
  const removeEquipmentFromFacility = (facilityId, equipmentId) => {
    setData(prev => ({
      ...prev,
      facilityEquipment: prev.facilityEquipment.filter(
        fe => !(fe.facilityId === facilityId && fe.equipmentId === equipmentId)
      )
    }))
  }

  // 장비 추가
  const addEquipment = (equipmentData) => {
    const newEquipment = {
      equipmentId: `EQ_${Date.now()}`,
      name: equipmentData.name,
      type: equipmentData.type || 'OTHER',
      status: equipmentData.status || 'NORMAL',
      quantity: equipmentData.quantity || 1,
      ...equipmentData
    }
    setData(prev => ({
      ...prev,
      equipment: [...prev.equipment, newEquipment]
    }))
    return newEquipment
  }

  // 장비 삭제
  const deleteEquipment = (equipmentId) => {
    setData(prev => ({
      ...prev,
      equipment: prev.equipment.filter(eq => eq.equipmentId !== equipmentId),
      facilityEquipment: prev.facilityEquipment.filter(fe => fe.equipmentId !== equipmentId)
    }))
  }

  // 장비 정보 수정 (수량 포함)
  const updateEquipment = (equipmentId, equipmentData) => {
    setData(prev => ({
      ...prev,
      equipment: prev.equipment.map(eq =>
        eq.equipmentId === equipmentId
          ? { ...eq, ...equipmentData }
          : eq
      )
    }))
  }

  // 이벤트 등록 (예약 불가 시간대 설정)
  const addEvent = (eventData) => {
    const newEvent = {
      eventId: `EVENT_${Date.now()}`,
      facilityId: eventData.facilityId,
      title: eventData.title,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      description: eventData.description || ''
    }
    setData(prev => ({
      ...prev,
      events: [...prev.events, newEvent]
    }))
    return newEvent
  }

  // 이벤트 삭제
  const deleteEvent = (eventId) => {
    setData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.eventId !== eventId)
    }))
  }

  // 이벤트 수정
  const updateEvent = (eventId, eventData) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(e =>
        e.eventId === eventId ? { ...e, ...eventData } : e
      )
    }))
  }

  // 로그인
  const login = (userData) => {
    setData(prev => ({
      ...prev,
      currentUser: userData
    }))
  }

  // 로그아웃
  const logout = () => {
    setData(prev => ({
      ...prev,
      currentUser: null
    }))
  }

  // 특정 시설의 장비 목록 조회
  const getFacilityEquipment = (facilityId) => {
    const equipmentIds = data.facilityEquipment
      .filter(fe => fe.facilityId === facilityId)
      .map(fe => fe.equipmentId)
    
    return data.equipment.filter(eq => equipmentIds.includes(eq.equipmentId))
  }

  // 특정 시설의 이벤트 목록 조회
  const getFacilityEvents = (facilityId) => {
    return data.events.filter(ev => ev.facilityId === facilityId)
  }

  const value = {
    data,
    branches: data.branches,
    facilities: data.facilities,
    equipment: data.equipment,
    events: data.events,
    currentUser: data.currentUser,
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
    login,
    logout,
    getFacilityEquipment,
    getFacilityEvents
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

