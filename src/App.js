import Navbar from './Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import Body from './Body';
import { Col, Row } from 'react-bootstrap';
import TasksList from './TasksList';

function App() {
  return (
   <>
      <Navbar/>
     <Row className='justify-content-md-center'>
        <Col lg='6'>
          <Body/>
          <TasksList/>
        </Col>
     </Row>
   </>
   
  );
}

export default App;
