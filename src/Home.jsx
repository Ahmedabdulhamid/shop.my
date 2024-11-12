import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getDetails } from './REDUXTOOLKIT/getAllProducts';
import StarRatings from 'react-star-ratings';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import "./home.css"
import "./style.css"
import { FaShoppingCart } from "react-icons/fa";
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
const Home = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (id) => {
        const check = products.some((e) => {
            return e.id == id
        })
        if (check) {
            setExpanded(!expanded)
        }
        else {
            setExpanded(false)
        }

    };

    const dispatch = useDispatch()
    const { loading, products } = useSelector((s) => s.productSlice)


    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getDetails())
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
                    products.map((e, idx) => (
                        <Card sx={{ maxWidth: 345 }} className='mx-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded' style={{ background: "transparent" }} key={idx}>
                            <CardHeader


                                title={e.category}

                            />
                            
                            <LazyLoadImage
                                
                                height={"300"}
                                src={e.image} // use normal <img> attributes as props
                                />
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
                        </Card>
                    ))
                )}



            </div>


        </div>
    )
}

export default Home

