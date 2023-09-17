import React, { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import StudentBasicInfo from "./StudentBasicInfo";
import { useDispatch, useSelector } from "react-redux";
import {
    getStudentFamilyMembers,
} from '../Redux/StudentSlice';
import StudentFamilyMembers from "./StudentFamilyMembers";


const StudentDetailModal = ({ isOpen, toggle, }) => {
    const dispatch = useDispatch();
    const { selectedStudent } = useSelector((state) => state.students)
    const studentId = selectedStudent?.id ?? 0;
    useEffect(() => {
        if (studentId > 0) {
            dispatch(getStudentFamilyMembers(studentId));
        }

    }, [dispatch, studentId])

    

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            size="xl"
            backdrop
            keyboard
        >

            <ModalHeader toggle={toggle}>Student Info</ModalHeader>
            <ModalBody>
                <StudentBasicInfo studentInfo={selectedStudent}></StudentBasicInfo>
                {studentId > 0 && <StudentFamilyMembers></StudentFamilyMembers>}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default StudentDetailModal;