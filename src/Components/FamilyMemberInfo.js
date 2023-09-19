import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Label, Input, Button } from 'reactstrap'
import {
    deleteStudentFamilyMember,
    setFamilyMemberFields,
    removeFamilyMember,
} from '../Redux/StudentSlice';
import { Roles } from "../Constants/Constants";
const FamilyMemberInfo = ({ info }) => {
    const dispatch = useDispatch();
    const { nationalities, relationships, selectedRole } = useSelector((state) => state.students);
    const id = info?.id ?? 0;
    const isReadOnly = (selectedRole === Roles.Admin && !isNaN(Number(id)));
    
    const deleteRecord = () => {
        if(isNaN(Number(id)))
        {
            dispatch(removeFamilyMember(id));
        }
        else{
            dispatch(deleteStudentFamilyMember(id));
        }
    }    
    return (
        <><Row>
            <Col xl="6">
                <Label>First Name</Label>
                <Input type="text" value={info?.firstName ?? ''} onChange={(e) => dispatch(setFamilyMemberFields({...info,firstName:e.target.value}))} disabled={isReadOnly} />
            </Col>
            <Col xl="6">
                <Label>Last Name</Label>
                <Input type="text" value={info?.lastName ?? ''} onChange={(e) => dispatch(setFamilyMemberFields({...info,lastName:e.target.value}))} disabled={isReadOnly} />
            </Col>
        </Row><Row>
                <Col xl="4">
                    <Label>DOB</Label>
                    <Input type="date" value={(info?.dateOfBirth ?? '').length > 0 ? info.dateOfBirth.split('T')[0] : ''} onChange={(e) => dispatch(setFamilyMemberFields({...info,dateOfBirth:e.target.value}))} disabled={isReadOnly} />
                </Col>
                <Col xl="4">
                    <Label>Nationality</Label>
                    <Input type="select" value={info?.nationalityId ?? ''} onChange={(e) => dispatch(setFamilyMemberFields({...info,nationalityId:e.target.value}))} disabled={isReadOnly}>
                        {nationalities.map((n) => (<option key={n.id} value={n.id}>{n.country}</option>))}
                    </Input>
                </Col>
                <Col xl="4">
                    <Label>Relationship</Label>
                    <Input type="select" value={info?.relationshipId ?? ''} onChange={(e) =>  dispatch(setFamilyMemberFields({...info,relationshipId: e.target.value}))} disabled={isReadOnly}>
                        {relationships.map((n) => (<option key={n.id} value={n.id}>{n.title}</option>))}
                    </Input>
                </Col>
            </Row>
            {!isReadOnly && <Row>
                <Col xl="12">
                    <div className="mt-3 d-flex gap-2 float-end">
                        <Button color="danger" onClick={deleteRecord}>Delete</Button>
                    </div>
                </Col>
            </Row>
            }
        </>
    )
}
export default memo(FamilyMemberInfo);