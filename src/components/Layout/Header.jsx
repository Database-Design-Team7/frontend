import { Link } from 'react-router-dom'
import './Header.css'

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">🪑</div>
          <div className="logo-text">
            <div className="logo-main">COOFFICE</div>
            <div className="logo-sub">COFFICE</div>
          </div>
        </Link>
        <nav className="nav">
          <Link to="/location" className="nav-link">지점 찾기</Link>
          <span className="nav-divider">|</span>
          <Link to="/reservation" className="nav-link">시설 예약</Link>
          <span className="nav-divider">|</span>
          <Link to="/about" className="nav-link">소개</Link>
          <span className="nav-divider">|</span>
          <Link to="/contact" className="nav-link">문의하기</Link>
          <span className="nav-divider">|</span>
          <Link to={isLoggedIn ? "/mypage" : "/login"} className="nav-link">
            {isLoggedIn ? '마이페이지' : '로그인'}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

