export const initalState = {
    nameList: [
        {name: "Name"},
        {name: "Old"},
        {name: "Class"},
        {name: "City"},
    ],
    studentList: [ 
    { id: 1, studentName: "sơn", old: "23t", class: 12, city:"Hồ Chí Minh" },
    { id: 2, studentName: "Huyền", old: "18t" , class: 12,city:"Vũng Tàu" },
    { id: 3, studentName: "hoa", old: "23t" , class: 8, city:"Bến tre"},
    { id: 4, studentName: "ngọc", old: "21t", class: 7,city:"Nha Trang" },
    { id: 5, studentName: "giang", old: "22t" , class: 6,city:"Đà Lạt"},
    { id: 6, studentName: "bao", old: "22t", class: 5,city:"Đà nẵng" },
    { id: 7, studentName: "hue", old: "22t", class: 1 ,city:"Hà Nội"},
    { id: 8, studentName: "thuy", old: "22t", class: 9 ,city:"Cần Thơ"},
    { id: 9, studentName: "vuong", old: "22t", class: 11,city:"Thừa Thiên Huế" },
    { id: 10, studentName: "Nhi", old: "22t", class: 10,city:"Phan Thiết" },
    ],
    checkAll:false,    
}

export const ADD_STUDENT = "add_student"
export const DELETE_STUDENT = "delete_student"
export const SET_ITEM= "set_item"
export const BACK = "back"
export const ONCHAGE_ITEM = "onchange_item"
export const DELETE_ALL = "delete_all"
export const CHECK_ALL = "check_all"
export const CHECK_ITEM =" check_item"
export const SAVE_ITEM = "save_item"

export const reducer= (state:any, action:any) => {
    let newState
    switch (action.type) {
        case CHECK_ALL:
           newState = {
                ...state,
                checkAll: action.checkAll
            }   
            break
        case CHECK_ITEM:
           newState = {
                ...state,
                checkAll: action.checkAll
            }   
            break
        case DELETE_STUDENT:
           newState = {
                ...state,
                studentList: action.newRow
            }   
            break
        case DELETE_ALL:
            newState = {
                ...state,
                studentList: action.newRow,
                checkAll: action.checkAll
                }   
            break    
        case ONCHAGE_ITEM:
                newState = {
                    ...state,
                }
            break
        case ADD_STUDENT:
                newState = {
                    ...state
                }
            break    
        // case BACK:
        //     newState = {
        //         ...state, studentList: [...state.studentList]  
        //     }
            break
        case SET_ITEM:
            newState = {
                ...state, 
            }
            break            
        case SAVE_ITEM:
            newState = {
                    ...state,
                }   
             break  
        default: 
            return state    
       
        
    }
    return newState
}
