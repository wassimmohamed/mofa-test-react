import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row } from 'reactstrap';
import FamilyMemberInfo from "./FamilyMemberInfo";
import { addNewFamilyMember } from "../Redux/StudentSlice";
import { Roles } from "../Constants/Constants";


const StudentFamilyMembers = () => {
    const dispatch = useDispatch();
    const { selectedStudentFamilyMembers, selectedStudent, selectedRole } = useSelector((state) => state.students);
    const studentId = selectedStudent?.id ?? 0;
    const isReadOnly = (selectedRole === Roles.Admin && studentId > 0);

    return (
        <>
            <Row className="mt-3">
                <Col lg={3}>
                    <h5>Family Members</h5>
                </Col>
                {!isReadOnly &&
                    (
                        <Col lg={6}>
                            <Button color="primary" onClick={() => {
                                dispatch(addNewFamilyMember({
                                    studentId: selectedStudent?.id
                                }));
                            }} >Add Family Member</Button>
                        </Col>
                    )
                }

            </Row>
            {(selectedStudentFamilyMembers || []).map((fm) => (<FamilyMemberInfo key={fm.id} info={fm}></FamilyMemberInfo>))}
        </>
    );
}

export default memo(StudentFamilyMembers);