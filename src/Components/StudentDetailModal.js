import React, { useEffect, memo } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import StudentBasicInfo from "./StudentBasicInfo";
import { useDispatch, useSelector } from "react-redux";
import {
    addSudent,
    getStudentFamilyMembers,
    updateStudent,
} from '../Redux/StudentSlice';
import { Roles } from "../Constants/Constants";
import StudentFamilyMembers from './StudentFamilyMembers';

const StudentDetailModal = ({ isOpen, toggle, }) => {
    const dispatch = useDispatch();
    const { selectedStudent, selectedRole, selectedStudentFamilyMembers } = useSelector((state) => state.students)
    const studentId = selectedStudent?.id ?? 0;
    const isReadOnly = (selectedRole === Roles.Admin && studentId > 0);

    useEffect(() => {
        if (studentId > 0) {
            dispatch(getStudentFamilyMembers(studentId));
        }

    }, [dispatch, studentId])

    const save = () => {
        if (studentId > 0) {
            dispatch(updateStudent({ selectedStudent, selectedStudentFamilyMembers }));
        }
        else {
            dispatch(addSudent({ selectedStudent, selectedStudentFamilyMembers }));
        }
    }


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
                <StudentFamilyMembers ></StudentFamilyMembers>
            </ModalBody>
            <ModalFooter>
                {!isReadOnly &&
                    (
                        <Button color="primary" onClick={save}>
                            Submit
                        </Button>
                    )
                }
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default memo(StudentDetailModal);