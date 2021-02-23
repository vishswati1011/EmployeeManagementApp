import React from 'react';
import EmployeeForm from './EmployeeForm';
import {Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles =makeStyles(theme =>({
    pageContent:{
        margin:theme.spacing(1),
        padding:theme.spacing(1),
    }


}))
const Employee =() =>{

    const classes=useStyles();
        return(
            <>
            <Paper className={classes.pageContent}>
            <EmployeeForm />
            </Paper>
            </>
        )
}
export default Employee;
