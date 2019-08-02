import React from 'react';

class GoogleAuth extends React.Component{
    state = { isSignedIn: null}

   componentDidMount(){
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId:`1061215174435-8p7d9kh3rg22l7hccmdat7a84s2uuh56.apps.googleusercontent.com`,
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
   }

   onAuthChange = () => {
       this.setState({isSignedIn: this.auth.isSignedIn.get()})
   }

   renderAuthButton(){
       if(this.state.isSignedIn === null) {
           return null
       }else if(this.state.isSignedIn === true){
           return(
               <button className="ui red google button">
                   <i className="google icon"/>
                   Sign Out
               </button>
           )
       }else {
           return (
            <button className="ui red google button">
                <i className="google icon"/>
                Sign In with google
            </button>
        )
       }
   }

    render() {
        console.log(this.state)
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

export default GoogleAuth;

