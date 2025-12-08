import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // 로그인 로직 구현 예정
    console.log('로그인:', { email, password })
    // 로그인 성공 시 마이페이지로 이동
    // navigate('/mypage')
  }

  return (
    <div className="login-page">
      <div className="page-container">
        <h1 className="page-title">로그인</h1>
        <div className="login-content">
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
          {/* 로그인 관련 추가 컴포넌트들을 여기에 추가하세요 */}
        </div>
      </div>
    </div>
  )
}

export default Login

