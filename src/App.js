import React, { useState } from "react";
import { Button, Form, Segment, Grid, Header, Radio } from "semantic-ui-react";
import TeamCard from "./TeamCard";
import "semantic-ui-css/semantic.min.css";


function App() {
  const [team, setTeam] = useState([
    { id: 1, email: "jill@null.com", name: "Jill", role: "UX Designer" },
    { id: 2, email: "jack@nobody.com", name: "Jack", role: "Frontend Engineer" }
  ]);
  const [newMem, setNewMem] = useState({
    email: "",
    name: "",
    role: "Frontend Engineer"
  });
  const [memberToEdit, setMemberToEdit] = useState({
    email: "",
    name: "",
    role: ""
  });
  const [editNum, setEditNum] = useState(0);

  return (
    <div className="App">
      <Segment placeholder>
        <Header as="h1" textAlign="center">
          <Header.Content>Team Builder</Header.Content>
        </Header>

        <Grid columns={2} stackable>
          <Grid.Column>
            <Form onSubmit={e => addNewMember(e)}>
              <Form.Input
                label="Name"
                name="name"
                value={newMem.name}
                onChange={e => changeHandler(e)}
              />

              <Form.Input
                label="Email"
                name="email"
                value={newMem.email}
                onChange={e => changeHandler(e)}
              />

              <Form.Field
                control={Radio}
                onChange={radioHandler}
                checked={newMem.role === "Frontend Engineer"}
                label="Frontend Engineer"
                value="Frontend Engineer"
              />

              <Form.Field
                control={Radio}
                onChange={radioHandler}
                checked={newMem.role === "UX Designer"}
                label="UX Designer"
                value="UX Designer"
              />

              <Form.Field
                control={Radio}
                onChange={radioHandler}
                checked={newMem.role === "Backend Engineer"}
                label="Backend Engineer"
                value="Backend Engineer"
              />

              <Button color="blue" type="submit">
                Add New Team Member
              </Button>
            </Form>
          </Grid.Column>

          <Grid.Column>
            {team.map(mem => (
              <TeamCard
                {...mem}
                editHandler={editHandler}
                editMember={editMember}
                editNum={editNum}
                key={mem.id}
                memberToEdit={memberToEdit}
                removeMember={removeMember}
                toggleEdit={toggleEdit}
              />
            ))}
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );

  function changeHandler(e) {
    setNewMem({ ...newMem, [e.target.name]: e.target.value });
  }

  function radioHandler(e, { value }) {
    setNewMem({ ...newMem, role: value });
  }

  function editHandler(e) {
    setMemberToEdit({ ...memberToEdit, [e.target.name]: e.target.value });
  }

  function addNewMember(e) {
    e.preventDefault();
    let newId = team[team.length - 1].id + 1;
    setTeam([...team, { ...newMem, id: newId }]);
    setNewMem({ email: "", name: "", role: "" });
  }

  function editMember(e, memberToEdit) {
    e.preventDefault();
    let editedTeam = team.map(mem =>
      mem.id === memberToEdit.id ? memberToEdit : mem
    );
    setTeam(editedTeam);
    setEditNum(0);
  }

  function removeMember(e, id) {
    e.preventDefault();
    let newTeam = team.filter(mem => mem.id !== id);
    setTeam(newTeam);
    setEditNum(0);
  }

  function toggleEdit(id) {
    editNum === id ? setEditNum() : setEditNum(id);
    let thisMem = team.filter(mem => mem.id === id)[0];
    setMemberToEdit(thisMem);
  }
}

export default App;
