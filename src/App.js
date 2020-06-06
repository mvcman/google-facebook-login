import React from 'react';
//import logo from './logo.svg';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
//import GoogleBtn from './GoogleBtn';

class App extends React.Component {  
    state = {
        token: '',
        isLogedIn: false,
        name: '',
        surname: '',
        img: ''
    }
    render() {
        const responseFacebook = (response) => {
            this.setState({
                token: response.accessToken,
                isLogedIn: true,
                name: response.name,
                img: response.picture.data.url
            });
            console.log(response);
        }
        const responseGoogle = (response) => {
            this.setState({
                token: response.accessToken,
                isLogedIn: true,
                name: response.profileObj.givenName,
                surname: response.profileObj.familyName,
                img: response.profileObj.imageUrl
            })
            console.log(response);
        }
        const Logout = () => {
            this.setState({
                token: '',
                isLogedIn: false
            });
        }
        return (
            <div className="App">
              <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
              {/*{this.state.isLogedIn ? */}
                <div>
                    <FacebookLogin
                        appId="710924049664979"
                        fields="name,email,picture"
                        callback={responseFacebook}
                    />
                </div>
                { !this.state.isLogedIn ?
                    <GoogleLogin
                        clientId="841274090349-tkbuudcdhu0p913q64jn3v7os8vhthou.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />:
                    <div>
                        <h1>Welcome {this.state.name} {this.state.surname}</h1>
                        <img src={this.state.img} alt="logo" style={{ width: 100, height: 100, borderRadius: '50%'}}/>
                        <GoogleLogout
                        clientId="841274090349-tkbuudcdhu0p913q64jn3v7os8vhthou.apps.googleusercontent.com"
                        buttonText='Logout'
                        onLogoutSuccess={Logout}
                        />
                        {/*<button onClick={() => window.FB.logout()}>FB logout</button>
                        </div>*/}
                    </div>
                }
                {/*{this.state.token ? <h5>Your Access Token: <br/><br/> { this.state.token }</h5> : null }*/}
            </div>
          );
    }
}

export default App;
