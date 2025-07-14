import React, {useState, useEffect} from 'react'

export default function Table() {
    const [books, setBooks] = useState([])

    // Refactorizar el UseEffect
    var endPoint = 'http://localhost:8000/api/books';
    function getData(){
        fetch(endPoint)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching', error))
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

    useEffect(() => {
        getData(endPoint)
    }, []);

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {books.map(function (book){
                    return (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.price}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    </div>
  )
}
