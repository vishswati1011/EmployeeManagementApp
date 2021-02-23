import { TextField, Grid, FormControl,Radio ,FormControlLabel,FormLabel,RadioGroup } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../ComponentA/controls/Controls';
//import useForm from './useForm';
import {useForm,Form} from './useForm';
import * as employeeservices from '../services/employeeservice'

const genderItems =[
    {id:'male',title:"Male"},
    {id:'female',title:"Female"}
]

const initialFvalue = {
    id: 0,
    fname: "",
    email: "",
    city: "",
    mobile: "",
    dept: "",
    gender: "",
    joindate: new Date(),
    isParmanent: false,
}


const EmployeeForm = (props) => {

const {addOrEdit,recordForEdit}=props;

    const validate=(fieldValues=values)=>{
        let temp ={...errors}
        if('fname' in fieldValues)
            temp.fname = fieldValues.fname?"":"this feild is required."
        if('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email)?"":"email not valid."
        if('mobile' in fieldValues)
            temp.mobile =fieldValues.mobile.length>9?"":"Not valid."
        if('dept' in fieldValues)
            temp.dept = fieldValues.dept.length!=0?"":"select one dept."

        setErrors({
            ...temp
        })
        if(fieldValues==values)
        return Object.values(temp).every(x=>x=="")
    }
    const classes = useStyles();
    const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
    }=useForm(initialFvalue, true, validate);

    const handleSubmit =(e) =>{
        e.preventDefault();
        if(validate()) {
            addOrEdit(values,resetForm);
        }
    }
    useEffect (()=>{
        if(recordForEdit!=null)
        setValues({
            ...recordForEdit
        })
    },[recordForEdit])
    return (
       
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input name="fname" label="name"
                    value={values.fname}
                    onChange={handleInputChange}
                    error={errors.fname}
                    />
                    <Controls.Input
                        label="Email"
                        onChange={handleInputChange}
                        value={values.email}
                        name="email"
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Mobile"
                        onChange={handleInputChange}
                        value={values.mobile}
                        name="mobile"
                        error={errors.mobile}
                    />
                    <Controls.Input
                        label="City"
                        onChange={handleInputChange}
                        value={values.city}
                        name="city"
                        error={errors.city}
                    />

                </Grid>
                <Grid item xs={6}>
                <Controls.RadioGroup1
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                    name="dept"
                    label="Department"
                    value={values.dept}
                    onChange={handleInputChange}
                    options={employeeservices.getDepartmentCollection()}
                   error={errors.dept}
                    />
                    <Controls.DatePicker
                    name="joindate"
                    label="Joining Date"
                    value={values.joindate}
                    onChange={handleInputChange}
                    />
                    <div><Controls.Button
                    type="submit"
                     text="Submit" />
                     <Controls.Button
                     color="default"
                     text="Reset" 
                     onClick={resetForm}
                     />
                    </div>
                </Grid>
            </Grid>
            </Form>
    )
}
export default EmployeeForm;
