import React, { useState, useEffect } from 'react'

export default function Table() {
    const [books, setBooks] = useState([])
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // Refactorizar el UseEffect
    var endPoint = 'http://localhost:8000/api/books';
    function getData() {
        fetch(endPoint)
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching', error))
    }

    // --Informacion--
    // Las llaves depués del endPoint determina un objeto
    // Las llaves dentro del paréntesis es porque se envía el objeto

    // --Fetch--
    // Luego se definen los headers y el body
    // Voy a mandar los datos al endpoint por el metodo POST
    // Y el contenido va a ser un JSON (¿Para qué se ENVIA lo del Header?)

    // --Stringify--
    // A la izquierda la clave (el request en el controlador) 
    // Y a la drecha el valor (abajo de stringify)
    function sendData() {
        fetch("http://localhost:8000/api/books", {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                name: name,
                price: price,
            })
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                getData(endPoint)
                setName("")
                setPrice("")
            })
    }
    // useState cambia el estado de la variable
    // Se ejecute una acción cuando se cargue un componente
    // useEffect(function (){
    //     // Consulta una API
    //     fetch("http://localhost:8000/api/books")
    //     // Recibe lo de Books y lo convierte en un .Json
    //     .then(function (response){
    //         return response.json()
    //     })
    //     // Muestra los datos de la tabla
    //     // data se llena através de la función manejadora setBooks
    //     .then(function (data){
    //         setBooks(data)
    //     })
    // }, [])

    function deleteData(id){
        fetch(`http://localhost:8000/api/books/${id}`, {
            method: "delete"
        })
        .then(function (data){
            getData(endPoint)
        })
    }

    useEffect(() => {
        getData(endPoint)
    }, []);

    return (
        <div>
            <h1>Libros</h1>
            <h1>Guardar Libro</h1>
            {/* El event funciona como el id en JS cuando se referia a un campo html */}
            <input type="text" placeholder='Ingrese el nombre: '
                value={name}
                onChange={function (event) {
                    return setName(event.target.value)
                }} />
            <input type="number" placeholder='Ingrese el precio: '
                value={price}
                onChange={function (event) {
                    return setPrice(event.target.value)
                }} />
            {/* Para guardar llama a la API
        Llama a una función encargada de guardar los datos */}
            <button type="button"
                className='btn btn-success'
                onClick={sendData}>Guardar</button>


            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(function (book) {
                        return (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.price}</td>
                                <td>
                                    <button type="button" 
                                        className='btn btn-danger'
                                        onClick={function (){
                                            deleteData(book.id)
                                        }}>Eliminar</button>
                                </td>
                                <td>
                                    <a href="" className='btn btn-primary'>Editar</a>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}
