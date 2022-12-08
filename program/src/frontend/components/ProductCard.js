/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductCard({product})
{
    return(
        <div className="card">
            <Link href={`/product/${product.slug}`}>
             <a>
             <img 
                src={product.thumbnail}
                alt={product.productName}
                className="rounded shadow"
              />
            </a>   
            </Link>
        <div className="flex flex-col items-center justify-center p-5">
            <Link href={`/product/${product.slug}`}>
                <a>
                <h2 className="text-lg">{product.productName}</h2>
                </a> 
            </Link>
            <p className="mb-2">{product.brand}</p>
            <p>${product.retailPrice}</p>
            {/* <button className="primary-button" type="button" onClick={() => addToCartHandler(product)}>
                Add to Cart
            </button> */}
        </div>
        </div>
    )
}