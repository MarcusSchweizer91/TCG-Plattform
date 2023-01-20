import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {PokeCard} from "../../models/PokeCard";
import {useNavigate} from "react-router-dom";


type PokemonCardProps = {
    card: PokeCard
    addCardToFavorites(id:string):void

}

export default function PokemonCard(props: PokemonCardProps) {


    const navigate = useNavigate()

    function handleDetailsClick() {
        navigate("/details/" + props.card.id)
    }

    

    function addCardIdOnClick(){
        props.addCardToFavorites(props.card.id!)
    }
    return (

        <Grid m={6}>
            <Card>
                <CardActionArea onClick={handleDetailsClick}>
                    <CardMedia
                        component="img"
                        image={props.card.images.small}
                        alt="Pokeball"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.card.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={addCardIdOnClick} variant={"outlined"} size="small" color="primary">
                        Favorites
                    </Button>
                    <Button href="/exchange" variant={"outlined"} size="small" color="primary">
                        Buy
                    </Button>
                    <Button href="/exchange" variant={"outlined"} size="small" color="primary">
                        Trade
                    </Button>
                </CardActions>
            </Card>
        </Grid>


    )
}