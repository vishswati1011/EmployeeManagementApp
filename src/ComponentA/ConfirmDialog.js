import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import { NotListedLocation } from '@material-ui/icons';
import React from 'react'
import Controls from "./controls/Controls";
const useStyles=makeStyles(theme=>({

    dialog:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },
    dialogTitle:{
        textAlign:'center'
    },
    dialogContent:{
        textAlign:'center'
    },
    dialogActions:{
        justifyContent:'center'
    },
    titleIcon:{
        backgroundColor:theme.palette.secondary.light,
        color:theme.palette.secondary.main,
        '&:hover':{
            backgroundColor:theme.palette.secondary.light,
            curser:'default'
        },
        '& .MuiSvgIcon-root':{
            fontsize:'8rem',
        }
    }
}))
export default function ConfirmDialog(props){

    const {confirmDialog,setConfirmDialog}=props;
    const classes =useStyles();
    return(
        <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
            <IconButton disableRipple className={classes.titleIcon}>
                <NotListedLocation/>
            </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography varient="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography varient="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
               <Controls.Button
               text="No"
               color="default"
                onClick={()=>setConfirmDialog({...confirmDialog,isOpen:false})}   
               />
                <Controls.Button
               text="Yes"
               color="secondary"
                onClick={confirmDialog.onConfirm}   
               />
            </DialogActions>
        </Dialog>
    )
}