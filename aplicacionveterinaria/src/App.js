import React, {Component} from "react"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, nombre: "Hatch", sexo: "Macho" , edad: "6años", tipodemascota: "perro", servicio: "valoracion"},
  
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      sexo: "",
      edad: "",
      tipodemascota: "",
      servicio: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].sexo = dato.sexo;
        arreglo[contador].edad = dato.edad;
        arreglo[contador].tipodemascota  = dato.tipodemascota;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
          <h1 className="title">Vet.cop</h1>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Nueva Mascota</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Sexo</th>
                <th>Edad</th>
                <th>Tipo de mascota</th>
                <th>Servicio</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.sexo}</td>
                  <td>{dato.edad}</td>
                  <td>{dato.tipodemascota}</td>
                  <td>{dato.servicio}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Sexo: 
              </label>
              <input
                className="form-control"
                name="sexo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.sexo}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Tipo de mascota: 
              </label>
              <input
                className="form-control"
                name="tipodemascota"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.tipodemascota}
            
              />
            </FormGroup>
            <FormGroup>
              <label>
                Servicio: 
              </label>
              <select
                className="form-control"
                name="servicio"
                //type="text"
                onChange={this.handleChange}
                value={this.state.form.servicio}
              >
                <option >Valoracion</option>
                <option >Urgencias</option>
                <option >Hospitalizacion</option>

              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Mascota</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Sexo: 
              </label>
              <select
                className="form-control"
                name="sexo"
                //type="text"
                onChange={this.handleChange}
              >
              <option >Macho</option>
              <option >Hembra</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Tipo de mascota: 
              </label>
              <select 
                className="form-control"
                name="tipodemascota"
                //type="text"
                onChange={this.handleChange}
              >
              <option >Perro</option>
              <option >Gato</option>
              <option >Hamster</option>
              <option >Ave</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>
                Servicio: 
              </label>
              <select
                className="form-control"
                name="servicio"
                //type="text"
                onChange={this.handleChange}
              >
              <option >Valoracion</option>
              <option >Urgencias</option>
              <option >Hospitalizacion</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}


export default App;
