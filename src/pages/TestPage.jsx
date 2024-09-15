import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  const handleSuccess = (response) => {
    console.log('Login Success:', jwtDecode(response?.credential));
  };

  const handleError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h1>Đăng nhập với Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;