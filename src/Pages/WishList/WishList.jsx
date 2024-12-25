import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useParams } from "react-router-dom";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const params = useParams();
  console.log(params)

  useEffect(()=>{
   
        fetch(`http://localhost:5000/wishlist/${params.id}`)
        .then(res=>res.json())
        .then(data=>setWishlist(data))
 
  },[])

  return <div>
    {
        wishlist.map(list=> <p key={list._id}>{list.title}</p>)
    }
  </div>;
};

export default WishList;
