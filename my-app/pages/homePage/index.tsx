import { Button, Checkbox, IconButton, TableCell, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useReducer } from 'react'
import Navbar from '../../components/Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { ADD_STUDENT, BACK, 
    CHECK_ALL, 
    CHECK_ITEM, 
    DELETE_ALL, 
    DELETE_STUDENT, 
    initalState, 
    ONCHAGE_ITEM, 
    reducer, 
    SAVE_ITEM, 
    SET_ITEM } from '../useReducer';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import _ from 'lodash';





function HomePage() {
    const [state, dispatch] = useReducer(reducer, initalState)
    const {nameList , studentList, checkAll} = state

    const deleteStudent = (rowId:number) => {
        const newRow = studentList.filter((c:any)=> c.id !== rowId)
        dispatch({type: DELETE_STUDENT, newRow })
    }
    const deleteAll = () => {
        const newRow = studentList.filter((c:any) => c.isChecked !== true)
        dispatch({type: DELETE_ALL, newRow, checkAll: false})
    }
    const setItem = (payload:any)=> {
            studentList.map((c:any)=> {
            if(c.id === payload.id){
                c.isEdit= true
            }
            })
        return{
            type:SET_ITEM,
            payload,
        }
    }
    // const backItem = (payload:any)=> {
    //     studentList.map((c:any)=> {
    //     if(c.id === payload.id){
    //         c.isEdit= false
    //     }
    //     })
    //     dispatch({ type:BACK,payload})
    // }
    const onChangeItem = (payload:any) => {
        const {name} = payload.event.target;
        if(name === 'age') {
            payload.row.old = payload.value
        } else if (name === 'name') {
            payload.row.studentName = payload.value
        }else if (name === 'class') {
            payload.row.class = payload.value
        }else if (name === 'city') {
            payload.row.city = payload.value
        }
        dispatch({type: ONCHAGE_ITEM})
    }        
    const onCheckBoxItem = (payload:any)=>{
        if(!payload.isChecked){
            payload.isChecked = true
        }else payload.isChecked = false
        const checkAll = !studentList.find((e:any) => !e.isChecked);
        dispatch({type:CHECK_ITEM, checkAll})
    }
    const onCheckBoxAllItem = (value:any) => {
        const newRow = studentList.map((c:any) => c.isChecked = value)
        dispatch({type: CHECK_ALL, newRow, checkAll:value})
    }
    const addItem = ()=> {
        studentList.unshift({
            isEdit: true,
            studentName: "",
            old: "",
            class: "",
            city: "",
          });

        dispatch({type:ADD_STUDENT})
    }
    const saveItem = (payload:any)=> {
        studentList.map((c:any)=> {
            if(c.id === payload.id){
                c.isEdit= false
            }
            })
        if(!payload.id){
        let max = 0;
        studentList.forEach((character:any) => {
          if (character.id > max) {
            max = character.id;
          }  
        });
        payload.id = max +1
        }   
        dispatch({type: SAVE_ITEM})
    }
   
  
  return (
    <>
        <Navbar/>   
        {/* <Box sx={{marginTop: "100px"}}> */}
            <Box sx={{ width: '100%', marginTop:"150px"}}>
                <Paper sx={{ width: '70%', margin:"auto" }}>
                    <TableContainer>
                    <Table>
                        <TableHead sx={{background: "#F4F6F8", color:"#637381"}}>
                            <TableRow>
                                <TableCell padding="checkbox">
                                <Checkbox onChange={(e)=> onCheckBoxAllItem(e.target.checked)} checked={checkAll}/>
                                </TableCell>
                                {nameList.map((e:any) => {
                                return (
                                    <TableCell key={e.id} align='right'>{e.name}</TableCell>
                                )
                                })}
                                <TableCell align='right'>
                                    <Button sx={{ color: "#fff", bgcolor: "#00AB55" }}>
                                        <AddIcon onClick={() => addItem()}/>
                                    </Button>
                                    <IconButton onClick={() => deleteAll()}>
                                        <CloseIcon sx={{ color: "red" }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentList.map((row:any) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox onChange={()=> onCheckBoxItem(row)} checked={row?.isChecked || false}/>
                                </TableCell>
                            <TableCell align='right' >
                                {!row.isEdit ? (row.studentName) : (
                                    <TextField
                                    value={row?.studentName || ""}
                                    type="text"
                                    inputProps={{
                                        name: 'name'
                                    }}
                                    onChange={(e)=> onChangeItem({row, value: e.target.value, event: e})}
                                    
                                />
                                )}
                            </TableCell>
                            <TableCell align='right'>
                                {!row.isEdit ? (row.old) : (
                                    <TextField
                                    value={row?.old || ""}
                                    type="text"
                                    inputProps={{
                                        name: 'age'
                                    }}
                                    onChange={(e)=> onChangeItem({row, value: e.target.value, event: e})}
                                />
                                )}
                            </TableCell>
                            <TableCell align='right'>
                                {!row.isEdit ? (row.class) : (
                                    <TextField
                                    value={row?.class || ""}
                                    type="text"
                                    inputProps={{
                                        name: 'class'
                                    }}
                                    onChange={(e)=> onChangeItem({row, value: e.target.value, event: e})}
                                />
                                )}
                            </TableCell>
                            <TableCell align='right'>
                                {!row.isEdit ? (row.city) : (
                                    <TextField
                                    value={row?.city || ""}
                                    type="text"
                                    inputProps={{
                                        name: 'city'
                                    }}
                                    onChange={(e)=> onChangeItem({row, value: e.target.value, event: e})}
                                />
                                )}</TableCell>
                            <TableCell align='right'>
                                {row.isEdit ? (<>
                                    {/* <IconButton  onClick={()=> backItem(row)}>
                                    <ArrowBackIcon sx={{ color: "red" }} />
                                    </IconButton> */}
                                    <IconButton onClick={() => saveItem(row)}>
                                    <SaveIcon sx={{ color: "#00AB55" }} />
                                    </IconButton>
                                </>) : (<>
                                    <IconButton onClick={()=> dispatch(setItem(row))}>
                                        <CreateIcon sx={{ color: "#00AB55" }} />
                                    </IconButton>
                                    <IconButton onClick={() => deleteStudent(row.id)}>
                                        <CloseIcon sx={{ color: "red" }} />
                                    </IconButton>
                                </>)}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Paper>
            </Box>
        {/* </Box>    */}
       
    </>
  )
}

export default HomePage