import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { search } from './REDUXTOOLKIT/getAllProducts';
import StarRatings from 'react-star-ratings';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { motion } from "framer-motion";
import 'react-lazy-load-image-component/src/effects/blur.css';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { FaShoppingCart } from "react-icons/fa";
import "./home.css"
import "./style.css"
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const Search = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const dispatch = useDispatch();
    const { loading, productSearch } = useSelector((s) => s.productSlice)

    const { name } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(search(name))
    }, [])
    const handleFunc = (id) => {
        navigate(`/details/${id}`)

    }

    return (
        <div className='my-5 container d-flex justify-content-center'>
            <div className="row d-flex justify-content-center my-5 ">
                {loading === true ? (
                    <div className='d-flex justify-content-center mt-5'>
                        <span class="loader"></span>
                    </div>

                ) : (
                    productSearch.length === 0 ? (
                        <div className='card shadow-lg p-3 d-flex justify-content-center align-items-center vh-100'>
                            <h3 className='mt-5'>Your Search Item Not Found!</h3>
                        </div>
                    ) : (
                        productSearch.map((e, idx) => (
                            <Card sx={{ maxWidth: 345 }} className=' mx-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded' style={{ background: "transparent" }}>
                                 <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                                    transition: { duration: 0.3 },
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <CardHeader


                                    title={e.category}

                                />
                                 <LazyLoadImage
                                
                                height={"300"}
                                src={e.image} // use normal <img> attributes as props
                                loading="lazy"
                                effect='blur'
                                wrapperProps={{
                                    
                                    style: {transitionDelay: "1s"},
                                }} />
                                <CardContent>
                                    <Typography paragraph className='fw-bold'>Price: $ {e.price}</Typography>
                                    <div className='d-flex justify-content-center'>
                                        <span className='fw-bold'>Rating: </span><StarRatings
                                            rating={e.rate
                                            }
                                            starDimension="20px"
                                            starSpacing="1px"
                                            starRatedColor="orange"


                                        />

                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button variant='contained' endIcon={<FaShoppingCart />} onClick={() => handleFunc(e.id)}>Shop Now</Button>
                                    </div>
                                </CardContent>
                                <CardActions disableSpacing>


                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph className='fw-bold'>Description:</Typography>
                                        <Typography paragraph>
                                            {e.description}
                                        </Typography>

                                    </CardContent>
                                </Collapse>
                                </motion.div>
                            </Card>
                        ))
                    )

                )}



            </div>


        </div>
    )
}

export default Search
