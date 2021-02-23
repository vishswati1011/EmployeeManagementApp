import React, { useState } from 'react'
import EmployeeForm from "./EmployeeForm";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../ComponentA/Table/useTable";
import * as employeeService from "../services/employeeservice";
import Controls from "./controls/Controls";
import { EditOutlined, Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../ComponentA/PopUp";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import CloseIcon from '@material-ui/icons/Close'
import Notification from '../ComponentA/Notification'
import ConfirmDialog from '../ComponentA/ConfirmDialog'
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'fname', label: 'Employee Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'dept', label: 'Department' },
    {id:'actions' ,label:'Action' , disableSorting: true}
]

export default function TableEmployees() {

    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit,setRecordForEdit]=useState(null);
    const [notify,setNotify] =useState({isOpen:false,message:'',type:''})
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''})
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fname.toLowerCase().includes(target.value))
            }
        })
    }
    const addOrEdit = (employee, resetForm) => {
        if(employee.id==0)
            employeeService.insertEmployee(employee);
        else
            employeeService.updateEmployee(employee);    
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen:true,
            message:'Submitted Successfully',
            type:'success'
        })
    }
    const openInPopup =item =>{
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const onDelete =id =>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen:true,
            message:'Submitted Successfully',
            type:'error'
        })
   
    }
    return (
        <>
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add Employee"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {setOpenPopup(true); 
                         setRecordForEdit(null);}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.fname}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.mobile}</TableCell>
                                <TableCell>{item.department}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton color="primary"
                                        onClick={()=>{openInPopup(item)}}
                                    >
                                        <EditOutlinedIcon fontSize="small">

                                        </EditOutlinedIcon>
                                    </Controls.ActionButton>
                                </TableCell>
                                <TableCell>
                                    <Controls.ActionButton 
                                    color="secondary"
                                    onClick={()=>{
                                        setConfirmDialog({
                                            isOpen:true,
                                            title:'Are you sure',
                                            subTitle:"you cant undo",
                                            onConfirm:()=>{onDelete(item.id)}
                                        })
                                       
                                        }}>
                                        <CloseIcon fontSize="small">
                                        </CloseIcon>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Employee Form"
            >
                <EmployeeForm 
                recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}