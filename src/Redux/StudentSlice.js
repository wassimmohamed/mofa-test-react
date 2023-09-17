/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { NotificationType, Roles } from '../Constants/Constants';
import axios from '../axios/axios';

const initialState = {
    students: [],
    loading: false,
    selectedStudent: null,
    selectedStudentFamilyMembers: [],
    nationalities: [],
    notificationMessage: '',
    notificationType: NotificationType.none,
    selectedRole: Roles.Admin,
    relationships: [],
    studentNationality: null,
};

export const getStudents = createAsyncThunk(
    'students/getAll',
    async () => {
        const res = await axios.get('/Students');
        const data = await res.data;
        return data;
    }
);

export const addSudent = createAsyncThunk(
    'students/addStudent',
    async (payload, thunkAPI) => {
        const res = await axios.post('/Students', payload);
        const data = await res.data;
        thunkAPI.dispatch(updateStudentNationality({ studentId: data.id, nationalityId: payload.nationalityId }));
        thunkAPI.dispatch(getStudents());
        return data;
    }
);

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async (payload, thunkAPI) => {
        const res = await axios.put(`/Students/${payload.id}`, payload);
        const data = await res.data;
        thunkAPI.dispatch(updateStudentNationality({ studentId: payload.id, nationalityId: payload.nationalityId }));
        thunkAPI.dispatch(getStudents());
        return data;
    }
);

export const getStudentNationality = createAsyncThunk(
    'students/getStudentNationality',
    async (payload) => {
        const res = await axios.get(`/students/${payload}/Nationality`);
        const data = await res.data;
        return data;
    }
);


export const updateStudentNationality = createAsyncThunk(
    'students/updateStudentNationality',
    async (payload, thunkAPI) => {
        const res = await axios.put(`/students/${payload.studentId}/Nationality/${payload.nationalityId}`);
        const data = await res.data;
        return data;
    }
);

export const getStudentFamilyMembers = createAsyncThunk(
    'students/familyMembers',
    async (studentId) => {
        const res = await axios.get(`/students/${studentId}/FamilyMembers`);
        const data = await res.data;
        return data;
    }
);

export const getNationalities = createAsyncThunk(
    'lookup/nationalities',
    async () => {
        const res = await axios.get(`/Lookup/Nationalities`);
        const data = await res.data;
        return data;
    }
);
export const getRelationships = createAsyncThunk(
    'lookup/relationships',
    async () => {
        const res = await axios.get(`/Lookup/Relationships`);
        const data = await res.data;
        return data;
    }
);


export const addFamilyMember = createAsyncThunk(
    'students/addFamilyMember',
    async (payload, thunkAPI) => {
        const res = await axios.post(`/Students/${payload.studentId}/FamilyMembers`, { ...payload, id: 0 });
        const data = await res.data;
        thunkAPI.dispatch(updateFamilyMemberNationality({ id: data.id, nationalityId: payload.nationalityId }));
        return { tempId: payload.id, data: data };
    }
);

export const updateFamilyMember = createAsyncThunk(
    'familymembers/updateFamilyMember',
    async (payload, thunkAPI) => {
        const res = await axios.put(`/FamilyMembers/${payload.id}`, payload);
        const data = await res.data;
        thunkAPI.dispatch(updateFamilyMemberNationality({ id: payload.id, nationalityId: payload.nationalityId }));
        return data;
    }
);

export const getFamilyMemberNationality = createAsyncThunk(
    'students/getStudentNationality',
    async (payload) => {
        const res = await axios.get(`/students/${payload}/Nationality`);
        const data = await res.data;
        return data;
    }
);


export const updateFamilyMemberNationality = createAsyncThunk(
    'familyMembers/updateFamilyMemberNationality',
    async (payload, thunkAPI) => {
        const res = await axios.put(`/FamilyMembers/${payload.id}/Nationality/${payload.nationalityId}`);
        const data = await res.data;
        return data;
    }
);

export const deleteStudentFamilyMember = createAsyncThunk(
    'familymembers/deleteStudentFamilyMember',
    async (payload, thunkAPI) => {
        const res = await axios.delete(`/FamilyMembers/${payload}`);
        const data = await res.data;
        return { payload, data };
    }
);

