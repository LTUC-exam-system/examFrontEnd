import { Form } from "react-bootstrap"
import readxlsx from 'read-excel-file';
import superagent from "superagent"
function UploadStudentSheet() {
    let API = process.env.REACT_API_test
    console.log(process.env.REACT_API_test)
    async function handleChange(e) {
        e.preventDefault()
        console.log(e.target.files[0])
        let wb = await readxlsx(e.target.files[0])
        let data = { data: JSON.stringify(wb) };
        superagent.post(`http://localhost:3030/students/addStudentsDatatest`).send(data).then((res) => {
            console.log(res)
        })
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control type="file" onChange={handleChange} />
                </Form.Group>
            </Form>

        </>
    );
}

export default UploadStudentSheet;
