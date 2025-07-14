import React, { useState, useEffect } from 'react'

export default function Cards() {
    const [products, setProducts] = useState([])
    useEffect(function () {
        fetch("https://fakestoreapi.com/products/")
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                setProducts(data)
            })
    }, [])
    return (
        <div>
            {products.map(function (product) {
                return (
                    // CORREGIR ESTOOOO
                    <div className="card">
                        <div className="card-body">
                            <li key={product.id}></li>
                            {product.name}
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}
