import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row } from 'reactstrap';
import FamilyMemberInfo from "./FamilyMemberInfo";
import { addNewFamilyMember } from "../Redux/StudentSlice";


const StudentFamilyMembers = () => {
    const dispatch = useDispatch();
    const { selectedStudentFamilyMembers, selectedStudent } = useSelector((state) => state.students)

    return (
        <>
            <Row className="mt-3">
                <Col lg={3}>
                    <h5>Family Members</h5>
                </Col>
                <Col lg={6}>
                    <Button color="primary" onClick={() => {
                        dispatch(addNewFamilyMember({
                            studentId: selectedStudent.id
                        }));
                    }} >Add Family Member</Button>
                </Col>
            </Row>            
            {(selectedStudentFamilyMembers || []).map((fm) => (<FamilyMemberInfo key={fm.id} info={fm}></FamilyMemberInfo>))}
        </>
    );
}

export default StudentFamilyMembers;