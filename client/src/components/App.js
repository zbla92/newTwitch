import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

const PageOne = () => (
        <div>
            PaageOne
            <Link to='/pagetwo'>Navigate to Page two</Link>
        </div>
    )

const PageTwo = () => (
        <div>
            PageTwo
            <button>click me</button>
        </div>
    )
const PageThree = () => <div>PageThree</div>


const App = () => {
    return (
        <div>
           <BrowserRouter>
           <div>
                <Route path="/" exact component={PageOne} />
                <Route path="/pagetwo" component={PageTwo} />
                <Route path="/pagetwo/pagethree" component={PageThree} />
           </div>
           </BrowserRouter> 
        </div>
    )
}

export default App;