import {useState,} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {getUser,verifyOtp} from '../redux/auth/userSlice';

const Login = () => {

  const router = useRouter();
  const [mobile,setMobile] = useState("")
  const [otp,setOtp] = useState("")
  const user = useSelector((state) => state.users)

  const dispatch = useDispatch()

  const [handleState,setHandleState] = useState(false);


  const handleClick = () => () => {
    setHandleState(true);
  };

  const handleClose = () => {
    setHandleState(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!mobile || otp.mobile < 10) {
        setHandleState(true)
        return;
    }
    dispatch(getUser({
      mobileNo: mobile
    }))
  }

  const handleOtp = (e) => {
    e.preventDefault();
    if(!otp || otp.length < 4) {
        setHandleState(true)
        return;
    }
    
    dispatch(verifyOtp({
      mobileNo: user.dataUser.mobileNo,
      otp: otp
    }))
  }

  if(user.otpView == true) {
      return (
        <>
        <Head>
          <title>Login</title>
        </Head>
        <div style={{minHeight:'100vh',alignItems: 'center',justifyContent: 'center',display:'flex'}}>
          <div className="container" >
            <div className="row justify-content-center">
              <div className="col-lg-6">
                  <div sx={{ my: 3 }}>
                    <h4
                      color="textPrimary"
                      variant="h4"
                    >
                      Sign in
                    </h4>
                    <h5
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Enter OTP
                    </h5>
                  </div>
                  <input
                    className="form-control"
                    value={otp}
                    name="otp"
                    placeholder="Enter otp"
                    onChange={(e) => setOtp(e.target.value)}
                    type="number"
                  />
                  <div sx={{ py: 2 }}>
                    <button
                      className="btn btn-primary mt-2"
                      type="submit"
                      onClick={handleOtp}
                    >
                      Submit
                    </button>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </>
      )
  }
  

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div style={{minHeight:'100vh',alignItems: 'center',justifyContent: 'center',display:'flex'}}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div>
                <h4
                  color="textPrimary"
                  variant="h4"
                >
                  Sign in
                </h4>
                <h5
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Sign in on the internal platform
                </h5>
              </div>
              <input
                className="form-control"
                name="mobileNo"
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                placeholder="Enter mobile number"
              />
              <div sx={{ py: 2 }}>
                <button

                  className="btn mt-3 mx-auto d-block btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Sign In Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
