import './Admin.css'

function Admin() {
  return (
    <div className="admin-page">
      <div className="page-container">
        <h1 className="page-title">관리자 페이지</h1>
        <div className="admin-content">
          <div className="admin-section">
            <h2 className="admin-section-title">시스템 관리</h2>
            <p>관리자 전용 세부 설정 기능들이 여기에 표시됩니다.</p>
            {/* 관리자 기능들을 여기에 추가하세요 */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

