import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Label, Input, Button } from 'reactstrap'
import {
    addFamilyMember,
    updateFamilyMember,
    deleteStudentFamilyMember,
} from '../Redux/StudentSlice';
import { Roles } from "../Constants/Constants";
const FamilyMemberInfo = ({ info }) => {
    const dispatch = useDispatch();
    const { nationalities, selectedStudent, relationships, selectedRole } = useSelector((state) => state.students);
    const [firstName, setFirstName] = useState(info?.firstName ?? '');
    const [lastName, setLastName] = useState(info?.lastName ?? '');
    const [dob, setDob] = useState((info?.dateOfBirth ?? '').length > 0 ? info.dateOfBirth.split('T')[0] : '');
    const [nationalityId, setNationalityId] = useState(0);
    const [relationshipId, setRelationshipId] = useState(0);
    const id = info?.id ?? 0;
    const studentId = selectedStudent?.id ?? 0;
    const rid = info?.relationshipId ?? 0;
    const nid = info?.nationalityId ?? 0;

    const isReadOnly = (selectedRole === Roles.Admin && !isNaN(Number(id)));
    useEffect(() => {
        setRelationshipId(rid);
        setNationalityId(nid);
    }, [rid, nid])

    const deleteRecord = () => {
        dispatch(deleteStudentFamilyMember(id));
    }
    const save = () => {
        if (isNaN(Number(id))) {
            dispatch(addFamilyMember({
                id,
                studentId,
                firstName,
                lastName,
                dateOfBirth: new Date(dob),
                nationalityId,
                relationshipId,
            }));
        }
        else {
            dispatch(updateFamilyMember({
                id,
                studentId,
                firstName,
                lastName,
                dateOfBirth: new Date(dob),
                nationalityId,
                relationshipId
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
                <Col xl="4">
                    <Label>DOB</Label>
                    <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} disabled={isReadOnly} />
                </Col>
                <Col xl="4">
                    <Label>Nationality</Label>
                    <Input type="select" value={nationalityId} onChange={(e) => { setNationalityId(e.target.value) }} disabled={isReadOnly}>
                        {nationalities.map((n) => (<option key={n.id} value={n.id}>{n.country}</option>))}
                    </Input>
                </Col>
                <Col xl="4">
                    <Label>Relationship</Label>
                    <Input type="select" value={relationshipId} onChange={(e) => { setRelationshipId(e.target.value) }} disabled={isReadOnly}>
                        {relationships.map((n) => (<option key={n.id} value={n.id}>{n.title}</option>))}
                    </Input>
                </Col>
            </Row>
            {!isReadOnly && <Row>
                <Col xl="12">
                    <div className="mt-3 d-flex gap-2 float-end">
                        <Button color="primary" onClick={save}>Save</Button>
                        <Button color="danger" onClick={deleteRecord}>Delete</Button>
                    </div>
                </Col>
            </Row>
            }
        </>


    )

}
export default FamilyMemberInfo;