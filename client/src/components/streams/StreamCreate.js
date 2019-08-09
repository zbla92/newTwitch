import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createStream} from '../../actions'

class StreamCreate extends React.Component{
    componentDidMount(){
        console.log(this.props.state)
    }

    // Destructured meta to meta.error and meta.touched
    renderError({error, touched}){
        if(touched && error) {
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }

    }



    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off'/>
                {this.renderError(meta)}
            </div>
            
        )
    }

    onSubmit = (formValus) => {
        this.props.createStream(formValus);

    }

    render(){
        console.log(this.props)
           return(
               <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                   <Field name='title' component={this.renderInput} label="Enter Title" />
                   <Field name='description' component={this.renderInput} label="Enter Description" />
                   <button className="ui button primary">Submit</button>
               </form>
           );
    }
}

// Validating form enteries - to make sure all is entered good
const validate = (formValues) => {
    const errors = {};
    
    if(!formValues.title){
        errors.title = 'You must enter a title';
    }

    if(!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
}  

const formWrapped =  reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);


const mapStateToProps = state => {
    console.log(state)
    return {isSignedIn: state.auth.isSignedIn}
}
export default connect(mapStateToProps, { createStream })(formWrapped);