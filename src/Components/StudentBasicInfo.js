import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Label, Input, Button } from 'reactstrap'
import {
    addSudent,
    updateStudent,
} from '../Redux/StudentSlice';
import { Roles } from "../Constants/Constants";
const StudentBasicInfo = () => {
    const dispatch = useDispatch();
    const { nationalities, selectedStudent, studentNationality, selectedRole } = useSelector((state) => state.students);
    const [firstName, setFirstName] = useState(selectedStudent?.firstName ?? '');
    const [lastName, setLastName] = useState(selectedStudent?.lastName ?? '');
    const [dob, setDob] = useState(((selectedStudent?.dateOfBirth ?? '').length > 0 ? selectedStudent.dateOfBirth : new Date().toISOString()).split('T')[0]);
    const [nationalityId, setNationalityId] = useState(0);
    const studentId = selectedStudent?.id ?? 0;
    const nid = studentNationality?.nationalityId ?? 0;
    const isReadOnly = (selectedRole === Roles.Admin && studentId > 0);

    useEffect(() => {
        setNationalityId(nid);
    }, [nid])
    const save = () => {
        if (studentId === 0) {
            dispatch(addSudent({
                firstName,
                lastName,
                dateOfBirth: new Date(dob),
                nationalityId
            }));
        }
        else {
            dispatch(updateStudent({
                id: selectedStudent.id,
                firstName,
                lastName,
                dateOfBirth: new Date(dob),
                nationalityId
            }));
        }
    }
    return (
        <><Row>
            <Col xl="6">
                <Label>First Name</Label>
                <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isReadOnly} />
            </Col>
            <Col xl="6">
                <Label>Last Name</Label>
                <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isReadOnly} />
            </Col>
        </Row><Row>
                <Col xl="6">
                    <Label>DOB</Label>
                    <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} disabled={isReadOnly} />
                </Col>
                <Col xl="6">
                    <Label>Nationality</Label>
                    <Input type="select" value={nationalityId} onChange={(e) => { setNationalityId(e.target.value) }} disabled={isReadOnly}>
                        {nationalities.map((n) => (<option key={n.id} value={n.id}>{n.country}</option>))}
                    </Input>
                </Col>
            </Row>
            {!isReadOnly && (

                <Row>
                    <Col xl="12">
                        <div className="mt-3 d-flex float-end">
                            <Button color="primary" onClick={save}>Save</Button>
                        </div>
                    </Col>
                </Row>
            )}
        </>

    )

}
export default StudentBasicInfo;