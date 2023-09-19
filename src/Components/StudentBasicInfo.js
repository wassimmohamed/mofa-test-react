import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Label, Input } from 'reactstrap'
import {
    setStudentFields,
} from '../Redux/StudentSlice';
import { Roles } from "../Constants/Constants";
const StudentBasicInfo = () => {
    const dispatch = useDispatch();
    const { nationalities, selectedStudent, studentNationality, selectedRole } = useSelector((state) => state.students);
    const studentId = selectedStudent?.id ?? 0;
    const isReadOnly = (selectedRole === Roles.Admin && studentId > 0);
    return (
        <><Row>
            <Col xl="6">
                <Label>First Name</Label>
                <Input type="text" value={selectedStudent?.firstName} onChange={(e) => dispatch(setStudentFields({ ...selectedStudent, firstName: e.target.value }))} disabled={isReadOnly} />
            </Col>
            <Col xl="6">
                <Label>Last Name</Label>
                <Input type="text" value={selectedStudent?.lastName} onChange={(e) => dispatch(setStudentFields({ ...selectedStudent, lastName: e.target.value }))} disabled={isReadOnly} />
            </Col>
        </Row><Row>
                <Col xl="6">
                    <Label>DOB</Label>
                    <Input type="date" value={selectedStudent?.dateOfBirth.split('T')[0]} onChange={(e) => dispatch(setStudentFields({ ...selectedStudent, dateOfBirth: e.target.value }))} disabled={isReadOnly} />
                </Col>
                <Col xl="6">
                    <Label>Nationality</Label>
                    <Input type="select" value={studentNationality?.nationalityId} onChange={(e) => { dispatch(setStudentFields({ ...selectedStudent, nationalityId: e.target.value })) }} disabled={isReadOnly}>
                        {nationalities.map((n) => (<option key={n.id} value={n.id}>{n.country}</option>))}
                    </Input>
                </Col>
            </Row>
        </>

    )

}
export default memo(StudentBasicInfo);