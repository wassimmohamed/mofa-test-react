import React, { useEffect, useState } from "react";
import StudentTable from '../Components/StudentTable'
import { useDispatch, useSelector } from "react-redux";
import StudentDetailModal from '../Components/StudentDetailModal';
import {
    getStudentFamilyMembers,
    getStudents,
    setSelectStudent,
    clearSelection,
    getNationalities,
    getRelationships,
    getStudentNationality,
    clearNotification
} from '../Redux/StudentSlice';
import { Alert } from 'reactstrap';
import { NotificationType } from "../Constants/Constants";


const Student = () => {
    const { students, nationalities, relationships, notificationType, notificationMessage } = useSelector((store) => store.students)
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const studentsFetched = students.length > 0;
    const nationalitiesFetched = nationalities.length > 0;
    const relationshipsFetched = relationships.length > 0;


    useEffect(() => {
        if (!studentsFetched) {
            dispatch(getStudents());
        }
        if (!nationalitiesFetched) {
            dispatch(getNationalities());
        }
        if (!relationshipsFetched) {
            dispatch(getRelationships());
        }
    }, [dispatch, studentsFetched, relationshipsFetched, nationalitiesFetched])


    const addStudent = () => {
        dispatch(clearSelection());
        setShowModal(true);
    }
    const selectStudent = (studentId) => {
        setShowModal(true);
        dispatch(setSelectStudent(studentId));
        dispatch(getStudentFamilyMembers(studentId));
        dispatch(getStudentNationality(studentId))
    }    

    const notificationColor = (type) => {
        if (type === NotificationType.Error) return "danger";
        return "primary";
    }
    const closeNotification = () => {
        dispatch(clearNotification());
    }

    const showAlert = (notificationType && notificationType !== NotificationType.None) ?? false;

    return (
        <>
            {notificationType !== NotificationType.None &&
                <Alert toggle={closeNotification} style={{ "zIndex": "9000", "position": "absolute", "top": "10px", "right": "2px" }} isOpen={showAlert} color={notificationColor(notificationType)}>
                    {notificationMessage}
                </Alert>
            }
            <StudentTable studentData={students} onAddStudent={addStudent} onStudentSelect={selectStudent} />
            <StudentDetailModal isOpen={showModal} toggle={() => { setShowModal(!showModal) }} ></StudentDetailModal>            
        </>
    )
}

export default Student;