import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import InlineMessage from '../../Messages/Inline/InlineMessage'

import { Form, Button, Message, Icon } from 'semantic-ui-react'


export default function SignupForm (props)  {

     const [data,setData] = useState({
         email:'',
         password:'',
         passConfirmation:''
     })
     const [errors,setErrors] = useState({
         email:'',
         password:'',
         passConfirmation:'',
         global:''
     })
   
    const validate = (opts) => {
        const errors = {} ;
        if(!opts.email || !opts.email.includes('@')) errors.email = 'Invalid email';
        if(!opts.password) errors.password = 'Invalid password';
        if(!opts.passConfirmation) errors.passConfirmation = 'Invalid password confirmation'
        if( opts.password!==opts.passConfirmation) errors.passConfirmation = 'Passwords dont match';
        return errors;
    }
    const onSubmit = (e) => {

        e.preventDefault();
        const formErrors = validate(data);

        if(Object.keys(formErrors).length === 0){
            return props.onSubmit(data)
                    .catch( err => {
                        setErrors(err.response ? {...err.response.data} : {'global':err.message})
                    })
        }
        else {
            setErrors({...errors,...formErrors, 'global':''});
        }
    }
    const onChange = (e) => {

        e.persist()
        setErrors({...errors,[e.target.name]:''})
        setData( prev => (
            {...prev,[e.target.name]:e.target.value}
        ))
    }
    
    

    return (
        <div className='container'>
            <Form inverted onSubmit={onSubmit}  >
                {!!errors.global && <Message size={"mini"} header='Unsuccesful' color='black' content={errors.global} />}
                <Form.Field error={!!errors.email} >
                    <label className='label' htmlFor='email' >
                        <Icon name='mail' />
                        Email
                    </label>
                    <input  className='input' id='email' name='email'  value={data.email} placeholder='Enter email' onChange={ onChange } />
                    {!!errors.email && <InlineMessage text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor='password'>
                        <Icon name='lock' />
                        Password
                    </label>
                    <input  id='password' name='password' type='password' value={data.password} placeholder='Enter password' onChange={ onChange } />
                    {!!errors.password && <InlineMessage text={errors.password} />}   
                </Form.Field>
                <Form.Field error={!!errors.passConfirmation}>
                    <label htmlFor='passConfirmation'>
                        <Icon name='lock' />
                        Confirmation
                    </label>
                    <input  id='passConfirmation' name='passConfirmation' type='password' value={data.passConfirmation} placeholder='Re-Enter password' onChange={ onChange } />
                    {!!errors.password && <InlineMessage text={errors.password} />}   
                </Form.Field>
                <Form.Field>
                    <Button secondary >Sign up</Button>
                    <Button as={Link} to='/login'>Login</Button>
                </Form.Field>
                
            </Form>
        </div>
    )
}


SignupForm.propTypes = {
    onSubmit:PropTypes.func.isRequired,
}

