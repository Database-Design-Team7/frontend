import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './Login.css'

function Login() {
  const [isSignIn, setIsSignIn] = useState(true)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: '',
    mail: '',
  })
  const [error, setError] = useState('')

  const handleToggle = () => setIsSignIn((prev) => !prev)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      // 회원가입 로직 구현 예정
      console.log('회원가입:', formData)
      setIsSignIn(true)
      setFormData({ userName: '', mail: '' })
      setError('')
    } catch (error) {
      setError(error.message || '회원가입 중 오류가 발생했습니다.')
    }
  }

  const handleSignIn = async () => {
    try {
      // 보여주기용 로그인 로직
      const { userName, mail } = formData

      // 관리자 계정 확인 (username: admin, email: 1234)
      if (userName === 'admin' && mail === '1234') {
        console.log('관리자 로그인:', formData)
        setError('')
        navigate('/admin')
        return
      }

      // 일반 사용자 로그인
      if (userName && mail) {
        console.log('일반 사용자 로그인:', formData)
        setError('')
        navigate('/')
        return
      }

      // 입력값이 없을 경우
      setError('이름과 이메일을 입력해주세요.')
    } catch (error) {
      console.error('로그인 오류:', error)
      setError(error.message || '로그인 중 오류가 발생했습니다.')
    }
  }

  const WelcomeSection = () => (
    <div
      className="login__welcome"
      style={{ display: isSignIn ? 'none' : 'block' }}
    >
      <h4 className="login__bold login__welcome-text">Welcome Back!</h4>
      <p className="login__normal login__text">
        To keep connected with us please login with your personal info
      </p>
    </div>
  )

  const HelloSection = () => (
    <div
      className="login__hello"
      style={{ display: isSignIn ? 'block' : 'none' }}
    >
      <h4 className="login__bold login__welcome-text">Hello Friend</h4>
      <p className="login__normal login__text">
        Enter your personal details and start journey with us
      </p>
    </div>
  )

  const AuthForm = useMemo(() => {
    return (
      <div
        className={`login__form ${
          isSignIn ? 'login__movingForm' : 'login__startForm'
        }`}
        style={{
          transform: isSignIn ? 'translate(0px)' : 'translate(400px)',
          borderRadius: isSignIn ? '15px 0px 0px 15px' : '0px 15px 15px 0px',
        }}
      >
        <h4 className="login__bold">
          {isSignIn ? 'Sign in to COOFFICE' : 'Create Account'}
        </h4>
        <div className="login__icons">
          <div className="login__icon">
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
        <p className="login__normal login__light">
          {isSignIn
            ? 'Or use your account'
            : 'Or use your email for registration'}
        </p>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="login__normal login__input"
          value={formData.userName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="mail"
          placeholder="Email"
          className="login__normal login__input"
          value={formData.mail}
          onChange={handleInputChange}
        />
        {error && <p className="login__normal login__error">{error}</p>}
        <button
          className="b-button login__normal"
          onClick={isSignIn ? handleSignIn : handleSignUp}
        >
          {isSignIn ? 'SIGN IN' : 'SIGN UP'}
        </button>
      </div>
    )
  }, [isSignIn, formData, error, handleInputChange, handleSignUp, handleSignIn])

  return (
    <article className="loginPage">
      <div
        className={`login__move ${isSignIn ? 'login__moving' : 'login__start'}`}
        style={{
          backgroundPosition: isSignIn ? 'right' : 'left',
          borderRadius: isSignIn ? '0px 15px 15px 0px' : '15px 0px 0px 15px',
        }}
      >
        <div className="p-button login__normal" onClick={handleToggle}>
          {isSignIn ? 'SIGN UP' : 'SIGN IN'}
        </div>
      </div>
      {isSignIn ? <HelloSection /> : <WelcomeSection />}
      {AuthForm}
    </article>
  )
}

export default Login

