import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeRole } from '../Redux/StudentSlice';
import {
  Navbar,
  NavbarBrand,
  FormGroup,
  Input
} from 'reactstrap';
import { Roles } from '../Constants/Constants';

function TopNav(args) {
  const dispatch = useDispatch();
  const { selectedRole } = useSelector((state) => state.students);
  return (
    <Navbar {...args} style={{ background: "#00365a" }}>
      <NavbarBrand href="/" style={{ color: "white" }}>Student Portal</NavbarBrand>
      <FormGroup className='mt-3'>
        <Input
          id="role"
          name="select"
          type="select"
          value={selectedRole}
          onChange={(e) => { dispatch(changeRole(e.target.value)) }}
        >
          <option value={Roles.Admin}>
            Admin
          </option>
          <option value={Roles.Registrar}>
            Registrar
          </option>
        </Input>
      </FormGroup>
    </Navbar>
  );
}

export default TopNav;