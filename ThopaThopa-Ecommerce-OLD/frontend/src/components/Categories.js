import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useState, useEffect } from 'react';
function Categories(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [categories,setCategories]=useState([])
    const [totalResult,setTotalResults]=useState([0])

    useEffect(() => {
        fetchData(baseUrl+'/categories');
    },[]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategories(data.results);
            setTotalResults(data.count);
        });
    }

    function changeUrl(baseurl){
        fetchData(baseurl);
    }
    var links=[];
    var limit=1;
    var totalLinks=totalResult/limit;
    for(let i=1; i<=totalLinks; i++){
        links.push(<li className="page-item"><Link onClick={() =>changeUrl(baseUrl+`/categories/?page=${i}`)} to={`/categories/?page=${i}`} className="page-link">{i}</Link></li>)
    }
    return(
        <section className="container mt-5">
            <h3 className="text-center mb-4">All Categories <a href='#' className='float-end btn btn-light m-2'></a></h3>
            <div className="row mb-2">
            {
                categories.map((category)=>
                // Category Box
                <div className="col-12 col-md-3 mb-4">
                    <div className="card shadow">
                        <img src={logo} className="card-img-top" alt={category.title} />
                        <div className="card-body">
                        <h4 className="card-title"><Link to={`/category/${category.id}`}>{category.title}</Link>
                        </h4>
                        </div>
                        <div className='card-footer'>
                            <p>Products Sold: 120</p>
                        </div>
                    </div>
                </div>
                // Category Box End
                )
            }
            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {links}
                </ul>
                </nav>
            </div>
        </section> 
    );
}

export default Categories;