export const studentsSlice = createSlice({
    name: 'Students',
    initialState,
    reducers: {
        changeRole: (state, action) => {
            state.selectedRole = action.payload
        },
        setSelectStudent: (state, action) => {
            state.selectedStudent = state.students.find((s) => (s.id === action.payload));
        },
        clearSelection: (state, action) => {
            state.selectedStudent = null;
            state.selectedStudentFamilyMembers = [];
        },
        clearNotification:(state)=>{
            state.notificationMessage = '';
            state.notificationType = NotificationType.None;
        },
        addNewFamilyMember: (state, action) => {
            const newFamilyMember = {
                id: nanoid(),
                studentId: action.payload.studentId,
                firstName: '',
                lastName: '',
                dateOfBirth: new Date().toISOString(),
                relationshipId: 0
            }
            state.selectedStudentFamilyMembers = [...state.selectedStudentFamilyMembers, newFamilyMember];

        },
    },
    extraReducers: (builder) => {
        builder.addCase(getStudents.pending, (state) => {
            state.students = [];
        });
        builder.addCase(getStudents.fulfilled, (state, action) => {
            state.students = action.payload;
        });
        builder.addCase(getStudents.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });
        builder.addCase(getStudentFamilyMembers.pending, (state) => {
            state.loading = true;
            state.selectedStudentFamilyMembers = [];
        });
        builder.addCase(getStudentFamilyMembers.fulfilled, (state, action) => {
            state.selectedStudentFamilyMembers = action.payload;
        });
        builder.addCase(getStudentFamilyMembers.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });
        builder.addCase(getNationalities.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNationalities.fulfilled, (state, action) => {
            state.loading = false;
            state.nationalities = action.payload;
        });
        builder.addCase(getNationalities.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });

        builder.addCase(getRelationships.pending, (state) => {
            
        });
        builder.addCase(getRelationships.fulfilled, (state, action) => {
            state.relationships = action.payload;
        });
        builder.addCase(getRelationships.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });

        builder.addCase(addSudent.pending, (state) => {
            
        });
        builder.addCase(addSudent.fulfilled, (state, action) => {
            state.selectedStudent = action.payload;

            state.notificationMessage = 'Saved Successfully';
            state.notificationType = NotificationType.Info;
        });
        builder.addCase(addSudent.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });

        builder.addCase(updateStudent.pending, (state) => {
        });
        builder.addCase(updateStudent.fulfilled, (state, action) => {
            state.selectedStudent = action.payload;

            state.notificationMessage = 'Saved Successfully';
            state.notificationType = NotificationType.Info;
        });
        builder.addCase(updateStudent.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });

        builder.addCase(getStudentNationality.pending, (state) => {
            state.studentNationality = null;
        });
        builder.addCase(getStudentNationality.fulfilled, (state, action) => {
            state.studentNationality = action.payload;
        });
        builder.addCase(getStudentNationality.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });
        builder.addCase(updateStudentNationality.pending, (state) => {
            state.studentNationality = null;
        });
        builder.addCase(updateStudentNationality.fulfilled, (state, action) => {
            state.studentNationality = action.payload;
        });
        builder.addCase(updateStudentNationality.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });


        builder.addCase(addFamilyMember.pending, (state) => {
        });
        builder.addCase(addFamilyMember.fulfilled, (state, action) => {
            const familyMembers = state.selectedStudentFamilyMembers.filter((fm) => (fm.id !== action.payload.tempId));
            state.selectedStudentFamilyMembers = [...familyMembers, action.payload.data];
            state.notificationMessage = 'Saved Successfully';
            state.notificationType = NotificationType.Info;
        });
        builder.addCase(addFamilyMember.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });

        builder.addCase(updateFamilyMember.pending, (state) => {
        });
        builder.addCase(updateFamilyMember.fulfilled, (state, action) => {

            state.notificationMessage = 'Saved Successfully';
            state.notificationType = NotificationType.Info;
        });
        builder.addCase(updateFamilyMember.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });

        builder.addCase(deleteStudentFamilyMember.pending, (state) => {
        });
        builder.addCase(deleteStudentFamilyMember.fulfilled, (state, action) => {
            debugger;
            const members = state.selectedStudentFamilyMembers.filter((fm) => (fm.id !== action.payload.payload));
            state.selectedStudentFamilyMembers = members;
            state.notificationMessage = 'Deleted Successfully';
            state.notificationType = NotificationType.Info;
        });
        builder.addCase(deleteStudentFamilyMember.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });

        builder.addCase(updateFamilyMemberNationality.pending, (state) => {
            
        });
        builder.addCase(updateFamilyMemberNationality.fulfilled, (state, action) => {
            const members = state.selectedStudentFamilyMembers.filter((fm) => (fm.id !== action.payload.payload));
            state.selectedStudentFamilyMembers = members;
        });
        builder.addCase(updateFamilyMemberNationality.rejected, (state, action) => {
            state.notificationMessage = action.error.message;
            state.notificationType = NotificationType.Error;
            console.log(action.error);
        });
    },
});

export const { changeRole, setSelectStudent, clearSelection, addNewFamilyMember, clearNotification } = studentsSlice.actions;

// Action creators are generated for each case reducer function
export default studentsSlice.reducer;
