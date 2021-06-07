import './App.css';
import xlsx from "xlsx";
import QuestionsForm from "./components/QueationsForm"
import UploadStudentSheet from "./components/UploadingStudentsSheet"

function App() {
  return (
    <div className="App">
      {/* <QuestionsForm /> */}
      <UploadStudentSheet />
    </div>
  );
}

export default App;
