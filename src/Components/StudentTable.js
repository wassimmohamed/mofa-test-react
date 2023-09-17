import React, { memo } from "react";
import { Row, Col, Card, CardBody, CardTitle, Button, Table } from 'reactstrap'


const StudentTable = ({ studentData, onAddStudent, onStudentSelect }) => {
    return (

        <>
            <Row>
                <Col md="12">
                    <Button color="primary" onClick={onAddStudent} className="btn btn-primary btn-add-student" style={{ "right": "5px", "top": "100px", "position": "absolute" }}> Add New Student</Button>
                </Col>
            </Row>

            <Row style={{ "marginTop": "60px" }}>
                <Col md="12">
                    <Card
                        className="my-2"

                    >
                        <CardBody>
                            <CardTitle tag="h5">
                                Students
                            </CardTitle>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>DOB</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(studentData || []).map((s) => (<tr style={{ "cursor": "pointer" }} key={s.id} onClick={() => { onStudentSelect(s.id) }}>
                                        <td>
                                            {s.id}
                                        </td>
                                        <td>
                                            {s.firstName}
                                        </td>
                                        <td>
                                            {s.lastName}
                                        </td>
                                        <td>
                                            {s.dateOfBirth.split('T')[0]}
                                        </td>
                                    </tr>))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    );
}

export default memo(StudentTable);